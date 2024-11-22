import NProgress from 'nprogress';
import { useEffect } from 'react';

const LazyLoading = () => {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return null;
};

export default LazyLoading;
