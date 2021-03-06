import { CaptchaTask } from '../interfaces/captcha-task.interface';

export const summingTasks: CaptchaTask[] = [
  {
    difficulty: 1,
    generateParams: [[10, 49497]],
    generate: (n) => [n],
    math: (n) =>
      String.raw`6 \cdot \frac{1 \cdot 2 + 2 \cdot 3 + 3 \cdot 4 + \ldots +  ${n} \cdot ${
        n + 1
      }}{1 + 2 + 3 + \ldots + ${n}}`,
    answer: (n) => 4 * (n + 2),
  },
  {
    difficulty: 1,
    generateParams: [[6, 121]],
    generate: (n) => [n],
    math: (n) =>
      String.raw`\frac{1}{${
        n - 3
      }!} \cdot \Bigg ( 1 - \Bigg ( \frac{1}{2!} + \frac{2}{3!} + \frac{3}{4!} + \ldots + \frac{${
        n - 1
      }}{${n}!} \Bigg ) \Bigg )^{-1}`,
    answer: (n) => n * (n - 1) * (n - 2),
  },
  {
    difficulty: 1,
    generateParams: [[4, 976]],
    generate: (k) => [k],
    math: (k) => {
      const n = 2 * k + 1;
      const double = 2 * n;

      return String.raw`\sin^2 \frac{\pi}{${double}} + \sin^2 \frac{2 \pi}{${double}} + \sin^2 \frac{3 \pi}{${double}} + \ldots + \sin^2 \frac{${n} \pi}{${double}}`;
    },
    answer: (k) => k + 1,
  },
];
