import { PrismaClient } from '@prisma/client';
import { logger } from './utils/logger';
import { seedUsers } from './services/userSeeder';
import { seedCompanies } from './services/companySeeder';
import { seedJobs } from './services/jobSeeder';
import { seedWarehouses } from './services/warehouseSeeder';
import { seedCategories } from './services/categorySeeder';
import { seedProducts } from './services/productSeeder';
import { seedProfiles } from './services/profileSeeder';
import { seedStaff } from './services/staffSeeder';
import { seedClients } from './services/clientSeeder';

const main = async () => {
  logger.info('Starting database seeding...');

  const prisma = new PrismaClient();

  try {
    await seedCompanies(prisma);
    await seedJobs(prisma);
    await seedUsers(prisma);
    await seedProfiles(prisma);
    await seedStaff(prisma);
    await seedClients(prisma);
    await seedWarehouses(prisma);
    await seedCategories(prisma);
    await seedProducts(prisma);

    logger.success('Database seeding completed successfully!');
  } catch (error) {
    logger.error('Failed to seed database');
    logger.error((error as Error).message);
  } finally {
    await prisma.$disconnect();
  }
};

main().catch(error => {
  logger.error('Unhandled error during seeding');
  logger.error((error as Error).message);
  process.exit(1);
});
