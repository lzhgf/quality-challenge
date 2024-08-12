import React from 'react';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import AuthForm from '../components/AuthForm';

function Register() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/users');
  };

  return (
    <Container maxWidth="sm">
      <AuthForm isLogin={false} onSuccess={handleSuccess} />
    </Container>
  );
}

export default Register;
