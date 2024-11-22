import LazyRouter from 'components/Router/LazyRouter';
import PublicRouter from 'components/Router/PublicRouter';
import Paths from 'constants/paths';
import AuthLayout from 'layouts/Auth';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// Lazy components
const Login = LazyRouter(lazy(() => import('pages/Auth/Login')));

const auth: RouteObject = {
  path: Paths.auth.route,
  element: (
    <PublicRouter>
      <AuthLayout />
    </PublicRouter>
  ),
  children: [
    {
      path: Paths.auth.login.route,
      element: <Login />,
      children: [],
    },
    {
      path: Paths.auth.register.route,
      element: null,
      children: [],
    },
  ],
};

export default auth;
