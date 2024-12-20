import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';

type UserCardProps = {
    name: string;
    urlPhoto: string;
    estado: number;
    lectura: boolean;
    imagen: boolean;
    video: boolean;
};

const UserCard: React.FC<UserCardProps> = ({ name, urlPhoto ,estado, lectura,imagen,video}) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const handlePress = () => {
        navigation.navigate('LoginStudentDefault', { idPhoto: name, foto: urlPhoto })
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.touchable}>
            <Card containerStyle={styles.card}>
                <Image
                    source={{ uri: urlPhoto }} // Usa la URL de la imagen pasada como prop
                    style={styles.image}
                />
                <Text style={styles.title}>{name}</Text>
                {estado === 0 && ( // Renderizado condicional
                    <View style={styles.iconContainer}>
                        <Icon
                            name="arrow-right-circle"
                            type="feather"
                            color="#007BFF"
                            size={54}
                            onPress={handlePress} // También se puede tocar la flecha
                        />
                        <Text style={styles.salir}>AVANZAR</Text>
                    </View>
                )}
            </Card>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        alignSelf: 'center',
        width: '90%', // Ajuste para un ancho razonable en dispositivos grandes
        maxWidth: 500, // Límite máximo de ancho para dispositivos grandes
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4, // Sombra en Android
    },
    touchable: {
        alignSelf: 'center',
    },
    image: {
        width: 150, // Tamaño fijo para la imagen
        height: 150, // Tamaño fijo para la imagen
        alignSelf: 'center',
        borderRadius: 8, // Opcional, para bordes redondeados
        resizeMode: 'cover', // Puede usar 'contain' si lo prefieres
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        color: '#333',
        marginTop: 8,
    },
    salir: {
        fontSize: 20,
        color: '#333',
    },
    iconContainer: {
        marginTop: 12,
        alignItems: 'center',
    },
});

export default UserCard;