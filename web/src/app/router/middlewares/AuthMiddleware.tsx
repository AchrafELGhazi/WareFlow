import { useAppSelector } from '@/app/hooks';
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

/**
 * AuthMiddleware
 * Protects routes that require authentication
 * Redirects to login if user is not authenticated
 */
export const AuthMiddleware: React.FC = () => {
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to='/auth/login' state={{ from: location }} replace />;
  }

  return <Outlet />;
};
