import { PrismaClient } from '@prisma/client';
import { readJsonFile } from '../utils/fileReader';
import { logger } from '../utils/logger';

interface ClientSeedData {
  username: string; // Reference to a user with CLIENT role
  creditLimit?: number;
  creditRating?: string;
  accountStatus?: string;
  companyName?: string; // Reference to a company
}

export const seedClients = async (prisma: PrismaClient): Promise<void> => {
  logger.info('Seeding clients...');

  const clientsData = readJsonFile<ClientSeedData>('clients.json');

  for (const clientData of clientsData) {
    try {
      // Find the user
      const user = await prisma.user.findUnique({
        where: { username: clientData.username },
      });

      if (!user) {
        logger.error(`User with username ${clientData.username} not found`);
        continue;
      }

      // Check if the user has the CLIENT role
      if (user.role !== 'CLIENT') {
        logger.warning(
          `User ${clientData.username} does not have the CLIENT role`
        );

        // Update the user's role to CLIENT
        await prisma.user.update({
          where: { userId: user.userId },
          data: { role: 'CLIENT' },
        });

        logger.info(
          `Updated user ${clientData.username} to have the CLIENT role`
        );
      }

      // Find company if provided
      let companyId: string | null = null;
      if (clientData.companyName) {
        const company = await prisma.company.findFirst({
          where: { companyName: clientData.companyName },
        });

        if (company) {
          companyId = company.companyId;
        } else {
          logger.warning(
            `Company with name ${clientData.companyName} not found`
          );
        }
      }

      // Create or update the client
      await prisma.client.upsert({
        where: { userId: user.userId },
        update: {
          creditLimit: clientData.creditLimit,
          creditRating: clientData.creditRating,
          accountStatus: clientData.accountStatus || 'active',
          companyId,
        },
        create: {
          userId: user.userId,
          creditLimit: clientData.creditLimit,
          creditRating: clientData.creditRating,
          accountStatus: clientData.accountStatus || 'active',
          companyId,
        },
      });
    } catch (error) {
      logger.error(`Failed to seed client for ${clientData.username}`);
      logger.error((error as Error).message);
    }
  }

  logger.success(`Seeded ${clientsData.length} clients`);
};
