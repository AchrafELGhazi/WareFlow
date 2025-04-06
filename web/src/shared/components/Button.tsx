import React from 'react';
import { Loader2 } from 'lucide-react';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'outline-light'
  | 'danger'
  | 'success'
  | 'light'
  | 'dark'
  | 'text';

type ButtonSize = 'sm' | 'base' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'base',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  disabled,
  ...rest
}) => {
  // Base button classes
  let buttonClasses = `
    inline-flex items-center justify-center font-medium transition-colors
    rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2
    ${fullWidth ? 'w-full' : ''}
    ${
      disabled || isLoading
        ? 'opacity-70 cursor-not-allowed'
        : 'hover:shadow-md active:translate-y-px'
    }
  `;

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    base: 'px-4 py-2 text-base',
    lg: 'px-5 py-2.5 text-lg',
    xl: 'px-6 py-3 text-xl',
  };

  // Variant classes
  const variantClasses = {
    primary: `
      bg-blue-600 text-white
      focus:ring-blue-500
      ${!disabled && !isLoading ? 'hover:bg-blue-700' : ''}
    `,
    secondary: `
      bg-purple-600 text-white
      focus:ring-purple-500
      ${!disabled && !isLoading ? 'hover:bg-purple-700' : ''}
    `,
    outline: `
      bg-transparent border border-current text-blue-600
      focus:ring-blue-500 
      ${
        !disabled && !isLoading ? 'hover:bg-blue-50 dark:hover:bg-gray-800' : ''
      }
    `,
    'outline-light': `
      bg-transparent border border-white text-white
      focus:ring-white
      ${!disabled && !isLoading ? 'hover:bg-white/10' : ''}
    `,
    danger: `
      bg-red-600 text-white
      focus:ring-red-500
      ${!disabled && !isLoading ? 'hover:bg-red-700' : ''}
    `,
    success: `
      bg-green-600 text-white
      focus:ring-green-500
      ${!disabled && !isLoading ? 'hover:bg-green-700' : ''}
    `,
    light: `
      bg-white text-gray-800
      focus:ring-gray-300
      ${!disabled && !isLoading ? 'hover:bg-gray-100' : ''}
    `,
    dark: `
      bg-gray-800 text-white
      focus:ring-gray-700
      ${!disabled && !isLoading ? 'hover:bg-gray-900' : ''}
    `,
    text: `
      bg-transparent text-current hover:bg-gray-100 dark:hover:bg-gray-800
      focus:ring-gray-200 dark:focus:ring-gray-700
    `,
  };

  buttonClasses += ` ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
      {!isLoading && leftIcon && <span className='mr-2'>{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className='ml-2'>{rightIcon}</span>}
    </button>
  );
};

export default Button;
