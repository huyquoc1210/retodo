import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import config from 'config';
import Language from './Language';
import Logout from './Logout';
import Palette from './Palette';

const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${240}px)`,
        ml: `${240}px`,
        bgcolor: 'background.paper',
      }}
    >
      <Toolbar variant="dense">
        <Typography component="h1" variant="h6" color="inherit" noWrap>
          {config.TITLE}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Language />
          <Palette />
          <Logout />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
