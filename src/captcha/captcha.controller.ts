import { Controller } from '@nestjs/common';
import {
  CaptchaServiceController,
  CaptchaServiceControllerMethods,
  GenerateTaskRequest,
  GenerateTaskResponse,
  ValidateTaskRequest,
  ValidateTaskResponse,
} from 'cryptomath-api-proto/proto/build/captcha';
import { CaptchaService } from './captcha.service';

@Controller('captcha')
@CaptchaServiceControllerMethods()
export class CaptchaController implements CaptchaServiceController {
  constructor(private readonly captchaService: CaptchaService) {}

  generateTask({ difficulty }: GenerateTaskRequest): GenerateTaskResponse {
    const [uuid, task] = this.captchaService.getRandomTask(difficulty);

    if (!task) {
      return {
        isTaskGenerated: false,
        taskPayload: null,
      };
    }

    const params = task.generate();

    return {
      isTaskGenerated: true,
      taskPayload: {
        uuid,
        params,
      },
    };
  }

  validateTask({
    uuid,
    params,
    answer,
  }: ValidateTaskRequest): ValidateTaskResponse {
    const task = this.captchaService.getTask(uuid);

    if (!task) {
      return {
        isTaskFound: false,
        isAnswerCorrect: false,
      };
    }

    const correctAnswer = task.answer(...params);
    const isAnswerCorrect = correctAnswer === answer;

    return {
      isTaskFound: true,
      isAnswerCorrect,
    };
  }
}
