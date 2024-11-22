import type { ThemeOptions } from '@mui/material/styles';
import merge from 'lodash/merge';

// Components
import Alert from './Alert';
import Button from './Button';
import Global from './Global';
import Icon from './Icon';
import IconButton from './IconButton';
import Link from './Link';
import Stack from './Stack';
import TextField from './TextField';

const components: ThemeOptions['components'] = merge(
  {},
  Global,
  Button,
  Stack,
  Icon,
  Link,
  IconButton,
  TextField,
  Alert
);

export default components;
