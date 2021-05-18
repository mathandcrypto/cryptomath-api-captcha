import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { CaptchaTask } from './interfaces/captcha-task.interface';
import { captchaTasks } from './data';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CaptchaService implements OnModuleInit, OnModuleDestroy {
  private tasks = new Map<string, CaptchaTask>();

  getTasksUuidsWithGivenDifficulty(difficulty: number): string[] {
    const uuids: string[] = [];

    for (const [uuid, task] of this.tasks.entries()) {
      if (task.difficulty <= difficulty) {
        uuids.push(uuid);
      }
    }

    return uuids;
  }

  getTask(uuid: string): CaptchaTask {
    if (this.tasks.has(uuid)) {
      return this.tasks.get(uuid);
    }

    return null;
  }

  getRandomTask(difficulty: number): [string, CaptchaTask] {
    const uuids = this.getTasksUuidsWithGivenDifficulty(difficulty);

    if (uuids.length > 0) {
      const randomUuid = uuids[Math.floor(Math.random() * uuids.length)];

      return [randomUuid, this.tasks.get(randomUuid)];
    }

    return ['', null];
  }

  onModuleInit() {
    for (const task of captchaTasks) {
      const uuid = uuidv4();

      this.tasks.set(uuid, task);
    }
  }

  onModuleDestroy() {
    this.tasks.clear();
  }
}
