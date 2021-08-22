export interface CaptchaTask {
  difficulty: number;
  generateParams: [number, number][];
  generate(...args: number[]): number[];
  math(...args: number[]): string;
  answer(...args: number[]): number;
}
