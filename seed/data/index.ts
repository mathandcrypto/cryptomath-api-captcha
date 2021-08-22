import { CaptchaTask } from '../interfaces/captcha-task.interface';
import { calculusTasks } from './calculus';
import { integralTasks } from './integral';
import { limitTasks } from './limit';
import { logarithmTasks } from './logarithm';
import { seriesTasks } from './series';
import { summingTasks } from './summing';

export const captchaTasks: CaptchaTask[] = [
  ...calculusTasks,
  ...integralTasks,
  ...limitTasks,
  ...logarithmTasks,
  ...seriesTasks,
  ...summingTasks,
];
