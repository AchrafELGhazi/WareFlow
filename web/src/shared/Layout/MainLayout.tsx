import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import Logo from '@/shared/components/Logo';
import { clearCredentials } from '@/modules/auth/store/authSlice';

/**
 * Main layout for authenticated users
 * Includes header, navigation sidebar and content area
 */
const MainLayout: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(clearCredentials());
    navigate('/auth/login');
  };

  // Helper to determine if a navigation item is active
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 z-20 bg-gray-600 bg-opacity-75 lg:hidden'
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transition duration-300 transform bg-white lg:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='flex items-center justify-between h-16 px-6 bg-indigo-600'>
          <div className='text-lg text-white font-bold'>Your App</div>
          <button
            onClick={() => setSidebarOpen(false)}
            className='p-1 text-white focus:outline-none'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              ></path>
            </svg>
          </button>
        </div>
        <div className='flex flex-col h-full overflow-y-auto'>
          <nav className='flex-1 px-4 py-4 space-y-1'>{renderNavItems()}</nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className='hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-10 lg:w-64 lg:flex lg:flex-col'>
        <div className='flex items-center justify-center h-16 px-6 bg-indigo-600'>
          <Logo className='text-white' />
        </div>
        <div className='flex flex-col flex-1 h-0 overflow-y-auto'>
          <nav className='flex-1 px-4 py-4 space-y-1 bg-white'>
            {renderNavItems()}
          </nav>
        </div>
      </div>

      {/* Main content area */}
      <div className='flex flex-col lg:pl-64'>
        {/* Top header */}
        <header className='sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-white shadow lg:px-6'>
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className='p-1 text-gray-500 focus:outline-none lg:hidden'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h16'
              ></path>
            </svg>
          </button>

          {/* User menu */}
          <div className='flex items-center gap-4'>
            {user && (
              <div className='hidden md:block text-sm text-gray-700'>
                <span className='font-medium'>{user.username}</span>
                <span className='ml-2 px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full text-xs'>
                  {user.role}
                </span>
              </div>
            )}

            <div className='relative'>
              <button
                onClick={handleLogout}
                className='px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className='flex-1 p-4 lg:p-6'>
          <Outlet />
        </main>

        {/* Footer */}
        <footer className='py-4 bg-white border-t border-gray-200'>
          <div className='container px-4 mx-auto text-center text-sm text-gray-500'>
            <p>
              &copy; {new Date().getFullYear()} Your App. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );

  // Helper function to render navigation items
  function renderNavItems() {
    const navItems = [
      {
        path: '/dashboard',
        name: 'Dashboard',
        icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      },
      {
        path: '/users',
        name: 'Users',
        icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      },
      {
        path: '/warehouses',
        name: 'Warehouses',
        icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      },
    ];

    return navItems.map(item => (
      <Link
        key={item.path}
        to={item.path}
        className={`flex items-center px-2 py-2 text-base font-medium rounded-md ${
          isActive(item.path)
            ? 'text-white bg-indigo-600'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <svg
          className={`w-5 h-5 mr-3 ${
            isActive(item.path) ? 'text-white' : 'text-gray-500'
          }`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d={item.icon}
          ></path>
        </svg>
        {item.name}
      </Link>
    ));
  }
};

export default MainLayout;
