import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { HealthPage } from '../features/health';
import { MainLayout } from '../components/layout/MainLayout';
import { EmployeePage } from '../features/employees';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [{ index: true, element: <HealthPage /> }],
  },
  {
    path: '/employees',
    element: <MainLayout />,
    children: [{ index: true, element: <EmployeePage /> }],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
