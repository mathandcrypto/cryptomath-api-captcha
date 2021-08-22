import { Controller } from '@nestjs/common';
import {
  CaptchaServiceController,
  CaptchaServiceControllerMethods,
  GenerateTaskResponse,
  ValidateTaskRequest,
  ValidateTaskResponse,
} from '@cryptomath/cryptomath-api-proto/types/captcha';
import { CaptchaService } from './captcha.service';

@Controller()
@CaptchaServiceControllerMethods()
export class CaptchaController implements CaptchaServiceController {
  constructor(private readonly captchaService: CaptchaService) {}

  async generateTask(): Promise<GenerateTaskResponse> {
    const [isTaskGenerated, task] = await this.captchaService.getRandomTask();

    if (!isTaskGenerated) {
      return {
        isTaskGenerated: false,
        taskPayload: null,
        math: '',
      };
    }

    const { uuid, difficulty, math } = task;

    return {
      isTaskGenerated: true,
      taskPayload: {
        uuid,
        difficulty,
      },
      math,
    };
  }

  async validateTask({
    uuid,
    answer,
  }: ValidateTaskRequest): Promise<ValidateTaskResponse> {
    const [isTaskExists, task] = await this.captchaService.getTask(uuid);

    if (!isTaskExists) {
      return {
        isTaskFound: false,
        isAnswerCorrect: false,
      };
    }

    const correctAnswer = task.answer;
    const isAnswerCorrect = correctAnswer === answer;

    return {
      isTaskFound: true,
      isAnswerCorrect,
    };
  }
}
