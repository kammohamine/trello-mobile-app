import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import httpClient from '../../api/httpClient';

const BoardsScreen = () => {
  const { token } = useContext(AuthContext);
  interface Board {
    id: string;
    name: string;
  }

  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await httpClient.get<Board[]>('/members/me/boards', {
          params: {
            key: process.env.TRELLO_API_KEY,
            token: token,
          },
        });
        setBoards(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des boards:', error);
      }
    };

    if (token) {
      fetchBoards();
    }
  }, [token]);

  return (
    <View style={styles.container}>
      <FlatList
        data={boards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.boardItem}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  boardItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default BoardsScreen;