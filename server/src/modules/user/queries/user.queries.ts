import { PrismaClient, UserRole } from "@prisma/client";
class UserQueries {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getUserInfoQuery = (userId: string) => {
    return this.prisma.$queryRaw`
        SELECT u.username, u.email, u.is_active, u.last_login, u.role, p.first_name, p.last_name, p.phone, p.bio, p.avatar_url,
              p.language, p.timezone, c.company_name, c.company_description, c.tax_id, c.industry, c.website, c.founded_date, c.manager_name
        FROM users u
        LEFT JOIN profiles p ON u.user_id = p.user_id
        LEFT JOIN companies c ON p.company_id = c.company_id
        WHERE u.user_id = ${userId}
      `;
  };

  updateUserRoleQuery = (userId: string, role: string) => {
    return this.prisma.$queryRaw`
      UPDATE users
      SET role = ${role}::"UserRole"
      WHERE user_id = ${userId}
    `;
  };

  getAllUsersQuery = () => {
    return this.prisma.$queryRaw`
    SELECT 
      u.user_id AS "userId",
      u.username,
      u.email,
      u.is_active AS "isActive",
      u.last_login AS "lastLogin",
      u.role,
      p.profile_id AS "profileId",
      p.first_name AS "firstName",
      p.last_name AS "lastName",
      p.phone,
      p.bio,
      p.avatar_url AS "avatarUrl",
      p.language,
      p.timezone,
      c.company_id AS "companyId",
      c.company_name AS "companyName",
      c.company_description AS "companyDescription",
      c.tax_id AS "taxId",
      c.industry,
      c.website,
      c.founded_date AS "foundedDate",
      c.manager_name AS "managerName"
    FROM users u
    LEFT JOIN profiles p ON u.user_id = p.user_id
    LEFT JOIN companies c ON p.company_id = c.company_id
    ORDER BY u.username
  `;
  };
}

export default new UserQueries();
