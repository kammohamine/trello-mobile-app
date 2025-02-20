import httpClient from '../httpClient';
import AsyncStorage from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Linking } from 'react-native';

const TRELLO_API_KEY = process.env.TRELLO_API_KEY;
const REDIRECT_URI = 'myapp://auth'; // Remplacez par votre URI de redirection

// Rediriger vers la page d'autorisation de Trello
export const redirectToTrelloAuth = () => {
  const authUrl = `https://trello.com/1/authorize?expiration=1day&name=YourAppName&scope=read,write&response_type=token&key=${TRELLO_API_KEY}&return_url=${REDIRECT_URI}`;
  Linking.openURL(authUrl);
};

// Gérer le callback et stocker le token
export const handleAuthCallback = async (url: string) => {
  const token = extractTokenFromUrl(url);
  if (token) {
    await EncryptedStorage.setItem('token', token);
    return token;
  } else {
    throw new Error('Token non trouvé dans l\'URL de callback');
  }
};

// Extraire le token de l'URL de callback
const extractTokenFromUrl = (url: string) => {
  const match = url.match(/#token=([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
};

// Récupérer le token utilisateur
export const getToken = async () => {
  try {
    const token = await EncryptedStorage.getItem('token');
    return token;
  } catch (error) {
    console.error('Erreur lors de la récupération du token:', error);
    throw error;
  }
};

// Vérifier si le token utilisateur est valide
export const verifyToken = async () => {
  try {
    const response = await httpClient.get('/members/me');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error);
    throw error;
  }
};