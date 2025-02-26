import httpClient from "../httpClient";
import { getToken } from './auth';

//Avant d'assigner, il faut get l'ID
export const getIdMembers = async (id: string) => {
  try {
    const response = await httpClient.get(`/cards/${id}/idMembers`, {
        params: {
          key: process.env.TRELLO_API_KEY,
          token: await getToken(),
        },
      });    return response.data;
} catch (error) {
    console.error('Erreur lors de la récupération des membres assignés à la carte:', error);
    throw error;
  }
}

// Assigner des personnes à une carte
export const assignPersons = async (id: string, idMembers: string[]) => {
  try {
    const response = await httpClient.post(`/cards/${id}/idMembers`, {
      value: idMembers.join(','),
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'assignation des personnes à la carte:', error);
    throw error;
  }
}
