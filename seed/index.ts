import { PrismaClient, CaptchaTask as CaptchaTaskPrisma } from '@prisma/client';
import { captchaTasks } from './data';
import { CaptchaTask } from './interfaces/captcha-task.interface';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const generatePrismaTasks = (
  offset: number,
  task: CaptchaTask,
  prismaTasks: CaptchaTaskPrisma[],
  generatedParams: number[],
  generateParams: [number, number][],
) => {
  const newGenerateParams = [...generateParams];
  const generateParam = newGenerateParams.shift();

  if (generateParam) {
    const start = generateParam[0];
    const end = generateParam[1];

    for (let i = start; i <= end; i++) {
      const newGeneratedParams = [...generatedParams];

      newGeneratedParams.push(i);

      if (newGenerateParams.length) {
        generatePrismaTasks(
          offset,
          task,
          prismaTasks,
          newGeneratedParams,
          newGenerateParams,
        );
      } else {
        const uuid = uuidv4();
        const math = task.math(...newGeneratedParams);
        const answer = task.answer(...newGeneratedParams);

        prismaTasks.push({
          uuid,
          index: offset + prismaTasks.length + 1,
          difficulty: task.difficulty,
          math,
          answer,
        });
      }
    }
  }
};

async function main() {
  let generatedTasksCount = 0;

  console.log(`Start seeding captcha tasks...`);

  for (const task of captchaTasks) {
    const prismaTasks = [] as CaptchaTaskPrisma[];

    generatePrismaTasks(
      generatedTasksCount,
      task,
      prismaTasks,
      [],
      task.generateParams,
    );

    const createPromises = prismaTasks.map((prismaTask) =>
      prisma.captchaTask.create({ data: prismaTask }),
    );

    await Promise.all(createPromises);

    generatedTasksCount += createPromises.length;
  }

  console.log(
    `Seeding captcha tasks finished. Created ${generatedTasksCount} tasks`,
  );
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
