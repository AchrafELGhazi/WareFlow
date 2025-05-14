import { UserRole } from "@prisma/client";

export interface GetUserInfoDto {
  userId: string;
}

export interface UserInfoResult{
  firstname: string;
  lastname: string;
  role: UserRole | null;
  company_name: string | null;
  phone: string | null;
}
