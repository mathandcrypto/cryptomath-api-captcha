import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CaptchaTask } from '@prisma/client';
import { PrismaService } from '@providers/prisma/prisma.service';
import { randomInt } from '@common/helpers/random';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CaptchaService implements OnModuleInit {
  private readonly logger = new Logger(CaptchaService.name);
  private tasksCount = 0;

  constructor(private readonly prisma: PrismaService) {}

  async getTask(uuid: string): Promise<[boolean, CaptchaTask]> {
    try {
      const task = await this.prisma.captchaTask.findUnique({
        where: { uuid },
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

  @Cron('0 */6 * * *')
  async updateTasksUuid() {
    if (this.tasksCount) {
      const updateCount = randomInt(1, this.tasksCount);
      const updateIndexes = [...new Array(updateCount)].map(() =>
        randomInt(1, this.tasksCount),
      );
      const updatePromises = updateIndexes.map((index) => {
        const uuid = uuidv4();

        return this.prisma.captchaTask.update({
          where: { index },
          data: { uuid },
        });
      });

      try {
        await this.prisma.$transaction(updatePromises);

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
