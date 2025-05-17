import React, { useState, useEffect } from 'react';
import { useGetAllUsersQuery } from '../api/userApi';
import UserList from '../components/UserList';
import { User } from '@/shared/types';
import UserDetail from '../components/UserDetail';

const Users: React.FC = () => {
  const { data, isLoading, error, refetch } = useGetAllUsersQuery();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);


  useEffect(() => {
    if (data?.users?.users && Array.isArray(data.users.users)) {
      const users = data.users.users;
      setFilteredUsers(users);
    } else {
      setFilteredUsers([]);
    }
  }, [data]);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-6'>User Management</h1>

      {error ? (
        <div className='bg-red-100 text-red-700 p-4 rounded mb-4'>
          Error loading users. Please try again.
        </div>
      ) : null}

      <div className='flex flex-col md:flex-row gap-6'>
        <div className='w-full md:w-2/3'>
          <div className='mt-4 bg-white rounded-lg shadow'>
            <UserList
              users={filteredUsers}
              isLoading={isLoading}
              onSelectUser={handleUserSelect}
              selectedUserId={selectedUser?.userId}
            />
          </div>
        </div>

        <div className='w-full md:w-1/3'>
          {selectedUser ? (
            <UserDetail user={selectedUser} onRefetch={refetch} />
          ) : (
            <div className='bg-white p-6 rounded-lg shadow text-center'>
              <p className='text-gray-500'>Select a user to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
