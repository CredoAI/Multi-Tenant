import { createBrowserRouter, RouterProvider } from 'react-router';
import { RecoilRoot } from 'recoil';
import App from '../App';
import TenantRoutes from './TenantRoutes';
import AdminRoutes from './AdminRoutes';
import AuthRoutes from './AuthRoute';

export const PageRoutes = {
  LOGIN: 'sign-in',
  SIGNUP: 'sign-up',
  FORGOT_PASSWORD: 'forgot-password',
  APP_DASHBOARD: 'dashboard',
  CREATE_ORGANIZATION: 'create-organization',
} as const;

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/app/*',
    element: <TenantRoutes />,
  },
  {
    path: '/app/auth/*',
    element: <AuthRoutes />,
  },
  {
    path: '*',
    element: <div>NoFound routes</div>,
  },
  {
    path: '/admin/*',
    element: <AdminRoutes />,
  },
]);

export function AppRoutes() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />;
    </RecoilRoot>
  );
}
