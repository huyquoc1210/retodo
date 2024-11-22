import type { ThemeOptions } from '@mui/material/styles';

const Global: ThemeOptions['components'] = {
  MuiCssBaseline: {
    styleOverrides: ({ palette, zIndex }) => ({
      html: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        width: '100%',
      },
      body: {
        display: 'flex',
        flex: 'auto',
        flexDirection: 'column',
        minHeight: '100%',
        width: '100%',
      },
      '#root': {
        display: 'flex',
        flex: 'auto',
        flexDirection: 'column',
      },
      '#nprogress': {
        pointerEvents: 'none',
      },
      '#nprogress .bar': {
        position: 'fixed',
        zIndex: zIndex.modal + 1,
        width: '100%',
        height: 3,
        top: 0,
        left: 0,
        backgroundColor: palette.primary.main,
      },
    }),
  },
};

export default Global;
