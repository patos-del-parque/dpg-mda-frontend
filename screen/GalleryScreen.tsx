// screens/GalleryScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import UserCard from '../components/UserCard';
import { Button } from 'react-native-elements';

const GalleryScreen: React.FC = () => {
  const users = [
    { name: 'Mario Medina Lopez', email: 'juan@example.com' },
    { name: 'Carlos Fernandez Arrabal', email: 'ana@example.com' },
    { name: 'Silvia Fernandez Arrabal', email: 'luis@example.com' },
    { name: 'Alonso Doña Martinez', email: 'alonsodmx@gmail.com'},
    // Agrega más usuarios aquí
  ];
  /* const [users, setUsers] = useState<{ name: string; email: string }[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://api.jsdu9873.tech/api/usuarios');
        const data = await response.json();
        const formattedUsers = data.listaUsuarios.map((user: { nombre: string; email: string }) => ({
          name: user.nombre,
          email: user.email,
        }));
        setUsers(formattedUsers);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    fetchUsers();
  }, []); */

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estudiantes</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {users.map((user, index) => (
          <UserCard key={index} name={user.name} urlPhoto={user.email} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9fafc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  scrollContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});

export default GalleryScreen;
