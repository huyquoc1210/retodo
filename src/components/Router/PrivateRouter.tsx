import SplashScreen from 'components/shared/SplashScreen';
import Paths from 'constants/paths';
import useAuth from 'hooks/useAuth';
import { Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import type { FCC } from 'types/react';

const PrivateRouter: FCC = (props) => {
  const { children } = props;
  const { isInitialized, isAuthenticated } = useAuth();

  if (!isInitialized) {
    return <SplashScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to={Paths.auth.login.route} replace />;
  }

  return <Fragment>{children}</Fragment>;
};

export default PrivateRouter;
