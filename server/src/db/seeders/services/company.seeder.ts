import { PrismaClient } from '@prisma/client';
import { readJsonFile } from '../utils/fileReader';
import { logger } from '../utils/logger';

interface CompanySeedData {
  companyName: string;
  companyDescription: string;
  taxId?: string;
  industry?: string;
  website?: string;
  foundedDate?: string;
  managerName?: string;
}

export const seedCompanies = async (prisma: PrismaClient): Promise<void> => {
  logger.info('Seeding companies...');

  const companiesData = readJsonFile<CompanySeedData>('companies.json');

  for (const companyData of companiesData) {
    try {
      const existingCompany = await prisma.company.findFirst({
        where: { companyName: companyData.companyName },
      });

      if (existingCompany) {
        await prisma.company.update({
          where: { companyId: existingCompany.companyId },
          data: {
            companyDescription: companyData.companyDescription,
            taxId: companyData.taxId,
            industry: companyData.industry,
            website: companyData.website,
            foundedDate: companyData.foundedDate
              ? new Date(companyData.foundedDate)
              : null,
            managerName: companyData.managerName,
          },
        });
        logger.info(`Updated company: ${companyData.companyName}`);
      } else {
        await prisma.company.create({
          data: {
            companyName: companyData.companyName,
            companyDescription: companyData.companyDescription,
            taxId: companyData.taxId,
            industry: companyData.industry,
            website: companyData.website,
            foundedDate: companyData.foundedDate
              ? new Date(companyData.foundedDate)
              : null,
            managerName: companyData.managerName,
          },
        });
        logger.info(`Created company: ${companyData.companyName}`);
      }
    } catch (error) {
      logger.error(`Failed to seed company ${companyData.companyName}`);
      logger.error((error as Error).message);
    }
  }

  logger.success(`Seeded ${companiesData.length} companies`);
};
