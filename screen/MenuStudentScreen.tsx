import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import AdminMenu from  '../components/AdminMenu'; 
import UserMenuScreen from './UserMenuScreen';
import MenuStudent from '@/components/MenuStudent';


const MenuStudentScreen: React.FC = () =>{
return(
    <View style={styles.container}>
      <Text style={styles.title}>AULAS DISPONIBLES</Text>
      <Image source={{ uri:'https://logosnurseryschool.es/nursery/wp-content/uploads/2016/07/Instalaciones-logos-nursery-comedor-1.jpg' }} style={styles.image} />
      < MenuStudent ruta='NumeroMenuScreen' datos={[
        {
            nombreAula: 'AULA 1',
            imageAula: 'https://www.solerpalau.com/es-es/blog/wp-content/uploads/2021/01/Confort-termico-colegios.jpg',
        },
        {
            nombreAula: 'AULA 2',
            imageAula: 'https://reactnative.dev/docs/assets/p_cat2.png',
        },
        {
            nombreAula: 'AULA 3',
            imageAula: 'https://reactnative.dev/docs/assets/p_cat2.png',
        },
    ]}/> 
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 15,
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
});


export default MenuStudentScreen;