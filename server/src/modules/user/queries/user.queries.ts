import { PrismaClient } from "@prisma/client";

class UserQueries {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  getUserInfoQuery = (userId: string) => {
    return this.prisma.$queryRaw`
        SELECT firstName, lastName, role, phone, companyName
        FROM "users" LEFT JOIN 
        ("profiles" LEFT JOIN "companies"
        ON "profiles".companyId = "companies".companyId)
        ON "users".userId = "profiles".userId
        WHERE "users".userId = ${userId}
      `;
  };
}

export default new UserQueries();
