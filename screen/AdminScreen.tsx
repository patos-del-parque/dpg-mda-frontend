import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import AdminMenu from '../components/AdminMenu'; 
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AdminScreen: React.FC = () => {
  const navigation = useNavigation();

  // Función para manejar el logout
  const handleLogout = () => {
    navigation.navigate('Home'); // Cambia 'LoginScreen' por la pantalla de destino que elijas
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel de Administración</Text>
      
      <AdminMenu route='TaskScreen' label='Tareas' iconName='tasks' />   
      <AdminMenu route='StudentsScreen' label='Estudiantes' iconName='user' />  
      <AdminMenu route='TeacherAdminScreen' label='Profesores' iconName='user' />
      <AdminMenu route='MaterialsScreen' label='Materiales' iconName='list-alt' />

      {/* Botón de Logout */}
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="sign-out" size={24} color="#fff" style={styles.logoutIcon} />
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </Pressable>
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
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#FF5733', // Rojo
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AdminScreen;
