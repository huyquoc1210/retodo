import type {} from '@mui/lab/themeAugmentation';
import type { ThemeOptions } from '@mui/material/styles';

const Button: ThemeOptions['components'] = {
  MuiButton: {
    defaultProps: {
      variant: 'contained',
      size: 'small',
    },
    styleOverrides: {
      root: {
        textTransform: 'none',
      },
    },
  },
  MuiLoadingButton: {
    defaultProps: {
      variant: 'contained',
      size: 'small',
    },
    styleOverrides: {
      root: {
        textTransform: 'none',
      },
    },
  },
};

export default Button;
