import { RootState } from '@/app/store';
import { usersApi } from '../api/userApi';

export const selectAllUsers = (state: RootState) => {
  const { data } = usersApi.endpoints.getAllUsers.select()(state);
  return data?.users || [];
};
