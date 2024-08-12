import React from 'react';
import { Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import AuthForm from '../components/AuthForm';

function Login() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/users');
  };

  return (
    <Container maxWidth="sm">
      <AuthForm isLogin={true} onSuccess={handleSuccess} />
    </Container>
  );
}

export default Login;
