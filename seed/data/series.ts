import { CaptchaTask } from '../interfaces/captcha-task.interface';
import { binomial } from '../helpers/math';

export const seriesTasks: CaptchaTask[] = [
  {
    difficulty: 1,
    generateParams: [
      [1, 10],
      [2, 7],
      [1, 6],
    ],
    generate: (a, b, c) => {
      return [a, b, c];
    },
    math: (a, b, c) =>
      String.raw`\sum\limits_{k = 0}^{${a}} {${a} \choose k} + \sum\limits_{k = 1}^{${b}} k {${b} \choose k} + \sum\limits_{k = 0}^{${c}} {${c} \choose k}^2`,
    answer: (a, b, c) => {
      return Math.pow(2, a) + b * Math.pow(2, b - 1) + binomial(2 * c, c);
    },
  },
  {
    difficulty: 1,
    generateParams: [[3, 9999]],
    generate: (n) => [n],
    math: (n) =>
      String.raw`\sum\limits_{k = 0}^{${n}} (-1)^{${n} - k} \, 2^{2 k} {${n} + k + 1 \choose 2k + 1}`,
    answer: (n) => n + 1,
  },
  {
    difficulty: 1,
    generateParams: [
      [1, 11],
      [2, 37],
    ],
    generate: (a, b) => {
      const k = 2 * a;
      const n = k + b;

      return [n, k];
    },
    math: (n, k) =>
      String.raw`\sum\limits_{i = 0}^{${k}} (-1)^i {${n} \choose ${k} - i} {${n} \choose i}`,
    answer: (n, k) => {
      if (k % 2 === 0) {
        const half = Math.floor(k / 2);

        return Math.pow(-1, half) * binomial(n, half);
      }

      return 0;
    },
  },
  {
    difficulty: 1,
    generateParams: [
      [1, 5],
      [2, 13],
    ],
    generate: (k, l) => [k, l],
    math: (k, l) => {
      const a = Math.pow(2, k);
      const b = a + Math.pow(2, l);

      return String.raw`\log_2 \Bigg( \sum\limits_{n=1}^{\infty} \Big ( \frac{${a}}{${b}} \Big )^2 \Bigg )`;
    },
    answer: (k, l) => k - l,
  },
];
