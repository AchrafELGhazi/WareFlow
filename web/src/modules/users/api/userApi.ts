import { baseApi } from '@/services/baseApi';
import { User, UserRole } from '@/shared/types';

// Define the expected response type from the component
export interface GetAllUsersResponse {
  users: User[];
}

// Define the actual API response type
export interface ApiUsersResponse {
  success: boolean;
  users: {
    users: User[];
  };
}

export interface UpdateUserRoleResponse {
  success: boolean;
}

export const usersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllUsers: builder.query<ApiUsersResponse, void>({
      query: () => 'user',
      // If you want to transform the response to match GetAllUsersResponse,
      // uncomment this section:
      /*
      transformResponse: (response: ApiUsersResponse) => {
        return {
          users: response.users.users || []
        };
      },
      */
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
