import { CaptchaTask } from '../interfaces/captcha-task.interface';
import { randomInt } from '@common/helpers/math';

export const calculusTasks: CaptchaTask[] = [
  {
    difficulty: 1,
    generate: () => {
      const b = randomInt(2, 783);
      const a = b + randomInt(3, 97);

      return [a, b];
    },
    math: (a, b) =>
      String.raw`${
        a - b
      } \cdot \Bigg ( \frac{\sqrt{${a}}}{\sqrt{${a}} + \sqrt{${b}}} + \frac{\sqrt{${b}}}{\sqrt{${a}} - \sqrt{${b}}} \Bigg )`,
    answer: (a, b) => a + b,
  },
];
