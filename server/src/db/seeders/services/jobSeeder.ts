import { PrismaClient } from '@prisma/client';
import { readJsonFile } from '../utils/fileReader';
import { logger } from '../utils/logger';

interface JobSeedData {
  jobCode: string;
  jobDescription: string;
  jobChargeHour: number;
}

export const seedJobs = async (prisma: PrismaClient): Promise<void> => {
  logger.info('Seeding jobs...');

  const jobsData = readJsonFile<JobSeedData>('jobs.json');

  for (const jobData of jobsData) {
    try {
      await prisma.job.upsert({
        where: { jobCode: jobData.jobCode },
        update: {
          jobDescription: jobData.jobDescription,
          jobChargeHour: jobData.jobChargeHour,
        },
        create: {
          jobCode: jobData.jobCode,
          jobDescription: jobData.jobDescription,
          jobChargeHour: jobData.jobChargeHour,
        },
      });
    } catch (error) {
      logger.error(`Failed to seed job ${jobData.jobDescription}`);
      logger.error((error as Error).message);
    }
  }

  logger.success(`Seeded ${jobsData.length} jobs`);
};
