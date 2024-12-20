import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import TaskMenu from  '../components/TaskMenu'; 
import SeeTaskProgressScreen from './SeeTaskProgressScreen';


const TaskScreen: React.FC = () =>{
return(
    <View style={styles.container}>
      <Text style={styles.title}>Panel de Administración de Tareas</Text>
        <TaskMenu route='TaskMenu' label='Crear Tareas' iconName='tasks' />
        <TaskMenu route='SeeTaskProgressScreen' label='Ver Estado de Tareas' iconName='check-circle' />
        <TaskMenu route = 'ListTaskScreen' label = 'Listado de Tareas' iconName='tasks'/>
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


export default TaskScreen;
