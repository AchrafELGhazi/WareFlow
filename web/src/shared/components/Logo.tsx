import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showAnimation?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showAnimation = false,
}) => {
  // Size mappings for different size options
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
  };

  const iconSizes = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`${sizeClasses[size]} bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center`}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`${iconSizes[size]} text-white`}
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

      {/* Animated pulse ring - only show if animation is enabled */}
      {showAnimation && (
        <div className='absolute inset-0 rounded-2xl border border-indigo-500 animate-ping opacity-30'></div>
      )}
    </div>
  );
};

export default Logo;
