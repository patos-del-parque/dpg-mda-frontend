import React from 'react';
import { View, StyleSheet, Text,Pressable } from 'react-native';
import TeacherMenu from '../components/TeacherMenu';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TeacherScreen: React.FC = () =>{
  const navigation = useNavigation();
  const handleLogout = () => {
    // Redirigir al login
    navigation.navigate('Home'); // Cambia 'LoginScreen' por el nombre de tu pantalla de login
  };
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Panel del Profesorado</Text>
      <TeacherMenu route='RequestMaterials' label='Solicitar Materiales' iconName='tasks' />
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
    marginTop: 20,
    backgroundColor: '#FF4F4F',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutIcon: {
    marginRight: 5,
  },
});


export default TeacherScreen;
