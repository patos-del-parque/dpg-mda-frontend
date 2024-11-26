import React from 'react';
import { View, StyleSheet,Text,Image } from 'react-native';
import AdminMenu from '../components/AdminMenu'; 
import SpecificTaskScreen from './SpecificTaskScreen';
import MenuStudent from '@/components/MenuStudent';

const MenuStudentScreen: React.FC = () => {
    // Datos comentados (sin modificar)
    /* 
    const prueba = {
        tareas: [
            {
                id: 1,
                title: 'Lavarse los dientes',
                photo: 'https://reactnative.dev/docs/assets/p_cat2.png',
                descripcion: 'Lavarse los dientes con el cepillo y la pasta de dientes',
                pasos: [
                    {
                        id: 101,
                        description: 'Paso 1, coger un cepillo',
                        imageUrl: 'https://reactnative.dev/docs/assets/p_cat2.png',
                    },
                    {
                        id: 102,
                        description: 'Paso 2, esparcir la pasta de dientes por todo el cabezal',
                        imageUrl: 'https://reactnative.dev/docs/assets/p_cat2.png',
                    },
                    {
                        id: 103,
                        description: 'Paso 3, aclaramos con un poco de agua',
                        imageUrl: 'https://reactnative.dev/docs/assets/p_cat2.png',
                    },
                    {
                        id: 104,
                        description: 'Paso 4, lavarse los dientes',
                        imageUrl: 'https://reactnative.dev/docs/assets/p_cat2.png',
                    },
                    {
                        id: 105,
                        description: 'Paso 5, aclarar con agua y colocar en su sitio el cepillo',
                        imageUrl: 'https://reactnative.dev/docs/assets/p_cat2.png',
                    },
                ],
                estado: 0,
            },
        ]
    };
    */

    // Definición de los datos de las aulas
    const datos = [
        {
            nombreAula: 'Lavarse los dientes',
            imageAula: 'https://reactnative.dev/docs/assets/p_cat2.png',
        },
        {
            nombreAula: 'Ir a por inventario',
            imageAula: 'https://reactnative.dev/docs/assets/p_cat2.png',
        },
        {
            nombreAula: 'Hacer deberes',
            imageAula: 'https://reactnative.dev/docs/assets/p_cat2.png',
        },
    ];

    return (
        <View style={styles.container}>
            {/* Componente MenuStudent con props */}
            <Text style={styles.title}>TAREAS DISPONIBLES</Text>
            <Image source={{ uri:'https://reactnative.dev/docs/assets/p_cat2.png' }} style={styles.image} />
            <MenuStudent ruta="SpecificTaskScreen" datos={datos} /> 
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
