import React from 'react';
import { Navigate } from 'react-router-dom';

import { UserSettingsPage } from './pages/UserSettingsPage/UserSettingsPage';

import { LoginPage } from './pages/Auth/LoginPage/LoginPage';
import { ForgotPasswordPage } from './pages/Auth/ForgotPasswordPage/ForgotPasswordPage';
import { RegistrationPage } from './pages/Auth/RegistrationPage/RegistrationPage';
import { ResetPassworPage } from './pages/Auth/ResetPassworPage/ResetPassworPage';
import { VerifyEmailPage } from './pages/Auth/VerifyEmailPage/VerifyEmailPage';

export interface RouteType {
  path: string;
  element: React.ReactElement;
}

const privateRoutes: RouteType[] = [
  { path: '/user-settings', element: <UserSettingsPage /> },
  {
    path: '*',
    element: <Navigate to="/user-settings" />,
  },
];

const publicRoutes: RouteType[] = [
  {
    path: '/registration',
    element: <RegistrationPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/reset-password/:token',
    element: <ResetPassworPage />,
  },
  {
    path: '/confirm-email/:token',
    element: <VerifyEmailPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <Navigate to="/login" />,
  },
];

export const getRoutes = (userData: boolean): RouteType[] => {
  return userData ? privateRoutes : publicRoutes;
};
