import { baseApi } from '@/services/baseApi';
import { User, UserRole } from '@/shared/types';

export interface GetAllUsersResponse {
  users: User[];
}

export interface UpdateUserRoleResponse {
  success: boolean;
}

export const usersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllUsers: builder.query<GetAllUsersResponse, void>({
      query: () => 'user',
      providesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    getUserById: builder.query<User, string>({
      query: userId => `user/${userId}`,
      transformResponse: (response: { success: boolean; user: User }) =>
        response.user,
      providesTags: (_result, _error, userId) => [
        { type: 'Users', id: userId },
      ],
    }),
    updateUserRole: builder.mutation<
      UpdateUserRoleResponse,
      { userId: string; role: UserRole }
    >({
      query: ({ userId, role }) => ({
        url: `user/${userId}/${role}`,
        method: 'PATCH',
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserRoleMutation,
} = usersApi;
