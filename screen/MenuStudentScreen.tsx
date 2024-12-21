import React from 'react';
import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import MenuStudent from '@/components/MenuStudent';

import Icon from 'react-native-vector-icons/FontAwesome';
const MenuStudentScreen: React.FC = () =>{
  const navigation = useNavigation();
  const handleLogout = () => {
    // Redirigir al login
    navigation.navigate('Home'); // Cambia 'LoginScreen' por el nombre de tu pantalla de login
  };
return(
    <View style={styles.container}>
      <Text style={styles.title}>AULAS DISPONIBLES</Text>
      <Image source={{ uri:'https://media.istockphoto.com/id/1165541200/es/vector/dibujos-animados-vectoriales-de-aulas-escolares-o-universitarias.jpg?s=612x612&w=0&k=20&c=dGFjD3gBFNrxDjZb1lPJ1ALZq2eVVTrqz5yIjCCQNFA=' }} style={styles.image} />
      < MenuStudent ruta='NumeroMenuScreen' datos={[
        {
            nombreAula: 'AULA 1',
            imageAula: 'https://media.istockphoto.com/id/1165541200/es/vector/dibujos-animados-vectoriales-de-aulas-escolares-o-universitarias.jpg?s=612x612&w=0&k=20&c=dGFjD3gBFNrxDjZb1lPJ1ALZq2eVVTrqz5yIjCCQNFA=',
        },
        {
            nombreAula: 'AULA 2',
            imageAula: 'https://media.istockphoto.com/id/1165541200/es/vector/dibujos-animados-vectoriales-de-aulas-escolares-o-universitarias.jpg?s=612x612&w=0&k=20&c=dGFjD3gBFNrxDjZb1lPJ1ALZq2eVVTrqz5yIjCCQNFA=',
        },
        
    ]}/>
    {/* Botón Rojo */}
    <Pressable style={styles.logoutButton} onPress={handleLogout}>
      <Icon name="sign-out" size={44} color="#fff" style={styles.logoutIcon} />
      <Text style={styles.logoutText}>SALIR</Text>
    </Pressable> 
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 15,
    backgroundColor: '#EDE7F6',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 15,
    alignSelf: 'center', // Centra la imagen dentro de su contenedor'

  },    
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#FF4F4F', // Color rojo
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  logoutIcon: {
    marginRight: 5,
  },
});


export default MenuStudentScreen;