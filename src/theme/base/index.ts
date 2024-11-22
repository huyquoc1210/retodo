import type { ThemeOptions } from '@mui/material/styles';

// Typography
import typography from './typography';

// Components
import components from './components';

const options: ThemeOptions = {
  direction: 'ltr',
  typography,
  components,
  shape: {
    borderRadius: 4,
  },
};

export default options;
