import { View, StyleSheet, Text, Dimensions, FlatList, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import SeeTaskProgress from '../components/SeeTaskProgress'; 

const ListStudentScreen: React.FC = () => {

  const windowWidth = Dimensions.get('window').width;
  const [users, setUsers] = useState<{ name: string; aula: string; avatar: string; lectura: boolean, imagen: boolean, video: boolean; }[]>([]);

  // Función para obtener los datos de la API
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://api.jsdu9873.tech/api/students/get', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();
      if (response.ok) {
        const nombres = result.students.map((student: { nombre: string; aula: string, avatar: string, lectura: boolean, imagen: boolean, video: boolean }) => ({
          name: student.nombre,
          aula: student.aula,
          avatar: student.avatar,
          lectura: student.lectura,
          imagen: student.imagen,
          video: student.video,
        }));
        setUsers(nombres); // Actualizamos el estado con los nombres obtenidos
      } else {
        console.log('Error', result.message || 'Hubo un problema al obtener los estudiantes.');
      }
    } catch (error) {
      console.log('Error', 'No se pudo obtener la lista de estudiantes.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []); // Se ejecuta solo al montar el componente

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estudiantes</Text>
      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <SeeTaskProgress
              name={item.name}
              aula={item.aula}
              lectura={item.lectura}
              imagen={item.imagen}
              video={item.video}
              urlPhoto={item.avatar}
            />
          </View>
        )}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#f4f6f9',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 20,
    textAlign: 'center',
  },
  flatListContent: {
    paddingBottom: 16,
    paddingTop: 10,
  },
  card: {
    padding: 16,
    margin: 8,
    borderRadius: 22,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000000',  // Color del borde
    borderWidth: 4,          // Grosor del borde
  },
  grid: {
    justifyContent: 'space-between',
  },
});

export default ListStudentScreen;
