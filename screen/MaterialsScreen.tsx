import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import TaskMenu from  '../components/TaskMenu'; 


const MaterialsScreen: React.FC = () =>{
return(
    <View style={styles.container}>
      <Text style={styles.title}>Panel de Administración de Tareas</Text>
        <TaskMenu route='ListMaterialScreen' label='Ver Materiales Disponibles' iconName='tasks' />
        <TaskMenu route='RegisterMaterialScreen' label='Registrar Materiales' iconName='check-circle' />
        <TaskMenu route='SeeRequestMaterialScreen' label='Solicitudes de material' iconName='clipboard' />
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


export default MaterialsScreen;
