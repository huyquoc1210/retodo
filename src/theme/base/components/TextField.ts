import type { ThemeOptions } from '@mui/material/styles';

const TextField: ThemeOptions['components'] = {
  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
      fullWidth: true,
      size: 'small',
    },
  },
};

export default TextField;
