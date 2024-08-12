import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import withAuth from '../context/WithAuth';
import { AuthProvider } from '../context/AuthContext';

// Mock do `useRouter` do Next.js
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock para `useAuth`
const mockSetUsuario = jest.fn();
jest.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    usuario: null,
    setUsuario: mockSetUsuario,
  }),
  AuthProvider: ({ children }) => <div>{children}</div>,  // Mock simplificado do AuthProvider
}));

describe('withAuth HOC', () => {
  const TestComponent = () => <div>Test Component</div>;
  const WrappedComponent = withAuth(TestComponent);

  it('redireciona para /signIn se o usuário não estiver autenticado', async () => {
    const mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });

    render(
      <AuthProvider>
        <WrappedComponent />
      </AuthProvider>
    );

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/signIn'));
  });

  it('define o estado inicial do usuário quando usuarioInicial é passado', async () => {
    const mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });

    render(
      <AuthProvider>
        <WrappedComponent usuarioInicial={{ username: 'exampleUser' }} />
      </AuthProvider>
    );

    await waitFor(() =>
      expect(mockSetUsuario).toHaveBeenCalledWith({ username: 'exampleUser' })
    );
  });
});
