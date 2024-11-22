import type { PaletteOptions } from '@mui/material/styles';
import { neutral } from '../colors';

const palette: PaletteOptions = {
  mode: 'light',
  background: {
    default: neutral[50],
  },
  primary: {
    main: '#3366FF', // 500
    light: '#84A9FF', // 300
    dark: '#1939B7', // 700
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#009688', // 500
    light: '#59DFBA', // 300
    dark: '#00626C', // 700
    contrastText: '#FFFFFF',
  },
};

export default palette;
