import httpClient from '../httpClient';
//import AsyncStorage from 'react-native'; //EncryptedStorage fonctionne bien seul
//import EncryptedStorage from 'react-native-encrypted-storage';
//import { Linking } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as Linking from 'expo-linking';
import Constants from 'expo-constants';

//const TRELLO_API_KEY = Constants.extra.TRELLO_API_KEY;

const TRELLO_API_KEY = Constants.expoConfig?.extra?.TRELLO_API_KEY;
console.log(TRELLO_API_KEY);

//const REDIRECT_URI = encodeURIComponent('myapp://auth'); // Remplacez par votre URI de redirection

// Rediriger vers la page d'autorisation de Trello
export const redirectToTrelloAuth = () => {
  const redirectUrl = encodeURIComponent( Linking.createURL('auth')); // Génère automatiquement myapp://auth
  const authUrl = `https://trello.com/1/authorize?expiration=1day&name=trello-mobile-app&scope=read,write&response_type=token&key=${TRELLO_API_KEY}&return_url=${redirectUrl}`;
  Linking.openURL(authUrl);
};


// Extraire le token de l'URL de callback
const extractTokenFromUrl = (url: string) => {
  const error = url.match(/[?&#]error=([^&]+)/);
  if (error) throw new Error(`Trello error: ${error[1]}`);

  const match = url.match(/#token=([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
};

// Gérer le callback et stocker le token
export const handleAuthCallback = async (url: string) => {
  console.log('URL de callback après identification:', url);
  const token = extractTokenFromUrl(url);
  if (token) {
    await SecureStore.setItemAsync('trello_access_token', token);
    return token;
  } else {
    throw new Error('Token non trouvé dans l\'URL de callback');
  }
};

// Récupérer le token utilisateur
export const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync('token');
    console.log('Token enregistré:', token);
    return token;
  } catch (error) {
    console.error('Erreur lors de la récupération du token:', error);
    throw error;
  }
};

// Vérifier si le token utilisateur est valide
export const verifyToken = async () => {
  try {
    const token = await getToken();
    if (!token) throw new Error('Token non disponible');

    const response = await httpClient.get('/members/me', {
      headers: {
        Authorization: `OAuth oauth_consumer_key="${TRELLO_API_KEY}", oauth_token="${token}"`
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Échec de vérification:', error);
    throw new Error('Token invalide ou expiré');
  }
};