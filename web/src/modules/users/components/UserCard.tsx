import React from 'react';
import { User, UserRole } from '@/shared/types/user-profile.types';
import StatusBadge from './StatusBadge';

interface UserCardProps {
  user: User;
  onClick: () => void;
  isSelected: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick, isSelected }) => {
  const getFullName = () => {
    const firstName = user.profile?.firstName || '';
    const lastName = user.profile?.lastName || '';
    return [firstName, lastName].filter(Boolean).join(' ') || 'No Name';
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'bg-purple-100 text-purple-800';
      case UserRole.STAFF:
        return 'bg-blue-100 text-blue-800';
      case UserRole.CLIENT:
        return 'bg-green-100 text-green-800';
      case UserRole.SUPPLIER:
        return 'bg-yellow-100 text-yellow-800';
      case UserRole.VENDOR:
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
        isSelected ? 'bg-blue-50' : ''
      }`}
      onClick={onClick}
    >
      <div className='flex items-center space-x-4'>
        <div className='flex-shrink-0'>
          {user.profile?.avatarUrl ? (
            <img
              src={user.profile.avatarUrl}
              alt={getFullName()}
              className='h-10 w-10 rounded-full'
            />
          ) : (
            <div className='h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600'>
              {getFullName().charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className='flex-1 min-w-0'>
          <p className='text-sm font-medium text-gray-900 truncate'>
            {getFullName()}
          </p>
          <p className='text-sm text-gray-500 truncate'>
            {user.username} {user.email ? `• ${user.email}` : ''}
          </p>
          <div className='mt-1 flex items-center space-x-2'>
            <span
              className={`px-2 py-0.5 rounded text-xs font-medium ${getRoleColor(
                user.role
              )}`}
            >
              {user.role}
            </span>
            <StatusBadge isActive={user.isActive} />
          </div>
        </div>

        <div className='flex-shrink-0 text-sm text-gray-500'>
          {user.profile?.company?.companyName ? (
            <span className='truncate'>{user.profile.company.companyName}</span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
