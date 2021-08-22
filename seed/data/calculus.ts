import { CaptchaTask } from '../interfaces/captcha-task.interface';

export const calculusTasks: CaptchaTask[] = [
  {
    difficulty: 1,
    generateParams: [
      [2, 783],
      [3, 97],
    ],
    generate: (a, b) => {
      const c = b + a;

      return [a, c];
    },
    math: (a, b) =>
      String.raw`${
        a - b
      } \cdot \Bigg ( \frac{\sqrt{${a}}}{\sqrt{${a}} + \sqrt{${b}}} + \frac{\sqrt{${b}}}{\sqrt{${a}} - \sqrt{${b}}} \Bigg )`,
    answer: (a, b) => a + b,
  },
  {
    difficulty: 2,
    generateParams: [[2, 1000]],
    generate: (n) => [n],
    math: (n) =>
      String.raw`\big ( (${n + 1}! + ${n}!) \cdot ${n}) / (${
        n + 1
      }! - ${n}!) \big )`,
    answer: (n) => n + 2,
  },
];
