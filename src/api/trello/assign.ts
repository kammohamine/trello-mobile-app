import httpClient from "../httpClient";

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
};
