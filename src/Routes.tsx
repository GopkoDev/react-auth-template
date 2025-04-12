import React from 'react';
import { Navigate } from 'react-router-dom';

import { LoginPage } from './pages/Auth/LoginPage/LoginPage';
import { ForgotPasswordPage } from './pages/Auth/ForgotPasswordPage/ForgotPasswordPage';
import { RegistrationPage } from './pages/Auth/RegistrationPage/RegistrationPage';
import { ResetPassworPage } from './pages/Auth/ResetPassworPage/ResetPassworPage';
import { VerifyEmailPage } from './pages/Auth/VerifyEmailPage/VerifyEmailPage';
import { MainPage } from './pages/MainPage/MainPage';
import { SettingsPage } from './pages/SettingsPage/SettingsPage';

export interface RouteType {
  path: string;
  element: React.ReactElement;
}

const privateRoutes: RouteType[] = [
  { path: '/', element: <MainPage /> },
  { path: '/settings/:tab', element: <SettingsPage /> },
  {
    path: '*',
    element: <Navigate to="/" />,
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
