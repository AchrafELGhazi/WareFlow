import React from 'react';
import { Link } from 'react-router-dom';

// Props for AuthLayout
interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  linkText?: string;
  linkUrl?: string;
}

// A simple layout for auth pages
const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  linkText,
  linkUrl,
}) => {
  return (
    <div className='flex min-h-screen bg-gray-50'>
      <div className='flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm lg:w-96'>
          <div>
            <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
              {title}
            </h2>
            {subtitle && (
              <p className='mt-2 text-sm text-gray-600'>{subtitle}</p>
            )}
            {linkText && linkUrl && (
              <p className='mt-2 text-sm text-gray-600'>
                <Link
                  to={linkUrl}
                  className='font-medium text-indigo-600 hover:text-indigo-500'
                >
                  {linkText}
                </Link>
              </p>
            )}
          </div>

          <div className='mt-8'>{children}</div>
        </div>
      </div>
      <div className='hidden lg:block relative w-0 flex-1'>
        <div className='absolute inset-0 h-full w-full bg-indigo-600 object-cover' />
      </div>
    </div>
  );
};

export default AuthLayout;
