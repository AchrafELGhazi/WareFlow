import { lazy } from 'react';

const Home = lazy(() => import('./modules/Home'));
// const About = lazy(() => import('./pages/About'));
// const Services = lazy(() => import('./pages/Services'));
// const Contact = lazy(() => import('./pages/Contact'));
// const Dashboard = lazy(() => import('./pages/Dashboard'));

export const routes = [
  { path: '/', element: <Home />, protected: false },
  // { path: '/about', element: <About /> },
  // { path: '/services', element: <Services /> },
  // { path: '/contact', element: <Contact /> },
  // { path: '/dashboard', element: <Dashboard />, protected: true }, 
];
