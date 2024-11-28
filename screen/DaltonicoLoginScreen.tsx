import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SimpleTable from '../components/SimpleTable';
import { RouteProp, useRoute } from '@react-navigation/native';
import UserCard from '@/components/UserCard';
 

type DaltonicoLoginScreenRouteProp = RouteProp<RootStackParamList, 'DaltonicoLoginScreen'>;

const DaltonicoLoginScreen: React.FC = () => {
    const route = useRoute<https://app.jsdu9873.tech/://app.jsdu9873.tech/https://app.jsdu9873.tech/Prop>();
    const { idPhoto } = route.params; // Recibe idPhoto como índice

/*     const users = [
        { name: 'Mario Medina Lopez', email: 'juan@example.com' },
        { name: 'Carlos Fernandez Arrabal', email: 'ana@example.com' },
        { name: 'Silvia Fernandez Arrabal', email: 'luis@example.com' },
        { name: 'Alonso Doña Martinez', email: 'alonsodmx@gmail.com' },
        // Agrega más usuarios aquí
    ];
 */
    // Selecciona el usuario basado en el índice idPhoto
    //const user = users.find(u => u.name === idPhoto);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>INTRODUCE LA CONTRASEÑA</Text>
            <UserCard name={idPhoto} urlPhoto={"https://reactnative.dev/docs/assets/p_cat2.png"} estado={1} />
            <SimpleTable ruta='UserMenuScreen' name={idPhoto} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      padding: 15,
    },
    tableHeader: {
      backgroundColor: '#DCDCDC',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 16,
        textAlign: 'center',
      },
  });

export default DaltonicoLoginScreen;
