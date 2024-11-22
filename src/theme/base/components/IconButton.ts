import type { ThemeOptions } from '@mui/material/styles';

const IconButton: ThemeOptions['components'] = {
  MuiIconButton: {
    defaultProps: {
      size: 'small',
    },
  },
};

export default IconButton;
