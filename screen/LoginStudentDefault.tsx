import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SimpleTable from '../components/SimpleTable';
import { RouteProp, useRoute } from '@react-navigation/native';
import UserCard from '@/components/UserCard';

type LoginStudentDefaultRouteProp = RouteProp<RootStackParamList, 'LoginStudentDefault'>;

const LoginStudentDefault: React.FC = () => {
    const route = useRoute<LoginStudentDefaultRouteProp>();
    const { idPhoto } = route.params; // Recibe idPhoto como índice
    const { foto } = route.params;

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>INTRODUCE LA CONTRASEÑA</Text>
            <UserCard name={idPhoto} urlPhoto={foto} estado={1} />
            <SimpleTable ruta='UserMenuScreen' name={idPhoto} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1, // Ocupa todo el espacio disponible en la pantalla
        backgroundColor: '#EDE7F6', // Color de fondo para toda la pantalla
        padding: 15,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#000000', // Asegúrate de usar un color que contraste
        marginBottom: 16,
        textAlign: 'center',
    },
});

export default LoginStudentDefault;
