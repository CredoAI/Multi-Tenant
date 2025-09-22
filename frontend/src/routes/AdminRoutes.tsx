import { Navigate, Route, Routes } from 'react-router';
import AdminLayout from '../layouts/AdminLayout';
import RequestRoutePage from '../pages/admin/RequestRoutePage';

export default function AdminRoutes() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<div>admin dashboard page</div>} />
        <Route path="request" element={<RequestRoutePage />} />
        <Route path="billing" element={<div>billing page</div>} />
      </Routes>
    </AdminLayout>
  );
}
