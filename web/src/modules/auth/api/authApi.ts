import { baseApi } from '@/services/baseApi';
import { UserRole } from '@/shared/types';

export interface User {
  userId: string;
  username: string;
  email: string | null;
  role: UserRole;
}

export interface SignupRequest {
  username: string;
  password: string;
  email?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    signup: builder.mutation<AuthResponse, SignupRequest>({
      query: credentials => ({
        url: '/auth/signup',
        method: 'POST',
        body: credentials,
      }),
    }),

    login: builder.mutation<AuthResponse, LoginRequest>({
      query: credentials => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),

    getCurrentUser: builder.query<{ user: User }, void>({
      query: () => '/auth/me',
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
} = authApi;
