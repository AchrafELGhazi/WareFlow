import React from 'react';
import { User } from '@/shared/types';
import UserCard from './UserCard';

interface UserListProps {
  users: User[];
  isLoading: boolean;
  onSelectUser: (user: User) => void;
  selectedUserId?: string;
}

const UserList: React.FC<UserListProps> = ({
  users,
  isLoading,
  onSelectUser,
  selectedUserId,
}) => {
  if (isLoading) {
    return (
      <div className='p-6'>
        <div className='animate-pulse space-y-4'>
          {[...Array(5)].map((_, i) => (
            <div key={i} className='h-24 bg-gray-200 rounded'></div>
          ))}
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className='p-6 text-center text-gray-500'>
        No users found matching your criteria.
      </div>
    );
  }

  return (
    <div className='divide-y divide-gray-200'>
      {users.map(user => (
        <UserCard
          key={user.userId} // Make sure this prop is correctly set
          user={user}
          onClick={() => onSelectUser(user)}
          isSelected={user.userId === selectedUserId}
        />
      ))}
    </div>
  );
};

export default UserList;
