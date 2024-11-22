import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import config from 'config';

const SplashScreen = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        placeContent: 'center',
        bgcolor: 'background.paper',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'fixed',
        zIndex: 'modal',
      }}
    >
      <Box>
        <Typography variant="subtitle2" align="center" gutterBottom>
          {config.TITLE}
        </Typography>
        <Box sx={{ width: 300 }}>
          <LinearProgress />
        </Box>
      </Box>
    </Box>
  );
};

export default SplashScreen;
