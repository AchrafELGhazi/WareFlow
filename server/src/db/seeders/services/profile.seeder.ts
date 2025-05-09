import { PrismaClient } from '@prisma/client';
import { readJsonFile } from '../utils/fileReader';
import { logger } from '../utils/logger';

interface ProfileSeedData {
  username: string; // Reference to a user
  firstName?: string;
  lastName?: string;
  phone?: string;
  bio?: string;
  avatarUrl?: string;
  language?: string;
  timezone?: string;
  companyName?: string; // Reference to a company
  address?: {
    streetAddress?: string;
    city: string;
    state?: string;
    postalCode?: string;
    country: string;
  };
}

export const seedProfiles = async (prisma: PrismaClient): Promise<void> => {
  logger.info('Seeding profiles...');

  const profilesData = readJsonFile<ProfileSeedData>('profiles.json');

  for (const profileData of profilesData) {
    try {
      // Find the user
      const user = await prisma.user.findUnique({
        where: { username: profileData.username },
      });

      if (!user) {
        logger.error(`User with username ${profileData.username} not found`);
        continue;
      }

      // Find company if provided
      let companyId: string | null = null;
      if (profileData.companyName) {
        const company = await prisma.company.findFirst({
          where: { companyName: profileData.companyName },
        });

        if (company) {
          companyId = company.companyId;
        } else {
          logger.warning(
            `Company with name ${profileData.companyName} not found`
          );
        }
      }

      // Create or update the profile
      const profile = await prisma.profile.upsert({
        where: { userId: user.userId },
        update: {
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          phone: profileData.phone,
          bio: profileData.bio,
          avatarUrl: profileData.avatarUrl,
          language: profileData.language || 'en',
          timezone: profileData.timezone || 'UTC',
          companyId,
        },
        create: {
          userId: user.userId,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          phone: profileData.phone,
          bio: profileData.bio,
          avatarUrl: profileData.avatarUrl,
          language: profileData.language || 'en',
          timezone: profileData.timezone || 'UTC',
          companyId,
        },
      });

      // Create or update address if provided
      if (profileData.address) {
        await prisma.address.upsert({
          where: { profileId: profile.profileId },
          update: {
            streetAddress: profileData.address.streetAddress,
            city: profileData.address.city,
            state: profileData.address.state,
            postalCode: profileData.address.postalCode,
            country: profileData.address.country,
          },
          create: {
            profileId: profile.profileId,
            streetAddress: profileData.address.streetAddress,
            city: profileData.address.city,
            state: profileData.address.state,
            postalCode: profileData.address.postalCode,
            country: profileData.address.country,
          },
        });
      }
    } catch (error) {
      logger.error(`Failed to seed profile for ${profileData.username}`);
      logger.error((error as Error).message);
    }
  }

  logger.success(`Seeded ${profilesData.length} profiles`);
};
