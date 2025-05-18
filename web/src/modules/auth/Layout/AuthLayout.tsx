import React from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  linkText?: string;
  linkUrl?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  linkText,
  linkUrl,
}) => {
  return (
    <div className='flex min-h-screen bg-[#f5f7ff] dark:bg-[#0c1021]'>
      <div className='flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm lg:w-96'>
          {/* Main card with futuristic design */}
          <div className='bg-white dark:bg-[#141a32] rounded-3xl p-8 border border-[#e0e7ff] dark:border-indigo-900/30 relative overflow-hidden'>
            {/* Decorative tags/markers */}
            <div className='absolute top-0 left-6 w-2 h-10 bg-indigo-500 rounded-b-lg'></div>
            <div className='absolute top-0 left-10 w-2 h-6 bg-blue-400 rounded-b-lg'></div>
            <div className='absolute top-6 right-0 w-10 h-2 bg-indigo-500 rounded-l-lg'></div>
            <div className='absolute top-10 right-0 w-6 h-2 bg-blue-400 rounded-l-lg'></div>

            {/* Circular elements */}
            <div className='absolute top-20 left-0 w-24 h-24 rounded-full border border-dashed border-indigo-200 dark:border-indigo-900/40 -translate-x-1/2'></div>
            <div className='absolute bottom-10 right-0 w-32 h-32 rounded-full border border-dashed border-blue-200 dark:border-blue-900/40 translate-x-1/2'></div>

            {/* Logo area with tech-inspired elements */}
            <div className='flex justify-center mb-8 relative'>
              <div className='relative'>
                <div className='w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-10 w-10 text-white'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10'
                    />
                  </svg>
                </div>

                {/* Decorative tech elements */}
               
                {/* Animated pulse ring */}
                <div className='absolute inset-0 rounded-2xl border border-indigo-500 animate-ping opacity-30'></div>
              </div>
            </div>

            {/* Title with tech-inspired marker */}
            <div className='relative'>
              <h2 className='text-3xl font-bold text-gray-900 dark:text-white text-center mb-6'>
                <span className='relative inline-block'>
                  {title}
                  <span className='absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-400 rounded-full'></span>
                </span>
              </h2>

            </div>

            {/* Form content */}
            <div className='relative z-10 mt-6'>{children}</div>

            {/* Link section with tech border */}
            {linkText && linkUrl && (
              <div className='mt-8 text-center relative'>
                <div className='absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent'></div>
                <span className='relative inline-block px-4 bg-white dark:bg-[#141a32]'>
                  <Link
                    to={linkUrl}
                    className='text-sm font-medium text-indigo-600 hover:text-indigo-500 
                              dark:text-indigo-400 dark:hover:text-indigo-300 
                              transition-colors duration-200 flex items-center'
                  >
                    <span>{linkText}</span>
                    <svg
                      className='w-3.5 h-3.5 ml-1'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M14 5l7 7m0 0l-7 7m7-7H3'
                      />
                    </svg>
                  </Link>
                </span>
              </div>
            )}
          </div>

          {/* Security badge with data-inspired design */}
          <div className='mt-6 flex justify-center'>
            <div className='py-2 px-4 text-xs bg-white dark:bg-[#141a32] text-gray-600 dark:text-gray-400 rounded-full border border-[#e0e7ff] dark:border-indigo-900/30 flex items-center'>
              <div className='flex space-x-2 mr-2'>
                {[1, 2, 3].map(num => (
                  <div
                    key={num}
                    className='w-1.5 h-6 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-full opacity-70'
                    style={{ height: `${num * 6}px` }}
                  />
                ))}
              </div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4 mr-1 text-indigo-500'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                />
              </svg>
              <span>End-to-end encrypted authentication</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel with feature highlights */}
      <div className='hidden lg:block relative w-0 flex-1'>
        <div className='absolute inset-0 bg-gradient-to-b from-indigo-600 via-indigo-700 to-blue-700 rounded-l-3xl overflow-hidden'>
          {/* Circuit-like pattern background */}
          <div className='absolute inset-0 opacity-15'>
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className='absolute top-0 left-0 w-full h-px bg-white'
                style={{ top: `${i * 10}%` }}
              />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className='absolute top-0 left-0 w-px h-full bg-white'
                style={{ left: `${i * 10}%` }}
              />
            ))}
          </div>

          {/* Binary code effect */}
          <div className='absolute inset-0 text-[8px] text-white/10 font-mono overflow-hidden'>
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              >
                {Math.random() > 0.5 ? '1' : '0'}
              </div>
            ))}
          </div>

          {/* Glowing orbs */}
          <div className='absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full opacity-30 blur-3xl transform translate-x-1/2 -translate-y-1/2'></div>
          <div className='absolute bottom-0 left-0 w-96 h-96 bg-indigo-400 rounded-full opacity-30 blur-3xl transform -translate-x-1/2 translate-y-1/2'></div>

          {/* Content area */}
          <div className='relative h-full flex flex-col justify-center px-12 py-20 text-white'>
            {/* Tech tags */}
            <div className='flex flex-wrap gap-3 mb-12 ml-6'>
              <div className='px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs border border-white/20 flex items-center'>
                <span className='w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse'></span>
                ENTERPRISE READY
              </div>
              <div className='px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs border border-white/20'>
                <span className='font-bold'>2025</span> TECH STACK
              </div>
            </div>

            {/* Main headline */}
            <div className='relative mb-2 ml-6'>
              <div className='absolute left-0 top-0 w-2 h-12 bg-white/30 rounded-full -translate-x-6'></div>
              <h3 className='text-4xl font-bold'>
                Welcome to{' '}
                <span className='bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100'>
                  WareFlow
                </span>
              </h3>
            </div>

            <p className='text-lg ml-6 max-w-md mb-12 text-indigo-100'>
              Your complete warehouse management solution with intelligent
              inventory tracking and streamlined operations.
            </p>

            {/* Feature grid with tech-inspired styling */}
            <div className='grid grid-cols-2 gap-6 max-w-lg relative'>
              <div className='absolute left-0 top-0 w-1 h-full bg-white/20 rounded-full -translate-x-6'></div>

              {[
                {
                  icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
                  text: 'Real-time Tracking',
                },
                {
                  icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
                  text: 'Advanced Analytics',
                },
                {
                  icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
                  text: 'Team Management',
                },
                {
                  icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
                  text: 'Enterprise Security',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className='relative backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20'
                >
                  <div className='absolute inset-0 bg-gradient-to-br from-white/10 to-white/5'></div>
                  <div className='relative flex items-center p-4 gap-4 z-10'>
                    <div className='flex-shrink-0'>
                      <div className='w-10 h-10 rounded-xl border border-indigo-300/30 flex items-center justify-center bg-gradient-to-br from-white/20 to-white/5'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-5 w-5'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={1.5}
                            d={feature.icon}
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <span className='text-sm font-medium'>
                        {feature.text}
                      </span>
                      <div className='h-1 w-12 bg-blue-400/30 mt-1 rounded-full'></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom tech elements */}
            <div className='absolute bottom-8 right-8 flex gap-2'>
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className='w-2 h-2 rounded-full bg-white animate-pulse'
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
