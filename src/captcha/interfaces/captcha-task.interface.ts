export interface CaptchaTask {
  difficulty: number;
  generate(): number[];
  math(...args: number[]): string;
  answer(...args: number[]): number;
}
