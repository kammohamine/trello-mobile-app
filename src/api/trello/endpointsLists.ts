import httpClient from "../httpClient";

// Créer une liste

export const createList = async (name: string, idBoard: string) => {
  try {
    const response = await httpClient.post('/lists',{}, {
        params: {
      name,
      idBoard,
    }
});
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de la liste:', error);
    throw error;
  }
};

// Mettre à jour une liste
export const updateList = async (id: string, name: string) => {
  try {
    const response = await httpClient.put(`/lists/${id}`, {
      name,
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la liste:', error);
    throw error;
  }
};

// Supprimer une liste
export const deleteList = async (id: string) => {
  try {
    const response = await httpClient.delete(`/lists/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression de la liste:', error);
    throw error;
  }
};

// Récupérer une liste
export const getList = async (id: string) => {
  try {
    const response = await httpClient.get(`/lists/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de la liste:', error);
    throw error;
  }
};
