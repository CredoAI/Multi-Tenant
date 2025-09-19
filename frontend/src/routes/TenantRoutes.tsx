import { Navigate, Route, Routes } from 'react-router';
import { TenantLayout } from '../layouts/TenantLayout';

export default function TenantRoutes() {
  return (
    <TenantLayout>
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<div>dashboard page here</div>} />
        <Route path="orders" element={<div>dashboard page here</div>} />
        <Route path="settings" element={<div>settings page here</div>} />
      </Routes>
    </TenantLayout>
  );
}
