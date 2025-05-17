import React, { useState, useEffect } from 'react';
import { User, UserRole } from '@/shared/types';

interface ExtendedUserInfo {
  userId: string;
  username: string;
  email?: string | null;
  role: UserRole;
  phoneNumber?: string;
  department?: string;
  position?: string;
  createdAt?: string;
  lastLoginDisplay?: string;
  permissions?: string[];
  profilePicture?: string;
}

const MePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [extendedUserInfo, setExtendedUserInfo] =
    useState<ExtendedUserInfo | null>(null);
  const [activeTab, setActiveTab] = useState<
    'profile' | 'security' | 'preferences'
  >('profile');

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const userData = JSON.parse(userString) as User;
        setUser(userData);

        setExtendedUserInfo({
          userId: userData.userId,
          username: userData.username,
          email: userData.email,
          role: userData.role,
          phoneNumber: '+1 (555) 123-4567',
          department: 'Operations',
          position: 'Warehouse Manager',
          createdAt: userData.createdAt
            ? new Date(userData.createdAt).toLocaleDateString()
            : '2023-06-15',
          lastLoginDisplay: userData.lastLogin
            ? new Date(userData.lastLogin).toLocaleDateString()
            : new Date().toLocaleDateString(),
          permissions: ['read:all', 'write:own', 'manage:inventory'],
        });
      } catch (error) { 
        console.error('Error parsing user from localStorage:', error);
      }
    }
  }, []);

  if (!user || !extendedUserInfo) {
    return (
      <div className='flex items-center justify-center min-h-screen p-4'>
        <div className='bg-white dark:bg-gray-800 shadow rounded-lg p-8 max-w-md w-full'>
          <div className='text-center'>
            <div className='text-red-500 text-xl mb-4'>User Not Found</div>
            <p className='text-gray-600 dark:text-gray-300'>
              You need to be logged in to view this page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden'>
      {/* User header section */}
      <div className='bg-blue-700 text-white p-8'>
        <div className='flex flex-col md:flex-row items-center'>
          <div className='mb-4 md:mb-0 md:mr-6 flex-shrink-0'>
            {extendedUserInfo.profilePicture ? (
              <img
                src={extendedUserInfo.profilePicture}
                alt={`${extendedUserInfo.username}'s profile`}
                className='w-32 h-32 rounded-full object-cover border-4 border-white'
              />
            ) : (
              <div className='w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold border-4 border-white'>
                {extendedUserInfo.username?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </div>
          <div>
            <h1 className='text-3xl font-bold'>{extendedUserInfo.username}</h1>
            <div className='flex flex-wrap gap-3 mt-2'>
              <div className='bg-blue-800 px-3 py-1 rounded-full text-sm'>
                {extendedUserInfo.role}
              </div>
              <div className='bg-blue-800 px-3 py-1 rounded-full text-sm'>
                {extendedUserInfo.department}
              </div>
              <div className='bg-blue-800 px-3 py-1 rounded-full text-sm'>
                {extendedUserInfo.position}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className='border-b border-gray-200 dark:border-gray-700'>
        <nav className='flex px-6' aria-label='Tabs'>
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-4 px-4 font-medium text-sm border-b-2 ${
              activeTab === 'profile'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Profile Information
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`py-4 px-4 font-medium text-sm border-b-2 ${
              activeTab === 'security'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Security
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className={`py-4 px-4 font-medium text-sm border-b-2 ${
              activeTab === 'preferences'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Preferences
          </button>
        </nav>
      </div>

      {/* Tab content */}
      <div className='p-6'>
        {activeTab === 'profile' && (
          <div className='space-y-6'>
            <h3 className='text-lg font-medium text-gray-900 dark:text-white'>
              Profile Information
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-500 dark:text-gray-400'>
                    Username
                  </label>
                  <div className='mt-1 text-gray-900 dark:text-white'>
                    {extendedUserInfo.username}
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-500 dark:text-gray-400'>
                    Email Address
                  </label>
                  <div className='mt-1 text-gray-900 dark:text-white'>
                    {extendedUserInfo.email || 'Not provided'}
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-500 dark:text-gray-400'>
                    Phone Number
                  </label>
                  <div className='mt-1 text-gray-900 dark:text-white'>
                    {extendedUserInfo.phoneNumber || 'Not provided'}
                  </div>
                </div>
              </div>

              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-500 dark:text-gray-400'>
                    Department
                  </label>
                  <div className='mt-1 text-gray-900 dark:text-white'>
                    {extendedUserInfo.department || 'Not assigned'}
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-500 dark:text-gray-400'>
                    Position
                  </label>
                  <div className='mt-1 text-gray-900 dark:text-white'>
                    {extendedUserInfo.position || 'Not assigned'}
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-500 dark:text-gray-400'>
                    Member Since
                  </label>
                  <div className='mt-1 text-gray-900 dark:text-white'>
                    {extendedUserInfo.createdAt || 'Unknown'}
                  </div>
                </div>
              </div>
            </div>

            <div className='pt-6 border-t border-gray-200 dark:border-gray-700'>
              <h4 className='text-md font-medium text-gray-900 dark:text-white mb-4'>
                System Permissions
              </h4>

              <div className='flex flex-wrap gap-2'>
                {extendedUserInfo.permissions?.map((permission, index) => (
                  <span
                    key={index}
                    className='px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm'
                  >
                    {permission}
                  </span>
                ))}
              </div>
            </div>

            <div className='flex justify-end'>
              <button className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
                Edit Profile
              </button>
            </div>
          </div>
        )}

        {/* Other tabs would go here */}
        {activeTab === 'security' && (
          <div className='space-y-6'>
            <h3 className='text-lg font-medium text-gray-900 dark:text-white'>
              Security Settings
            </h3>
            <p className='text-gray-600 dark:text-gray-400'>
              Security settings will be displayed here.
            </p>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className='space-y-6'>
            <h3 className='text-lg font-medium text-gray-900 dark:text-white'>
              User Preferences
            </h3>
            <p className='text-gray-600 dark:text-gray-400'>
              Preference settings will be displayed here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MePage;
