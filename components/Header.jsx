import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Modal, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import AuthForm from './AuthForm';

const Header = () => {
  const { usuario, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              color: '#f9f9f9'
            }}
          >
            Lorem Ipsum
          </Typography>
          {usuario ? (
            <>
              <Typography variant="body1" color="inherit" sx={{ marginRight: 2 }}>
                Bem vindo, {usuario.username}
              </Typography>
              <Button color="inherit" onClick={logout}>Logout</Button>
            </>
          ) : (
            <Button color="inherit" onClick={handleOpen}>Logar</Button>
          )}
        </Toolbar>
      </AppBar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <AuthForm onSuccess={handleClose} />
        </Box>
      </Modal>
    </>
  );
};

export default Header;
