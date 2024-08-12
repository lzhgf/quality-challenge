import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './AuthContext';

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const { usuario, setUsuario } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!usuario) {
        router.push('/signIn');
      }
    }, [usuario, router]);

    useEffect(() => {
      if (props.usuarioInicial) {
        setUsuario(props.usuarioInicial);
      }
    }, [props.usuarioInicial, setUsuario]);

    if (!usuario) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  AuthenticatedComponent.getServerSideProps = async (context) => {
    const { req, res } = context;
    const cookies = req.headers.cookie;
    const token = cookies ? cookies.split('; ').find(row => row.startsWith('token=')).split('=')[1] : null;

    if (!token) {
      return {
        redirect: {
          destination: '/signIn',
          permanent: false,
        },
      };
    }

    const user = verifyToken(token);

    if (!user) {
      return {
        redirect: {
          destination: '/signIn',
          permanent: false,
        },
      };
    }

    return {
      props: {
        usuarioInicial: user,
      },
    };
  };

  return AuthenticatedComponent;
};

export default withAuth;

function verifyToken(token) {
  if (token === 'valid_token') {
    return { username: 'exampleUser' };
  }
  return null;
}
