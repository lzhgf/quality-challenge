import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, IconButton, InputAdornment, FormControl } from '@mui/material';
import { Visibility, VisibilityOff, CheckCircle, Cancel } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { validatePassword } from '../utils/passwordUtils';

const AuthForm = ({ isLogin: initialIsLogin = true, onSuccess }) => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(initialIsLogin);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordCriteria, setPasswordCriteria] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!isLogin && password) {
      setPasswordCriteria(validatePassword(password));
    } else {
      setPasswordCriteria({
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
      });
    }
  }, [password, isLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar } = passwordCriteria;

    if (!(hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar)) {
      setError('Senha não atende aos requisitos de segurança.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não correspondem.');
      return;
    }

    const success = isLogin ? login(username, password) : register(username, password);
    if (success) {
      onSuccess();
    } else {
      setError(isLogin ? 'Invalid username or password' : 'User already exists');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ width: '100%', maxWidth: 400, margin: 'auto', p: 4 }}
    >
      <Typography variant="h6" component="h2" gutterBottom>
        {isLogin ? 'Login' : 'Register'}
      </Typography>
      <TextField
        label="Username"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type={showPassword ? 'text' : 'password'}
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {!isLogin && (
        <TextField
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
      {error && <Typography color="error">{error}</Typography>}
      {!isLogin && (
        <Box sx={{ my: 2 }}>
          <FormControl>
            {passwordCriteria.hasUpperCase ? (
              <Typography color="success.main">
                <CheckCircle sx={{ verticalAlign: 'middle', mr: 1 }} />
                Inclui letra maiúscula (A-Z)
              </Typography>
            ) : (
              <Typography color="error.main">
                <Cancel sx={{ verticalAlign: 'middle', mr: 1 }} />
                Inclui letra maiúscula (A-Z)
              </Typography>
            )}
            {passwordCriteria.hasLowerCase ? (
              <Typography color="success.main">
                <CheckCircle sx={{ verticalAlign: 'middle', mr: 1 }} />
                Inclui letra minúscula (a-z)
              </Typography>
            ) : (
              <Typography color="error.main">
                <Cancel sx={{ verticalAlign: 'middle', mr: 1 }} />
                Inclui letra minúscula (a-z)
              </Typography>
            )}
            {passwordCriteria.hasNumber ? (
              <Typography color="success.main">
                <CheckCircle sx={{ verticalAlign: 'middle', mr: 1 }} />
                Inclui número (0-9)
              </Typography>
            ) : (
              <Typography color="error.main">
                <Cancel sx={{ verticalAlign: 'middle', mr: 1 }} />
                Inclui número (0-9)
              </Typography>
            )}
            {passwordCriteria.hasSpecialChar ? (
              <Typography color="success.main">
                <CheckCircle sx={{ verticalAlign: 'middle', mr: 1 }} />
                Inclui caractere especial (@, #, $, etc.)
              </Typography>
            ) : (
              <Typography color="error.main">
                <Cancel sx={{ verticalAlign: 'middle', mr: 1 }} />
                Inclui caractere especial (@, #, $, etc.)
              </Typography>
            )}
          </FormControl>
        </Box>
      )}
      
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {isLogin ? 'Login' : 'Register'}
      </Button>
      <Button
        onClick={() => setIsLogin(!isLogin)}
        color="secondary"
        fullWidth
        sx={{ mt: 2 }}
      >
        {isLogin ? 'Switch to Register' : 'Switch to Login'}
      </Button>
    </Box>
  );
};

export default AuthForm;
