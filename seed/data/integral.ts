import { CaptchaTask } from '../interfaces/captcha-task.interface';

export const integralTasks: CaptchaTask[] = [
  {
    difficulty: 2,
    generateParams: [[1, 15]],
    generate: (m) => [m],
    math: (m) => {
      const p = 3 * m;

      return String.raw`\lim_{\alpha \to 0} \int\limits_{0}^{${p}} x^2 \cos \alpha x \; d{x}`;
    },
    answer: (m) => 9 * Math.pow(m, 3),
  },
  {
    difficulty: 1,
    generateParams: [
      [2, 12],
      [3, 23],
    ],
    generate: (m, n) => [m, n],
    math: (m, n) => {
      const a = 2 * m;
      const b = 2 * n;

      return String.raw`\exp \Bigg ( {\frac{1}{\pi} \int\limits_{0}^{\pi/2} \ln (${a}^2 \sin^2 x \; + \; ${b}^2 \cos^2 x) \; {d}x} \Bigg )`;
    },
    answer: (m, n) => m + n,
  },
  {
    difficulty: 2,
    generateParams: [
      [1, 11],
      [2, 83],
    ],
    generate: (a, b) => {
      const c = a * b;

      return [a, c];
    },
    math: (a, b) => {
      return String.raw`\exp \Bigg ( \int\limits_{0}^{\infty} \frac{\exp (-${a} x) - \exp (-${b} x)}{x} \; {d}x \Bigg )`;
    },
    answer: (a, b) => Math.floor(b / a),
  },
  {
    difficulty: 1,
    generateParams: [[1, 54321]],
    generate: (a) => [a],
    math: (a) =>
      String.raw`\ln \Bigg ( \frac{2}{\pi} \int\limits_{0}^{+\infty} \frac{\cos ${a}x}{1 + x^2} \; dx \Bigg )`,
    answer: (a) => -1 * a,
  },
  {
    difficulty: 1,
    generateParams: [[1, 17]],
    generate: (a) => [a],
    math: (a) => {
      const square = Math.pow(a, 2);

      return String.raw`\frac{32}{\pi} \int\limits_{0}^{${a}} x^2 \sqrt{${square} - x^2} \; dx`;
    },
    answer: (a) => 2 * Math.pow(a, 4),
  },
];
