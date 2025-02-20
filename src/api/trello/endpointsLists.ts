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