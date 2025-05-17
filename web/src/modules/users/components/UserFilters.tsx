import React from 'react';
import { UserRole } from '@/shared/types/user-profile.types';

interface UserFiltersProps {
  filters: {
    role: 'ALL' | UserRole;
    status: 'ALL' | 'ACTIVE' | 'INACTIVE';
    search: string;
  };
  onFilterChange: (filters: UserFiltersProps['filters']) => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      role: e.target.value as 'ALL' | UserRole,
    });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      status: e.target.value as 'ALL' | 'ACTIVE' | 'INACTIVE',
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      search: e.target.value,
    });
  };

  return (
    <div className='bg-white p-4 rounded-lg shadow mb-6'>
      <div className='flex flex-col md:flex-row gap-4'>
        <div className='flex-1'>
          <label
            htmlFor='search'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Search
          </label>
          <input
            id='search'
            type='text'
            value={filters.search}
            onChange={handleSearchChange}
            placeholder='Search by name, username, email...'
            className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          />
        </div>

        <div className='w-full md:w-1/5'>
          <label
            htmlFor='role'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Role
          </label>
          <select
            id='role'
            value={filters.role}
            onChange={handleRoleChange}
            className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          >
            <option value='ALL'>All Roles</option>
            {Object.values(UserRole).map(role => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <div className='w-full md:w-1/5'>
          <label
            htmlFor='status'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Status
          </label>
          <select
            id='status'
            value={filters.status}
            onChange={handleStatusChange}
            className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          >
            <option value='ALL'>All Status</option>
            <option value='ACTIVE'>Active</option>
            <option value='INACTIVE'>Inactive</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default UserFilters;
