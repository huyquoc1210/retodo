import LazyRouter from 'components/Router/LazyRouter';
import Paths from 'constants/paths';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// Lazy components
const Todo = LazyRouter(lazy(() => import('pages/Todo')));

const todo: RouteObject = {
  path: Paths.todo.route,
  element: <Todo />,
  children: [],
};

export default todo;
