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

export const updateBoard = async (id: string, name: string) => {
  try {
    const response = await httpClient.put(`/boards/${id}`, {
      name,
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du board:', error);
    throw error;
  }
};

export const deleteBoard = async (id: string) => {
  try {
    const response = await httpClient.delete(`/boards/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression du board:', error);
    throw error;
  }
};

export const getBoard = async (id: string) => {
  try {
    const response = await httpClient.get(`/boards/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du board:', error);
    throw error;
  }
};

//getBoards permet de récupérer les boards liées à un utilisateur

export const getBoards = async (token: string | null) => {
  try {
    const response = await httpClient.get('/members/me/boards', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des boards:', error);
    throw error;
  }
};
