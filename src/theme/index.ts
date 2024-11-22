import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import merge from 'lodash/merge';
import type { PaletteMode } from 'types/theme';

// Palettes
import base from './base';
import darkTheme from './palette/dark';
import lightTheme from './palette/light';

interface ThemeOptions {
  paletteMode: PaletteMode;
}

const createAppTheme = (option: ThemeOptions) => {
  const { paletteMode } = option;

  const palette = paletteMode === 'light' ? lightTheme : darkTheme;

  const theme = createTheme(merge({}, base, palette));

  return responsiveFontSizes(theme);
};

export default createAppTheme;
