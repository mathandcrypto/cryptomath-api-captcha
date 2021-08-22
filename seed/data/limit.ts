import { CaptchaTask } from '../interfaces/captcha-task.interface';

export const limitTasks: CaptchaTask[] = [
  {
    difficulty: 1,
    generateParams: [
      [2, 1024],
      [1, 4],
    ],
    generate: (m, n) => {
      const k = m * n;

      return [m, k];
    },
    math: (m, n) =>
      String.raw`\lim_{x \to 1} \frac{\sqrt[${m}]{x} - 1}{\sqrt[${n}]{x} - 1}`,
    answer: (m, n) => Math.floor(n / m),
  },
  {
    difficulty: 2,
    generateParams: [
      [1, 99],
      [1, 73],
    ],
    generate: (b, a) => {
      const c = b + a;

      return [c, b];
    },
    math: (a, b) => {
      const m = 3 * a * b;

      return String.raw`${m} \cdot \lim_{x \to 0} \frac{1}{x \sqrt{x}} \Bigg ( \sqrt{${a}} \arctan \sqrt{\frac{x}{${a}}} - \sqrt{${b}} \arctan \sqrt{\frac{x}{${b}}} \; \Bigg )`;
    },
    answer: (a, b) => a - b,
  },
  {
    difficulty: 2,
    generateParams: [
      [1, 12],
      [1, 9],
    ],
    generate: (b, a) => {
      const c = b + a;

      return [a, c];
    },
    math: (a, b) =>
      String.raw`\ln \lim_{x \to 0} \Bigg ( \frac{1 + \sin x \cos ${a} x}{1 + \sin x \cos ${b} x} \Bigg )^{\cot^3 x}`,
    answer: (a, b) => Math.pow(b, 2) - Math.pow(a, 2),
  },
  {
    difficulty: 2,
    generateParams: [
      [3, 41],
      [1, 23],
      [7, 37],
    ],
    generate: (a, b, c) => [a, b, c],
    math: (a, b, c) =>
      String.raw`\sqrt[3]{\lim_{x \to 0} \Bigg ( \frac{${a}^x + ${b}^x + ${c}^x}{3} \Bigg )^{\frac{1}{x}}}`,
    answer: (a, b, c) => a * b * c,
  },
];
