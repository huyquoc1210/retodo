import type { ThemeOptions } from '@mui/material/styles';

const Alert: ThemeOptions['components'] = {
  MuiAlert: {
    defaultProps: {
      variant: 'filled',
    },
  },
};

export default Alert;
