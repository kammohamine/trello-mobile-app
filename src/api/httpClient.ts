import axios from "axios";
import dotenv from "dotenv";
import { getToken } from './trello/auth'; // Importer la fonction getToken

dotenv.config();

const TRELLO_API_KEY = process.env.TRELLO_API_KEY;

// Création d'une instance unique d'axios avec une configuration de base
const httpClient = axios.create({
  baseURL: "https://api.trello.com/1",
  params: {
    key: TRELLO_API_KEY,
  },
});

// Token d'authentification
let authToken: string | null = null;

const updateToken = async () => {
  authToken = await getToken();
};

// explication : Comme l'intercepteur ne peut pas être asynchrone à cause du typage strict en ts de axios, 
// on utilise une fonction(updateToken) pour mettre à jour le token et on l'appelle dans l'intercepteur

// Intercepteur pour les requêtes
httpClient.interceptors.request.use(
  (config) => {
    if (!config.headers) {
      config.headers = {};
    }
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    console.log("Requête envoyée:", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
httpClient.interceptors.response.use(
  response => {
    console.log('Réponse reçue:', response);
    return response;
  },
  error => {
    if (error.response) {
      console.error('Erreur de réponse:', error.response);
    } else if (error.request) {
      console.error('Erreur de requête:', error.request);
    } else {
      console.error('Erreur:', error.message);
    }
    return Promise.reject(error);
  }
);

export default httpClient;