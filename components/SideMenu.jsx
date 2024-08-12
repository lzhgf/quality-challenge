import React from 'react';
import { useRouter } from 'next/router';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Toolbar, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '@mui/material/styles';
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import InfoIcon from '@mui/icons-material/Info';

const drawerWidth = 240;

const SideMenu = () => {
  const router = useRouter();
  const { usuario } = useAuth();
  const theme = useTheme(); 

  const handleNavigation = (path) => {
    if (path === '/users' && !usuario) {
      router.push('/signIn'); 
    } else {
      router.push(path);
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: drawerWidth, 
          boxSizing: 'border-box', 
          backgroundColor: theme.palette.background.default, 
          color: theme.palette.text.primary, 
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {[
            { text: 'Home', path: '/', icon: <HomeIcon /> },
            { 
              text: 'Users', 
              path: '/users', 
              icon: usuario ? <AccountCircleIcon /> : <LockIcon /> 
            },
            { text: 'Contact', path: '/contact', icon: <ContactMailIcon /> },
            { text: 'About', path: '/about', icon: <InfoIcon /> },
          ].map((item) => (
            <ListItem 
              button 
              key={item.text} 
              onClick={() => handleNavigation(item.path)}
              sx={{
                '&:hover': {
                  backgroundColor: theme.palette.primary.main, 
                  [`& .MuiListItemText-primary`]: {
                    color: theme.palette.primary.contrastText, 
                  },
                  [`& .MuiListItemIcon-root`]: {
                    color: theme.palette.primary.contrastText, 
                  },
                },
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                [`& .MuiListItemIcon-root`]: {
                  color: theme.palette.text.primary,
                },
              }}
            >
              {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideMenu;
