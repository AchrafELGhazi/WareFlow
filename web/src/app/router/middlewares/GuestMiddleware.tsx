import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';

/**
 * GuestMiddleware
 * For routes that should only be accessible to non-authenticated users
 * Redirects to dashboard if user is already authenticated
 */
export const GuestMiddleware: React.FC = () => {
  const { isAuthenticated } = useAppSelector(state => state.auth);

  if (isAuthenticated) {
    return <Navigate to='/dashboard' replace />;
  }

  return <Outlet />;
};
