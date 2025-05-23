import MePage from '@/modules/me/pages/MePage';
import Users from '@/modules/users/pages/UsersPage';
import { RouteObject } from 'react-router-dom';

/**
 * Combined application routes
 * Aggregates all feature module routes for the authenticated part of the app
 * Note: These routes will be mounted under /app in the Router
 */
const routes: RouteObject[] = [
  {
    path: 'users',
    element: <Users />,
  },
  {
    path: 'me',
    element: <MePage />,
  },
  {
    path: 'dashboard',
    element: <p >this is dashboard</p>
  },
  {
    path: 'settings',
    element: <div className='p-8'>Settings Page Coming Soon</div>,
  },
];

export default routes;
