import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AdminMenu from  '../components/AdminMenu'; 


const AdminScreen: React.FC = () =>{
return(
    <View style={styles.container}>
      <Text style={styles.title}>Panel de Administración</Text>
      <AdminMenu route='TaskScreen' label='Tareas' iconName='tasks' />   
      <AdminMenu route='StudentsScreen' label='Estudiantes' iconName='user' />  
      <AdminMenu route='TeacherAdminScreen' label='Profesores' iconName='user' />     
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
