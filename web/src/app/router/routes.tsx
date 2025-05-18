import CompaniesPage from '@/modules/companies/pages/CompaniesPage';
import Dashboard from '@/modules/dashboard/pages/Dashboard';
import MePage from '@/modules/me/pages/MePage';
import Users from '@/modules/users/pages/UsersPage';
import ProductsPage from '@/modules/users/products/ProductsPage';
import WarehousesPage from '@/modules/warehouses/pages/WarehousesPage';
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
    path: 'companies',
    element: <CompaniesPage />,
  },
  {
    path: 'me',
    element: <MePage />,
  },
  {
    path: 'warehouses',
    element: <WarehousesPage />,
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
  },
  {
    path: 'products',
    element: <ProductsPage />,
  },
  {
    path: 'settings',
    element: <div className='p-8'>Settings Page Coming Soon</div>,
  },
];

export default routes;
