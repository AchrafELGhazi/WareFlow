import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <svg
        className='w-8 h-8 mr-2'
        viewBox='0 0 40 40'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M20 5L35 30H5L20 5Z' fill='currentColor' />
      </svg>
      <span className='text-lg font-bold'>Wareflow</span>
    </div>
  );
};

export default Logo;
