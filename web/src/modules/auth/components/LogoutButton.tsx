import React from 'react';
import { useAppDispatch } from '@/app/hooks';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../api/authApi';
import { clearCredentials } from '../store/authSlice';

const LogoutButton: React.FC = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      navigate('/auth/signin');
    } catch (error) {
      console.error('Logout failed', error);
      dispatch(clearCredentials());
      navigate('/auth/signin');
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className='px-4 py-2 text-sm text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
    >
      {isLoading ? 'Logging out...' : 'Logout'}
    </button>
  );
};

export default LogoutButton;
