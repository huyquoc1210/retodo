const config = {
  BASE_URL: process.env.REACT_APP_BASE_URL,
  VERSION: process.env.REACT_APP_VERSION,
  TITLE: process.env.REACT_APP_TITLE,
  __PROD__: process.env.NODE_ENV === 'production',
  __DEV__: process.env.NODE_ENV === 'development',
};

export default config;
