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
export interface AllUsersResult {
  users: {
    userId: string;
    username: string;
    email: string | null;
    isActive: boolean;
    lastLogin: Date | null;
    role: UserRole;
    profile: {
      firstName: string | null;
      lastName: string | null;
      phone: string | null;
      bio: string | null;
      avatarUrl: string | null;
      language: string;
      timezone: string;
    } | null;
    company: {
      companyName: string | null;
      companyDescription: string | null;
      taxId: string | null;
      industry: string | null;
      website: string | null;
      foundedDate: Date | null;
      managerName: string | null;
    } | null;
  }[];
}
