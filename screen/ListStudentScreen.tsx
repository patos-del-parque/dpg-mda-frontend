import { View, StyleSheet, Text, Dimensions, FlatList, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';

import UserCardWithButton from  '../components/UserCardWithButton'; 

const ListStudentScreen: React.FC = () =>{

  const windowWidth = Dimensions.get('window').width;
  const [users, setUsers] = useState<{ name: string; aula: string; lectura: boolean,imagen: boolean,video: boolean; }[]>([]);

  useEffect(() => {
    // Función para obtener los datos de la API
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://api.jsdu9873.tech/api/students/get', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        if (response.ok) {
          const nombres = result.students.map((student: { nombre: string; aula: string,lectura: boolean,imagen: boolean,video:boolean }) => ({
            name: student.nombre,
            aula: student.aula,
            lectura: student.lectura,
            imagen: student.imagen,
            video: student.video,
          }));
          setUsers(nombres); // Actualizamos el estado con los nombres obtenidos
        } else {
          Alert.alert('Error', result.message || 'Hubo un problema al obtener los estudiantes.');
        }
      } catch (error) {
        Alert.alert('Error', 'No se pudo obtener la lista de estudiantes.');
      }
    };

    fetchUsers();
  }, []); // Se ejecuta solo al montar el componente

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Estudiantes</Text>
      {/* {users.map((user, index) => (
        <UserCardWithButton
        keyProp={index}
        name={user.name}
        urlPhoto="https://reactnative.dev/docs/assets/p_cat2.png"
      />
      ))} */}
      <FlatList
      data={users}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <UserCardWithButton
          name={item.name}
          urlPhoto="https://reactnative.dev/docs/assets/p_cat2.png"
        />
      )}
    />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 30,
    textAlign: 'center',
  },
  grid: {
    justifyContent: 'space-between',
  },
});


export default ListStudentScreen;