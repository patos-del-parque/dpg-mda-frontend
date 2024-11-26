import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SimpleTable from '../components/SimpleTable';
import { RouteProp, useRoute } from '@react-navigation/native';
import UserCard from '@/components/UserCard';
 

type LoginStudentDefaultRouteProp = RouteProp<RootStackParamList, 'LoginStudentDefault'>;

const LoginStudentDefault: React.FC = () => {
    const route = useRoute<LoginStudentDefaultRouteProp>();
    const { idPhoto } = route.params; // Recibe idPhoto como índice

    const users = [
        { name: 'Mario Medina Lopez', email: 'juan@example.com' },
        { name: 'Carlos Fernandez Arrabal', email: 'ana@example.com' },
        { name: 'Silvia Fernandez Arrabal', email: 'luis@example.com' },
        { name: 'Alonso Doña Martinez', email: 'alonsodmx@gmail.com' },
        // Agrega más usuarios aquí
    ];

    // Selecciona el usuario basado en el índice idPhoto
    const user = users.find(u => u.name === idPhoto);

    return (
        <View style={styles.container}>
            {user ? (
                <UserCard name={user.name} urlPhoto={user.email} estado={1} />
            ) : (
                <Text>{idPhoto}No se encontró el usuario.</Text>
            )}
            <SimpleTable ruta='UserMenuScreen' />
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
  });

export default LoginStudentDefault;
