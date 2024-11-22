import PrivateRouter from 'components/Router/PrivateRouter';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Layout
import MainLayout from 'layouts/Main';

// Routes
import account from './Account';
import auth from './Auth';
import overview from './Overview';
import start from './Start';
import todo from './Todo';
import user from './User';

// Error boundary
import RouterErrorBoundary from 'pages/Error/RouterErrorBoundary';

const Router = () => {
  const router = createBrowserRouter([
    auth,
    {
      path: '/', // Root
      element: (
        <PrivateRouter>
          <MainLayout />
        </PrivateRouter>
      ),
      errorElement: <RouterErrorBoundary />,
      children: [start, overview, todo, account, user],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
