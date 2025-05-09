import { PrismaClient } from '@prisma/client';
import { logger } from './utils/logger';
import { seedUsers } from './services/user.seeder';
import { seedCompanies } from './services/company.seeder';
import { seedJobs } from './services/job.seeder';
import { seedWarehouses } from './services/warehouse.seeder';
import { seedCategories } from './services/category.seeder';
import { seedProducts } from './services/product.seeder';
import { seedProfiles } from './services/profile.seeder';
import { seedStaff } from './services/staff.seeder';
import { seedClients } from './services/client.seeder';

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
