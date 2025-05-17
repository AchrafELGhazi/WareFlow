import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthMiddleware } from './middlewares/AuthMiddleware';
import { GuestMiddleware } from './middlewares/GuestMiddleware';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
// import AuthLayout from '@/shared/Layout/AuthLayout';
import NotFound from '@/pages/NotFound';
import MainLayout from '@/shared/Layout/MainLayout';
import authRoutes from '@/modules/auth/routes/authRoutes';
import routes from './routes';

const LoadingFallback = () => (
  <div className='flex items-center justify-center min-h-screen bg-gray-900'>
    <LoadingSpinner />
  </div>
);

const Router = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Guest-protected routes */}
        <Route element={<GuestMiddleware />}>
          <Route path='/auth'>
            {authRoutes.map(route => (
              <Route
                key={route.path}
                path={route.path?.replace(/^\//, '')}
                element={route.element}
              />
            ))}
            <Route path='*' element={<Navigate to='/auth/signin' replace />} />
          </Route>
        </Route>

        {/* Main authenticated app */}
        <Route element={<AuthMiddleware />}>
          <Route path='/' element={<MainLayout />}>
            {routes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
            <Route index element={<Navigate to='/dashboard' replace />} />
          </Route>
        </Route>

        {/* 404 page */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
