import { PrismaClient } from '@prisma/client';

class UserQueries {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getUserInfoQuery = (userId: string) => {
    return this.prisma.$queryRaw`
        SELECT 
          p.first_name AS "firstName", 
          p.last_name AS "lastName", 
          u.role AS "role", 
          p.phone AS "phone", 
          c.company_name AS "companyName"
        FROM users u
        LEFT JOIN profiles p ON u.user_id = p.user_id
        LEFT JOIN companies c ON p.company_id = c.company_id
        WHERE u.user_id = ${userId}
      `;
  };
}

export default new UserQueries();
