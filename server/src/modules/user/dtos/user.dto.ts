import { UserRole } from '@prisma/client';

export interface GetUserInfoDto {
  userId: string;
}

export interface UserInfoResult {
  firstName: string;
  lastName: string;
  role: UserRole | null;
  companyName: string | null;
  phone: string | null;
}
