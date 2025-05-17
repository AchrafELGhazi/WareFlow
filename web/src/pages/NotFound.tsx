import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Modern, Facebook-styled 404 Not Found page
 * Simpler design with clean aesthetics and minimal animations
 */
const NotFound: React.FC = () => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-lg p-6 bg-white rounded-lg shadow-sm'>
        {/* Header with simple animation */}
        <div className='text-center mb-8'>
          <h1 className='text-8xl font-bold text-blue-600 mb-2'>404</h1>
          <h2 className='text-2xl font-semibold text-gray-800'>
            Page Not Found
          </h2>
        </div>

        {/* Clean, minimal message */}
        <div className='mb-8'>
          <p className='text-center text-gray-600 mb-4'>
            The page you're looking for isn't available. The link might be
            broken or the page may have been removed.
          </p>
        </div>

        {/* Simple search bar */}
        <div className='mb-8'>
          <div className='flex overflow-hidden rounded-full border border-gray-300 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500'>
            <input
              type='text'
              placeholder='Search for pages...'
              className='w-full py-3 px-4 bg-transparent text-gray-700 focus:outline-none'
            />
            <button className='px-5 bg-blue-600 text-white hover:bg-blue-700 transition-colors'>
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Quick links with Facebook-style buttons */}
        <div className='mb-8'>
          <h3 className='text-base font-medium text-gray-700 mb-3'>Go to:</h3>
          <div className='grid grid-cols-2 gap-3'>
            <Link
              to='/'
              className='text-center py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md text-sm text-gray-700 font-medium transition-colors'
            >
              Home
            </Link>
            <Link
              to='/dashboard'
              className='text-center py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md text-sm text-gray-700 font-medium transition-colors'
            >
              Dashboard
            </Link>
            <Link
              to='/users'
              className='text-center py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md text-sm text-gray-700 font-medium transition-colors'
            >
              Users
            </Link>
            <Link
              to='/warehouses'
              className='text-center py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md text-sm text-gray-700 font-medium transition-colors'
            >
              Warehouses
            </Link>
          </div>
        </div>

        {/* Main actions with Facebook-style button */}
        <div className='flex justify-center'>
          <Link
            to='/'
            className='w-full py-3 text-center bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors'
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
