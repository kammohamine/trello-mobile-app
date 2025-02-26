import httpClient from "../httpClient";

// Créer une carte --> seul qui est bon pour l'instant
export const createCard = async (name: string, idList: string, desc?: string) => {
  try {
    const response = await httpClient.post('/cards',{}, {
        params: {
      name,
      idList,
      desc,
    }
});
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de la carte:', error);
    throw error;
  }
};

// Mettre à jour une carte
export const updateCard = async (id: string, name: string, desc?: string) => {
  try {
    const response = await httpClient.put(`/cards/${id}`, {
      name,
      desc,
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la carte:', error);
    throw error;
  }
};

// Supprimer une carte
export const deleteCard = async (id: string) => {
  try {
    const response = await httpClient.delete(`/cards/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression de la carte:', error);
    throw error;
  }
};

// Récupérer une carte
export const getCard = async (id: string) => {
  try {
    const response = await httpClient.get(`/cards/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de la carte:', error);
    throw error;
  }
};