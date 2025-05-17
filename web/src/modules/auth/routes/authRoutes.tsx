import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';


const SignInPage = lazy(() => import('@/modules/auth/signin/pages/SignInPage'));
const SignUpPage = lazy(() => import('@/modules/auth/signup/pages/SignUpPage'));

const authRoutes: RouteObject[] = [
  {
    path: '/signin',
    element: <SignInPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
];

export default authRoutes;
