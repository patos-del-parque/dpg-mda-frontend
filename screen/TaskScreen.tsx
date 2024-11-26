import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import TaskMenu from  '../components/TaskMenu'; 


const TaskScreen: React.FC = () =>{
return(
    <View style={styles.container}>
      <Text style={styles.title}>Panel de Administración de Tareas</Text>
        <TaskMenu route='TaskMenu' label='Crear Tareas' iconName='tasks' />
        <TaskMenu route='AssignTaskScreen' label='Asignar Tareas' iconName='user-plus' />
        <TaskMenu route='TaskMenu' label='Ver Estado de Tareas' iconName='check-circle' />
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
