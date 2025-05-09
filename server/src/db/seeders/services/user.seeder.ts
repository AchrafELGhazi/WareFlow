import { PrismaClient, UserRole } from '@prisma/client';
import { readJsonFile } from '../utils/fileReader';
import { logger } from '../utils/logger';
import { hashPassword } from '../utils/passwordHasher';

interface UserSeedData {
  username: string;
  password: string;
  email?: string;
  isActive: boolean;
  role: UserRole;
}

export const seedUsers = async (prisma: PrismaClient): Promise<void> => {
  logger.info('Seeding users...');

  const usersData = readJsonFile<UserSeedData>('users.json');

  for (const userData of usersData) {
    try {
      const passwordHash = await hashPassword(userData.password);

      await prisma.user.upsert({
        where: { username: userData.username },
        update: {
          passwordHash,
          email: userData.email,
          isActive: userData.isActive,
          role: userData.role,
        },
        create: {
          username: userData.username,
          passwordHash,
          email: userData.email,
          isActive: userData.isActive,
          role: userData.role,
        },
      });
    } catch (error) {
      logger.error(`Failed to seed user ${userData.username}`);
      logger.error((error as Error).message);
    }
  }

  logger.success(`Seeded ${usersData.length} users`);
};
