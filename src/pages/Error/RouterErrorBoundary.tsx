import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

// Error pages
import Forbidden from './Forbidden';
import NotFound from './NotFound';
import Reload from './Reload';
import Unauthorized from './Unauthorized';

const RouterErrorBoundary = () => {
  const error = useRouteError();

  if (!isRouteErrorResponse(error)) {
    throw error;
  }

  switch (error.status) {
    case 404:
      return <NotFound />;
    case 401:
      return <Unauthorized />;
    case 403:
      return <Forbidden />;
    default:
      return <Reload />;
  }
};

export default RouterErrorBoundary;
