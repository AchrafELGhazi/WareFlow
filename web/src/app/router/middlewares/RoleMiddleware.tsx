import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { UserRole } from '@/shared/types';

interface RoleMiddlewareProps {
  allowedRoles: UserRole[];
}

/**
 * RoleMiddleware
 * Protects routes based on user roles
 * Redirects to dashboard if user doesn't have required role
 */
export const RoleMiddleware: React.FC<RoleMiddlewareProps> = ({
  allowedRoles,
}) => {
  const { user } = useAppSelector(state => state.auth);

  const hasRequiredRole = user && allowedRoles.includes(user.role);

  if (!hasRequiredRole) {
    return <Navigate to='/app/dashboard' replace />;
  }

  return <Outlet />;
};
