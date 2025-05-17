import React, { useState } from 'react';
import { useAppSelector } from '@/app/hooks';
import { User } from '@/shared/types';

// This would typically come from your API or types definition
interface ExtendedUserInfo extends User {
  email?: string;
  phoneNumber?: string;
  role?: string;
  createdAt?: string;
  lastLogin?: string;
  permissions?: string[];
  profilePicture?: string;
  department?: string;
  position?: string;
}

const MePage: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);
  const [activeTab, setActiveTab] = useState<
    'profile' | 'security' | 'preferences'
  >('profile');

  // This would typically come from an API call to get full user details
  // For now we'll mock some additional information
  const extendedUserInfo: ExtendedUserInfo = {
    ...user,
    email: user?.email || 'user@example.com',
    phoneNumber: '+1 (555) 123-4567',
    createdAt: '2023-06-15',
    lastLogin: new Date().toISOString().split('T')[0],
    permissions: ['read:all', 'write:own', 'manage:inventory'],
    department: 'Operations',
    position: 'Warehouse Manager',
  };

  if (!user) {
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
                {extendedUserInfo.role || 'User'}
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
                    {extendedUserInfo.email}
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-500 dark:text-gray-400'>
                    Phone Number
                  </label>
                  <div className='mt-1 text-gray-900 dark:text-white'>
                    {extendedUserInfo.phoneNumber}
                  </div>
                </div>
              </div>

              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-500 dark:text-gray-400'>
                    Department
                  </label>
                  <div className='mt-1 text-gray-900 dark:text-white'>
                    {extendedUserInfo.department}
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-500 dark:text-gray-400'>
                    Position
                  </label>
                  <div className='mt-1 text-gray-900 dark:text-white'>
                    {extendedUserInfo.position}
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-500 dark:text-gray-400'>
                    Member Since
                  </label>
                  <div className='mt-1 text-gray-900 dark:text-white'>
                    {extendedUserInfo.createdAt}
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

        {activeTab === 'security' && (
          <div className='space-y-6'>
            <h3 className='text-lg font-medium text-gray-900 dark:text-white'>
              Security
            </h3>

            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-500 dark:text-gray-400'>
                  Last Login
                </label>
                <div className='mt-1 text-gray-900 dark:text-white'>
                  {extendedUserInfo.lastLogin}
                </div>
              </div>

              <div className='pt-4 border-t border-gray-200 dark:border-gray-700'>
                <h4 className='text-md font-medium text-gray-900 dark:text-white'>
                  Password
                </h4>
                <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
                  Last changed 3 months ago
                </p>

                <button className='mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
                  Change Password
                </button>
              </div>

              <div className='pt-4 border-t border-gray-200 dark:border-gray-700'>
                <h4 className='text-md font-medium text-gray-900 dark:text-white'>
                  Two-Factor Authentication
                </h4>
                <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
                  Secure your account with two-factor authentication
                </p>

                <div className='mt-4 flex items-center'>
                  <div className='flex items-center h-5'>
                    <input
                      id='2fa'
                      name='2fa'
                      type='checkbox'
                      className='h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                    />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label
                      htmlFor='2fa'
                      className='font-medium text-gray-700 dark:text-gray-300'
                    >
                      Enable two-factor authentication
                    </label>
                  </div>
                </div>
              </div>

              <div className='pt-4 border-t border-gray-200 dark:border-gray-700'>
                <h4 className='text-md font-medium text-gray-900 dark:text-white'>
                  Sessions
                </h4>
                <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
                  Manage your active sessions
                </p>

                <div className='mt-4 space-y-4'>
                  <div className='flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
                    <div>
                      <div className='font-medium text-gray-900 dark:text-white'>
                        Current Session
                      </div>
                      <div className='text-sm text-gray-500 dark:text-gray-400'>
                        Chrome on Windows • {new Date().toLocaleString()}
                      </div>
                    </div>
                    <div className='text-sm text-green-600 dark:text-green-400 font-medium'>
                      Active Now
                    </div>
                  </div>
                </div>

                <button className='mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'>
                  Sign Out All Sessions
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className='space-y-6'>
            <h3 className='text-lg font-medium text-gray-900 dark:text-white'>
              Preferences
            </h3>

            <div className='space-y-4'>
              <div>
                <h4 className='text-md font-medium text-gray-900 dark:text-white'>
                  Appearance
                </h4>

                <div className='mt-4 space-y-4'>
                  <div className='flex items-start'>
                    <div className='flex items-center h-5'>
                      <input
                        id='darkMode'
                        name='darkMode'
                        type='checkbox'
                        className='h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                      />
                    </div>
                    <div className='ml-3 text-sm'>
                      <label
                        htmlFor='darkMode'
                        className='font-medium text-gray-700 dark:text-gray-300'
                      >
                        Dark Mode
                      </label>
                      <p className='text-gray-500 dark:text-gray-400'>
                        Use dark theme for the application
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='pt-4 border-t border-gray-200 dark:border-gray-700'>
                <h4 className='text-md font-medium text-gray-900 dark:text-white'>
                  Notifications
                </h4>

                <div className='mt-4 space-y-4'>
                  <div className='flex items-start'>
                    <div className='flex items-center h-5'>
                      <input
                        id='emailNotifs'
                        name='emailNotifs'
                        type='checkbox'
                        defaultChecked
                        className='h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                      />
                    </div>
                    <div className='ml-3 text-sm'>
                      <label
                        htmlFor='emailNotifs'
                        className='font-medium text-gray-700 dark:text-gray-300'
                      >
                        Email Notifications
                      </label>
                      <p className='text-gray-500 dark:text-gray-400'>
                        Receive notifications via email
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start'>
                    <div className='flex items-center h-5'>
                      <input
                        id='systemNotifs'
                        name='systemNotifs'
                        type='checkbox'
                        defaultChecked
                        className='h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                      />
                    </div>
                    <div className='ml-3 text-sm'>
                      <label
                        htmlFor='systemNotifs'
                        className='font-medium text-gray-700 dark:text-gray-300'
                      >
                        System Notifications
                      </label>
                      <p className='text-gray-500 dark:text-gray-400'>
                        Receive in-app notifications
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='pt-4 border-t border-gray-200 dark:border-gray-700'>
                <h4 className='text-md font-medium text-gray-900 dark:text-white'>
                  Language Settings
                </h4>

                <div className='mt-4'>
                  <label
                    htmlFor='language'
                    className='block text-sm font-medium text-gray-700 dark:text-gray-300'
                  >
                    Interface Language
                  </label>
                  <select
                    id='language'
                    name='language'
                    className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                    defaultValue='en'
                  >
                    <option value='en'>English</option>
                    <option value='es'>Español</option>
                    <option value='fr'>Français</option>
                    <option value='de'>Deutsch</option>
                  </select>
                </div>
              </div>
            </div>

            <div className='flex justify-end'>
              <button className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MePage;
