import { Navigate, Route, Routes } from 'react-router';
import { TenantLayout } from '../layouts/TenantLayout';
import { PageRoutes } from '.';
import CreateOrganizationPage from '../pages/tenant/CreateOrganization';

export default function TenantRoutes() {
  return (
    <TenantLayout>
      <Routes>
        <Route path="/" element={<Navigate to={PageRoutes.APP_DASHBOARD} />} />
        <Route path={PageRoutes.APP_DASHBOARD} element={<div>dashboard page here</div>} />
        <Route path={PageRoutes.CREATE_ORGANIZATION} element={<CreateOrganizationPage />} />
        <Route path="orders" element={<div>dashboard page here</div>} />
        <Route path="settings" element={<div>settings page here</div>} />
      </Routes>
    </TenantLayout>
  );
}
// /app/create-organization
