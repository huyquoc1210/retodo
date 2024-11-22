import type { ThemeOptions } from '@mui/material/styles';

const Link: ThemeOptions['components'] = {
  MuiLink: {
    defaultProps: {
      underline: 'none',
    },
  },
};

export default Link;
