import { PrismaClient, User } from "@prisma/client";
import UserQueries  from "../queries/user.queries";
import { UserInfoResult } from "../dtos/user.dto";

class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getUserInfoService(data: string): Promise<UserInfoResult> {
    const userInfo = await UserQueries.getUserInfoQuery(data);
    return userInfo as UserInfoResult;
  }
}

export default new UserService();
