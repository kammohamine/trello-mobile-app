import httpClient from '../httpClient';

// vérifier si le token utilisateur est valide
export const verifyToken = async () => {
    try {
      const response = await httpClient.get('/members/me');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la vérification du token:', error);
      throw error;
    }
  };