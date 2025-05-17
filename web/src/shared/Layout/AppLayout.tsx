import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import Logo from '@/shared/components/Logo';
import { clearCredentials } from '@/modules/auth/store/authSlice';

/**
 * Modern AppLayout for authenticated users
 * Features a sleek dark blue sidebar with enhanced navigation experience
 */
const AppLayout: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(clearCredentials());
    navigate('/auth/signin');
  };

  // Helper to determine if a navigation item is active
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className='flex h-screen bg-gray-100 dark:bg-gray-900'>
      {sidebarOpen && (
        <div
          className='fixed inset-0 z-20 bg-gray-900 bg-opacity-50 transition-opacity lg:hidden'
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform transition-all duration-300 ease-in-out bg-gray-900 lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='flex items-center justify-between h-16 px-6 bg-gray-800'>
          <div className='flex items-center'>
            <Logo className='h-8 w-auto text-white' />
          
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className='p-1 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 lg:hidden focus:outline-none focus:ring-2 focus:ring-blue-500'
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

        <div className='px-4 py-4 border-b border-gray-800'>
          <div className='flex items-center space-x-3'>
            <div className='flex-shrink-0'>
              <div className='w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold'>
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-white truncate'>
                {user?.username || 'User'}
              </p>
              <p className='text-xs text-gray-400 truncate'>
                {user?.role || 'User'}
              </p>
            </div>
          </div>
        </div>

        <nav className='px-2 py-4 space-y-1 overflow-y-auto'>
          {renderNavItems()}
        </nav>

        <div className='absolute bottom-0 w-full border-t border-gray-800 p-4'>
          <button
            onClick={handleLogout}
            className='w-full flex items-center justify-center px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            <svg
              className='w-4 h-4 mr-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
              ></path>
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      <div className='flex-1 flex flex-col overflow-hidden'>
        <header className='bg-white dark:bg-gray-800 shadow-sm z-10'>
          <div className='px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center justify-between h-16'>
              <button
                onClick={() => setSidebarOpen(true)}
                className='p-1 text-gray-500 dark:text-gray-400 rounded-md hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden focus:outline-none focus:ring-2 focus:ring-blue-500'
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
              <h1 className='text-xl font-semibold text-gray-900 dark:text-white hidden sm:block'>
                {getPageTitle()}
              </h1>

              <div className='flex items-center space-x-4'>
                <button className='p-1 text-gray-500 dark:text-gray-400 rounded-full hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
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
                      d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                    ></path>
                  </svg>
                </button>

                <div className='relative'>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className='flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  >
                    <div className='w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white'>
                      {user?.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  </button>

                  {userMenuOpen && (
                    <div
                      className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5'
                      onBlur={() => setUserMenuOpen(false)}
                    >
                      <Link
                        to='/profile'
                        className='block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      >
                        Your Profile
                      </Link>
                      <Link
                        to='/settings'
                        className='block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className='block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className='flex-1 overflow-auto bg-gray-100 dark:bg-gray-900'>
          <div className='py-6 px-4 sm:px-6 lg:px-8'>
            <Outlet />
          </div>
        </main>

        <footer className='bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700'>
          <div className='px-4 py-3 sm:px-6 lg:px-8'>
            <p className='text-center text-sm text-gray-500 dark:text-gray-400'>
              &copy; {new Date().getFullYear()} WareFlow. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );

  function getPageTitle() {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'Dashboard';
    if (path.includes('/users')) return 'Users';
    if (path.includes('/companies')) return 'Companies';
    if (path.includes('/warehouses')) return 'Warehouses';
    if (path.includes('/products')) return 'Products';
    if (path.includes('/clients')) return 'Clients';
    if (path.includes('/suppliers')) return 'Suppliers';
    if (path.includes('/profile')) return 'Profile';
    if (path.includes('/settings')) return 'Settings';
    return 'Dashboard';
  }

  function renderNavItems() {
    const navItems = [
      {
        path: '/app/dashboard',
        name: 'Dashboard',
        icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      },
      {
        path: '/app/users',
        name: 'Users',
        icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      },
      {
        path: '/app/companies',
        name: 'Companies',
        icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      },
      {
        path: '/app/warehouses',
        name: 'Warehouses',
        icon: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z',
      },
      {
        path: '/app/products',
        name: 'Products',
        icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
      },
      {
        path: '/app/clients',
        name: 'Clients',
        icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      },
      {
        path: '/app/suppliers',
        name: 'Suppliers',
        icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0',
      },
    ];

    return navItems.map(item => (
      <Link
        key={item.path}
        to={item.path}
        className={`flex items-center px-3 py-3 text-sm font-medium rounded-md transition-colors duration-150 ${
          isActive(item.path)
            ? 'bg-blue-700 text-white'
            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
        }`}
      >
        <svg
          className='w-5 h-5 mr-3'
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

export default AppLayout;
