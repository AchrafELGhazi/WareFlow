import { PrismaClient } from '@prisma/client';
import { readJsonFile } from '../utils/fileReader';
import { logger } from '../utils/logger';

interface StaffSeedData {
  username: string; // Reference to a user with STAFF role
  firstName: string;
  lastName: string;
  hireDate?: string;
  jobCode: string; // Reference to a job
}

export const seedStaff = async (prisma: PrismaClient): Promise<void> => {
  logger.info('Seeding staff...');

  const staffData = readJsonFile<StaffSeedData>('staff.json');

  for (const staffMemberData of staffData) {
    try {
      // Find the user
      const user = await prisma.user.findUnique({
        where: { username: staffMemberData.username },
      });

      if (!user) {
        logger.error(
          `User with username ${staffMemberData.username} not found`
        );
        continue;
      }

      // Check if the user has the STAFF role
      if (user.role !== 'STAFF') {
        logger.warning(
          `User ${staffMemberData.username} does not have the STAFF role`
        );

        // Update the user's role to STAFF
        await prisma.user.update({
          where: { userId: user.userId },
          data: { role: 'STAFF' },
        });

        logger.info(
          `Updated user ${staffMemberData.username} to have the STAFF role`
        );
      }

      // Find the job
      const job = await prisma.job.findUnique({
        where: { jobCode: staffMemberData.jobCode },
      });

      if (!job) {
        logger.error(`Job with code ${staffMemberData.jobCode} not found`);
        continue;
      }

      // Create or update the staff member
      await prisma.staff.upsert({
        where: { userId: user.userId },
        update: {
          firstName: staffMemberData.firstName,
          lastName: staffMemberData.lastName,
          hireDate: staffMemberData.hireDate
            ? new Date(staffMemberData.hireDate)
            : new Date(),
          jobCode: job.jobCode,
        },
        create: {
          userId: user.userId,
          firstName: staffMemberData.firstName,
          lastName: staffMemberData.lastName,
          hireDate: staffMemberData.hireDate
            ? new Date(staffMemberData.hireDate)
            : new Date(),
          jobCode: job.jobCode,
        },
      });
    } catch (error) {
      logger.error(
        `Failed to seed staff member for ${staffMemberData.username}`
      );
      logger.error((error as Error).message);
    }
  }

  logger.success(`Seeded ${staffData.length} staff members`);
};
