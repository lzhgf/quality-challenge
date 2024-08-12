import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const storedUser = Cookies.get('usuario');
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    }
  }, []);

  const login = (username, password) => {
    const storedUser = Cookies.get('usuario');
    if (storedUser) {
      const storedUserData = JSON.parse(storedUser);
      if (storedUserData.username === username && storedUserData.password === password) {
        const user = { username };
        setUsuario(user);
        Cookies.set('token', 'valid_token');
        return true;
      }
    }
    return false;
  };

  const register = (username, password) => {
    const storedUser = Cookies.get('usuario');
    if (!storedUser) {
      const user = { username, password };
      Cookies.set('usuario', JSON.stringify(user));
      setUsuario(user);
      Cookies.set('token', 'valid_token');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUsuario(null);
    Cookies.remove('usuario');
    Cookies.remove('token');
  };

  return (
    <AuthContext.Provider value={{ usuario, login, register, logout, setUsuario }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
