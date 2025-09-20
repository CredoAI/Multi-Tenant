import { Navigate, Route, Routes } from 'react-router';
import { AuthLayout } from '../layouts/AuthLayout';
import LoginPage from '../pages/auth/Login';
import SignUpPage from '../pages/auth/Signup';
import ForgotPasswordPage from '../pages/auth/ForgotPassword';
import { PageRoutes } from '.';

export default function AuthRoutes() {
  return (
    <AuthLayout>
      <Routes>
        <Route path="/" element={<Navigate to={PageRoutes.LOGIN} />} />
        <Route path={PageRoutes.LOGIN} element={<LoginPage />} />
        <Route path={PageRoutes.SIGNUP} element={<SignUpPage />} />
        <Route path={PageRoutes.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
      </Routes>
    </AuthLayout>
  );
}
