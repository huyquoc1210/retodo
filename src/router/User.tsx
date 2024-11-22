import LazyRouter from 'components/Router/LazyRouter';
import Paths from 'constants/paths';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// Lazy components
const User = LazyRouter(lazy(() => import('pages/User')));

const user: RouteObject = {
  path: Paths.user.route,
  element: <User />,
  children: [],
};

export default user;
