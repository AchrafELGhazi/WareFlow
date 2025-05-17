import { RouteObject } from 'react-router-dom';

// Uncomment as you implement each feature module
// import userRoutes from '@/modules/user/routes/userRoutes';
// import warehouseRoutes from '@/modules/warehouse/routes/warehouseRoutes';
// import dashboardRoutes from '@/modules/dashboard/routes/dashboardRoutes';

/**
 * Combined application routes
 * Aggregates all feature module routes for the authenticated part of the app
 * Note: Auth routes are handled separately in the Router component
 */
const routes: RouteObject[] = [
  // Dashboard routes (should be available at /dashboard)
  // ...dashboardRoutes,

  // User routes (should be available at /users/...)
  // ...userRoutes,

  // Warehouse routes (should be available at /warehouse/...)
  // ...warehouseRoutes,


  // Add more feature module routes here as you develop them

];

export default routes;
