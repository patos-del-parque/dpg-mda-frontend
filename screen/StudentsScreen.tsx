import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import TaskMenu from  '../components/StudentsMenu'; 
import StudentsMenu from '../components/StudentsMenu';


const StudentsScreen: React.FC = () =>{
return(
    <View style={styles.container}>
      <Text style={styles.title}>Panel de Administración de Estudiantes</Text>
      <StudentsMenu route='RegisterStudent' label='Dar de alta a estudiante' iconName='user' />
      <StudentsMenu route='ListStudent' label='Lista de estudiantes' iconName='user' />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 30,
    textAlign: 'center',
  },
});


export default StudentsScreen;
