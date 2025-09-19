import { createBrowserRouter, RouterProvider } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/tenant/*',
    element: <div>Tenant routes</div>,
  },
  {
    path: '/admin/*',
    element: <div>Admin routes</div>,
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
