import httpClient from "../httpClient";

// Créer un board
export const createBoard = async (name: string) => {
  try {
    const response = await httpClient.post('/boards',{}, {
        params: {
      name,
    }
});
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création du board:', error);
    throw error;
  }
};