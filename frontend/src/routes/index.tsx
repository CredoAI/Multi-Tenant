import { createBrowserRouter, RouterProvider } from 'react-router';
import App from '../App';
import TenantRoutes from './TenantRoutes';
import AdminRoutes from './AdminRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/tenant/*',
    element: <TenantRoutes />,
  },
  {
    path: '/admin/*',
    element: <AdminRoutes />,
  },
  {
    path: '/auth/*',
    element: <div>Auth routes</div>,
  },
  {
    path: '*',
    element: <div>NoFound routes</div>,
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
