import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import useSettings from 'hooks/useSettings';
import { useMemo } from 'react';
import createAppTheme from 'theme';
import type { FCC } from 'types/react';

const ThemeProvider: FCC = (props) => {
  const { children } = props;
  const { paletteMode } = useSettings();

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const defaultMode = prefersDarkMode ? 'dark' : 'light';

  const theme = useMemo(() => {
    return createAppTheme({
      paletteMode: paletteMode === 'default' ? defaultMode : paletteMode,
    });
  }, [paletteMode, defaultMode]);

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export { ThemeProvider };
