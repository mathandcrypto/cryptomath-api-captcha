import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CaptchaTask } from '@prisma/client';
import { PrismaService } from '@providers/prisma/prisma.service';
import { randomInt } from '@common/helpers/random';
import { v4 as uuidv4 } from 'uuid';
import IORedis from 'ioredis';

@Injectable()
export class CaptchaService implements OnModuleInit {
  private readonly logger = new Logger(CaptchaService.name);
  private tasksCount = 0;

  constructor(
    private readonly prisma: PrismaService,
    @Inject('REDIS_CONNECTION') private readonly redis: IORedis.Redis,
  ) {}

  async getTask(uuid: string, retry = false): Promise<[boolean, CaptchaTask]> {
    try {
      const task = await this.prisma.captchaTask.findUnique({
        where: { uuid },
      });

      if (!task) {
        if (!retry) {
          const removedUuid = await this.redis.get(uuid);

          if (removedUuid) {
            return await this.getTask(removedUuid, true);
          }
        }

        return [false, null];
      }

      return [true, task];
    } catch (error) {
      this.logger.error(error);

      return [false, null];
    }
  }

  async getRandomTask(): Promise<[boolean, CaptchaTask]> {
    if (!this.tasksCount) {
      return [false, null];
    }

    try {
      const randomIndex = randomInt(1, this.tasksCount);
      const task = await this.prisma.captchaTask.findUnique({
        where: { index: randomIndex },
      });

      if (!task) {
        return [false, null];
      }

      return [true, task];
    } catch (error) {
      this.logger.error(error);

      return [false, null];
    }
  }

  @Cron('0 */2 * * *')
  async updateTasksUuid() {
    if (this.tasksCount) {
      const updateIndexes = new Set<number>();
      const updateCount = Math.min(2000, randomInt(1, this.tasksCount));

      let i = 1;

      while (i <= updateCount) {
        updateIndexes.add(randomInt(1, this.tasksCount));

        i++;
      }

      const updatePromises = Array.from(updateIndexes).map(
        (index) =>
          new Promise(async (resolve, reject) => {
            try {
              const oldTask = await this.prisma.captchaTask.findUnique({
                where: { index },
              });

              if (oldTask) {
                const oldUuid = oldTask.uuid;
                const uuid = uuidv4();

                await this.redis.set(uuid, oldUuid, 'EX', 60 * 60 * 2);

                const updatedTask = await this.prisma.captchaTask.update({
                  where: { uuid: oldUuid },
                  data: { uuid },
                });

                resolve(updatedTask);
              }
            } catch (error) {
              reject(error);
            }
          }),
      );

      try {
        await Promise.all(updatePromises);

        this.logger.log(`Updated ${updateCount} task uuid`);
      } catch (error) {
        this.logger.error(error);
      }
    }
  }

  async onModuleInit() {
    try {
      this.tasksCount = await this.prisma.captchaTask.count();
    } catch (error) {
      this.logger.error(error);
    }
  }
}
