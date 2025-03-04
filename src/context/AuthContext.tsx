import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Linking } from 'react-native';
import { handleAuthCallback, redirectToTrelloAuth } from '../api/trello/auth';

interface AuthContextProps {
  token: string | null;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const checkToken = async () => {

      const storedToken = await SecureStore.getItemAsync('trello_access_token');
      if (storedToken) {
        setToken(storedToken);
      }
    };
    const handleUrl = async (event: { url: string }) => {
      const newToken = await handleAuthCallback(event.url);
      setToken(newToken);
    };
    checkToken();
    const getInitialUrl = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) handleUrl({ url: initialUrl });
    };
    getInitialUrl();
    const subscription = Linking.addEventListener('url', handleUrl);
    return () => {
      subscription.remove();
    };
  }, []);

  const login = async() => {
    await redirectToTrelloAuth();
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('trello_access_token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};