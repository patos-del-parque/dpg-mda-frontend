import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AdminMenu from  '../components/AdminMenu'; 


const AdminScreen: React.FC = () =>{
return(
    <View style={styles.container}>
      <Text style={styles.title}>Panel de Administración</Text>
      <AdminMenu route='TaskMenu' label='Crear Tareas' iconName='tasks' />
      <AdminMenu route='AssignTaskScreen' label='Asignar Tareas' iconName='user-plus' />
      <AdminMenu route='TaskMenu' label='Ver Estado de Tareas' iconName='check-circle' />
      <AdminMenu route='RegisterStudent' label='Dar de alta a estudiante' iconName='user' />
      <AdminMenu route='ModifyStudent' label='Modificar datos estudiante' iconName='edit' />
      <AdminMenu route='EraseStudent' label='Dar de baja a alumno' iconName='user' />
      <AdminMenu route='ModifySkillsScreen' label='Modificar habilidades del estudiante' iconName='edit' />
      <AdminMenu route='RegisterTeacher' label='Dar de alta a profesor' iconName='user' />
      <AdminMenu route='ModifyTeacher' label='Modificar datos profesor' iconName='edit' />
      <AdminMenu route='EraseTeacher' label='Dar de baja a profesor' iconName='user' />
      <AdminMenu route='ListStudent' label='Lista de alumnos' iconName='user' />
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


export default AdminScreen;
