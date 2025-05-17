// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useAppSelector } from '@/app/hooks';

// /**
//  * PermissionMiddleware
//  * Protects routes based on user permissions
//  * Redirects to dashboard if user doesn't have required permissions
//  */
// interface PermissionMiddlewareProps {
//   requiredPermissions: string[];
// }

// export const PermissionMiddleware: React.FC<PermissionMiddlewareProps> = ({
//   requiredPermissions,
// }) => {
//   const { user } = useAppSelector(state => state.auth);

//   // This implementation assumes your user object has a permissions array
//   // Modify this to match your actual permissions structure
//   const userPermissions = user?.permissions || [];

//   // Check if user has all required permissions
//   const hasRequiredPermissions = requiredPermissions.every(permission =>
//     userPermissions.includes(permission)
//   );

//   if (!hasRequiredPermissions) {
//     return <Navigate to='/dashboard' replace />;
//   }

//   return <Outlet />;
// };
