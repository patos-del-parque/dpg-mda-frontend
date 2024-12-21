import { View, StyleSheet, Text, Dimensions, FlatList, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';

import TeacherCardWithButton from  '../components/TeacherCardWithButton'; 

//import UserCardWithButton from  '../components/UserCardWithButton'; 

const ListTeacherScreen: React.FC = () =>{

  const windowWidth = Dimensions.get('window').width;
  const [users, setUsers] = useState<{ name: string; }[]>([]);


  // Función para obtener los datos de la API
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://api.jsdu9873.tech/api/teachers/get', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();
      if (response.ok) {
        const nombres = result.teachers.map((teacher: { nombre: string; }) => ({
          name: teacher.nombre
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
  }); // Se ejecuta solo al montar el componente

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Profesores</Text>
      <FlatList
      data={users}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TeacherCardWithButton
          name={item.name}
          urlPhoto="https://img.freepik.com/fotos-premium/vista-3d-maestro-masculino_1295705-20660.jpg?semt=ais_hybrid"
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


export default ListTeacherScreen;