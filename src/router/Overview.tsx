import LazyRouter from 'components/Router/LazyRouter';
import Paths from 'constants/paths';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// Lazy components
const Overview = LazyRouter(lazy(() => import('pages/Overview')));

const overview: RouteObject = {
  path: Paths.overview.route,
  element: <Overview />,
  children: [],
};

export default overview;
