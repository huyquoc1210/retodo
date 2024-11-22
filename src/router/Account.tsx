import LazyRouter from 'components/Router/LazyRouter';
import Paths from 'constants/paths';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// Lazy components
const Account = LazyRouter(lazy(() => import('pages/Account')));

const account: RouteObject = {
  path: Paths.account.route,
  element: <Account />,
  children: [],
};

export default account;
