import { RouteObject } from 'react-router-dom';

/**
 * Combined application routes
 * Aggregates all feature module routes for the authenticated part of the app
 * Note: These routes will be mounted under /app in the Router
 */
const routes: RouteObject[] = [
  {
    path: 'dashboard',
    element: <div className='p-8'>Dashboard Coming Soon</div>,
  },

  // User routes (will be available at /app/users/...)
  // ...userRoutes,

  // Warehouse routes (will be available at /app/warehouse/...)
  // ...warehouseRoutes,

  {
    path: 'me',
    element: <div className='p-8'>User Profile Coming Soon</div>,
  },
  {
    path: 'settings',
    element: <div className='p-8'>Settings Page Coming Soon</div>,
  },
];

export default routes;
