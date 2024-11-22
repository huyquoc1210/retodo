const Endpoints = {
  auth: {
    login: '/auth/login',
    profile: '/auth/profile',
  },
  todo: {
    index: 'todos',
  },
} as const;

export default Endpoints;
