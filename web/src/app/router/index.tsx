import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthMiddleware } from './middlewares/AuthMiddleware';
import { GuestMiddleware } from './middlewares/GuestMiddleware';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import NotFound from '@/pages/NotFound';
import authRoutes from '@/modules/auth/routes/authRoutes';
import Home from '@/modules/Home';
import routes from './routes';
import AppLayout from '@/shared/Layout/AppLayout';

const LoadingFallback = () => (
  <div className='flex items-center justify-center min-h-screen bg-gray-900'>
    <LoadingSpinner />
  </div>
);

const Router = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path='/' element={<Home />} />

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

        <Route element={<AuthMiddleware />}>
          <Route path='/app' element={<AppLayout />}>
            {routes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
            <Route index element={<Navigate to='/app/dashboard' replace />} />
          </Route>
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
