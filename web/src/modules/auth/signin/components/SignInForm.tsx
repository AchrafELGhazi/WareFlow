import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLoginMutation } from '../../api/authApi';
import { useAppDispatch } from '@/app/hooks';
import { setCredentials } from '../../store/authSlice';

interface SignInFormProps {
  onSuccess?: () => void;
}

interface SignInFormValues {
  username: string;
  password: string;
  rememberMe: boolean;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>();

  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const onSubmit = async (data: SignInFormValues) => {
    try {
      const result = await login({
        username: data.username,
        password: data.password,
      }).unwrap();

      // Set user credentials in Redux store
      dispatch(
        setCredentials({
          user: result.user,
          token: result.token,
        })
      );

      // Call the onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }

      // Redirect to the page the user was trying to access
      navigate(from, { replace: true });
    } catch (err) {
      // Error is handled by RTK Query
      console.error('Failed to sign in', err);
    }
  };

  return (
    <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor='username'
          className='block text-sm font-medium text-gray-700'
        >
          Username
        </label>
        <div className='mt-1'>
          <input
            id='username'
            type='text'
            autoComplete='username'
            className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            {...register('username', {
              required: 'Username is required',
            })}
          />
          {errors.username && (
            <p className='mt-2 text-sm text-red-600'>
              {errors.username.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor='password'
          className='block text-sm font-medium text-gray-700'
        >
          Password
        </label>
        <div className='mt-1'>
          <input
            id='password'
            type='password'
            autoComplete='current-password'
            className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          {errors.password && (
            <p className='mt-2 text-sm text-red-600'>
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <input
            id='remember-me'
            type='checkbox'
            className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
            {...register('rememberMe')}
          />
          <label
            htmlFor='remember-me'
            className='ml-2 block text-sm text-gray-900'
          >
            Remember me
          </label>
        </div>
      </div>

      {error && (
        <div className='rounded-md bg-red-50 p-4'>
          <p className='text-sm font-medium text-red-800'>
            {(error as any)?.data?.message || 'Login failed. Please try again.'}
          </p>
        </div>
      )}

      <div>
        <button
          type='submit'
          disabled={isLoading}
          className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </div>
    </form>
  );
};

export default SignInForm;
