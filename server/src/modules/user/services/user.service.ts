import { PrismaClient, UserRole } from '@prisma/client';
import UserQueries from '../queries/user.queries';
import { UserInfoResult } from '../dtos/user.dto';

class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getUserInfoService(userId: string): Promise<UserInfoResult | null> {
    const results = await UserQueries.getUserInfoQuery(userId);

    if (Array.isArray(results) && results.length > 0) {
      return results[0] as UserInfoResult;
    }

    return null;
  }
}

export default new UserService();
