import React, { useState } from 'react';
import { User, UserRole } from '@/shared/types/user-profile.types';
import { useUpdateUserRoleMutation } from '../api/userApi';
import StatusBadge from './StatusBadge';

interface UserDetailProps {
  user: User;
  onRefetch: () => void;
}

const UserDetail: React.FC<UserDetailProps> = ({ user, onRefetch }) => {
  const [updateUserRole, { isLoading }] = useUpdateUserRoleMutation();
  const [selectedRole, setSelectedRole] = useState<UserRole>(user.role);

  const getFullName = () => {
    const firstName = user.profile?.firstName || '';
    const lastName = user.profile?.lastName || '';
    return [firstName, lastName].filter(Boolean).join(' ') || 'No Name';
  };

  const handleRoleChange = async () => {
    if (selectedRole !== user.role) {
      try {
        await updateUserRole({
          userId: user.userId,
          role: selectedRole,
        }).unwrap();
        onRefetch();
      } catch (error) {
        console.error('Failed to update user role:', error);
      }
    }
  };

  return (
    <div className='bg-white rounded-lg shadow overflow-hidden'>
      <div className='p-6'>
        <div className='flex flex-col items-center'>
          {user.profile?.avatarUrl ? (
            <img
              src={user.profile.avatarUrl}
              alt={getFullName()}
              className='h-24 w-24 rounded-full mb-4'
            />
          ) : (
            <div className='h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-2xl mb-4'>
              {getFullName().charAt(0).toUpperCase()}
            </div>
          )}

          <h2 className='text-xl font-bold'>{getFullName()}</h2>
          <p className='text-gray-600 mb-2'>@{user.username}</p>
          <StatusBadge isActive={user.isActive} />

          <div className='mt-6 w-full'>
            <div className='flex items-center justify-between mb-4'>
              <span className='text-gray-600'>Role:</span>
              <div className='flex items-center'>
                <select
                  value={selectedRole}
                  onChange={e => setSelectedRole(e.target.value as UserRole)}
                  className='mr-2 border rounded py-1 px-2'
                >
                  {Object.values(UserRole).map(role => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleRoleChange}
                  disabled={isLoading || selectedRole === user.role}
                  className={`px-3 py-1 rounded text-sm ${
                    selectedRole === user.role || isLoading
                      ? 'bg-gray-100 text-gray-400'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {isLoading ? 'Saving...' : 'Update'}
                </button>
              </div>
            </div>

            <div className='space-y-3'>
              {user.email && (
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Email:</span>
                  <span>{user.email}</span>
                </div>
              )}

              {user.profile?.phone && (
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Phone:</span>
                  <span>{user.profile.phone}</span>
                </div>
              )}

              {user.lastLogin && (
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Last Login:</span>
                  <span>{new Date(user.lastLogin).toLocaleString()}</span>
                </div>
              )}

              {user.profile?.language && (
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Language:</span>
                  <span>{user.profile.language}</span>
                </div>
              )}

              {user.profile?.timezone && (
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Timezone:</span>
                  <span>{user.profile.timezone}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {user.profile?.company && (
        <div className='border-t border-gray-200 p-6'>
          <h3 className='font-medium text-gray-900 mb-2'>
            Company Information
          </h3>
          <p className='text-gray-700 font-semibold'>
            {user.profile.company.companyName}
          </p>
          <p className='text-gray-600 text-sm mb-2'>
            {user.profile.company.companyDescription}
          </p>

          <div className='space-y-2 text-sm'>
            {user.profile.company.industry && (
              <div className='flex justify-between'>
                <span className='text-gray-500'>Industry:</span>
                <span>{user.profile.company.industry}</span>
              </div>
            )}

            {user.profile.company.website && (
              <div className='flex justify-between'>
                <span className='text-gray-500'>Website:</span>
                <a
                  href={user.profile.company.website}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-500 hover:underline'
                >
                  {user.profile.company.website}
                </a>
              </div>
            )}

            {user.profile.company.managerName && (
              <div className='flex justify-between'>
                <span className='text-gray-500'>Manager:</span>
                <span>{user.profile.company.managerName}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {user.profile?.bio && (
        <div className='border-t border-gray-200 p-6'>
          <h3 className='font-medium text-gray-900 mb-2'>Bio</h3>
          <p className='text-gray-600'>{user.profile.bio}</p>
        </div>
      )}

      {user.profile?.address && (
        <div className='border-t border-gray-200 p-6'>
          <h3 className='font-medium text-gray-900 mb-2'>Address</h3>
          <p className='text-gray-600'>
            {[
              user.profile.address.streetAddress,
              user.profile.address.city,
              user.profile.address.state,
              user.profile.address.postalCode,
              user.profile.address.country,
            ]
              .filter(Boolean)
              .join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
