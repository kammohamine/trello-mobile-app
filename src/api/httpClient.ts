import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const TRELLO_API_KEY = process.env.TRELLO_API_KEY;
const TRELLO_API_TOKEN = process.env.TRELLO_API_TOKEN;

// Création d'une instance d'axios avec une configuration de base
const httpClient = axios.create({
  baseURL: "https://api.trello.com/1",
  params: {
    key: TRELLO_API_KEY,
    token: TRELLO_API_TOKEN,
  },
});

//intercepteur axios pour l'entête de la requête
httpClient.interceptors.request.use(
    config => {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${TRELLO_API_TOKEN}`;
      console.log('Requête envoyée:', config);
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  
// intercepteur axios pour la réponse et les erreurs
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