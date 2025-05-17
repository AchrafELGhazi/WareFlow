import UserQueries from '../queries/user.queries';
import { AllUsersResult, UserInfoResult } from '../dtos/user.dto';

class UserService {
  async getAllUsersService(): Promise<AllUsersResult> {
    const results = await UserQueries.getAllUsersQuery();

    const users = Array.isArray(results)
      ? results.map(user => ({
          userId: user.userId,
          username: user.username,
          email: user.email,
          isActive: user.isActive,
          lastLogin: user.lastLogin,
          role: user.role,
          profile: user.profileId
            ? {
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                bio: user.bio,
                avatarUrl: user.avatarUrl,
                language: user.language,
                timezone: user.timezone,
              }
            : null,
          company: user.companyId
            ? {
                companyName: user.companyName,
                companyDescription: user.companyDescription,
                taxId: user.taxId,
                industry: user.industry,
                website: user.website,
                foundedDate: user.foundedDate,
                managerName: user.managerName,
              }
            : null,
        }))
      : [];

    return { users };
  }

  async getUserInfoService(userId: string): Promise<UserInfoResult | null> {
    const results = await UserQueries.getUserInfoQuery(userId);

    if (Array.isArray(results) && results.length > 0) {
      return results[0] as UserInfoResult;
    }
    return null;
  }

  async updateUserRoleService(
    userId: string,
    role: string
  ): Promise<UserInfoResult | null> {
    const results = await UserQueries.updateUserRoleQuery(userId, role);

    if (Array.isArray(results) && results.length > 0) {
      return results[0] as UserInfoResult;
    }

    return null;
  }
}

export default new UserService();
