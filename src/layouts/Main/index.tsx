import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Offset from 'components/shared/Offset';

const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex', flex: 'auto' }}>
      <Sidebar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 'auto',
          maxWidth: 1,
        }}
      >
        <Header />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 'auto',
          }}
        >
          <Offset />
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
