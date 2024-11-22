import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { Link, useLocation } from 'react-router-dom';
import sections from './Section';

const Sidebar = () => {
  const { pathname } = useLocation();

  console.log(pathname);

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
      PaperProps={{
        elevation: 3,
      }}
    >
      <Toolbar variant="dense" />
      <Divider />
      <List>
        {sections.map((section, index) => {
          return (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                to={section.href}
                selected={pathname === section.href}
              >
                <ListItemIcon>{section.icon}</ListItemIcon>
                <ListItemText primary={section.title} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
