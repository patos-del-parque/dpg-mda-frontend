// screens/GalleryScreen.tsx
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import TaskCard from '../components/TaskCard';

const UserTaskScreen: React.FC = () => {
  const prueba = {
    tareas: [
      {
        id: 1,
        title: 'Tarea 1',
        descripcion: 'Descripción de la tarea 1',
        pasos: [
          {
            id: 101,
            description: 'Paso 1 de la tarea 1, coger un cepillo',
            imageUrl: 'https://reactnative.dev/docs/assets/p_cat2.png',
          },
          {
            id: 102,
            description: 'Paso 2 de la tarea 1, esparcir la pasta de dientes',
            imageUrl: 'https://reactnative.dev/docs/assets/p_cat2.png',
          },
        ],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TaskCard prueba={prueba} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
});

export default UserTaskScreen;
