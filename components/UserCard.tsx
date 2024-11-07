import React from 'react';
import { View, Text, StyleSheet,Image, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';

type UserCardProps = {
    name: string;
    urlPhoto: string;
};


const UserCard: React.FC<UserCardProps> = ({ name, urlPhoto }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const handlePress = () => {
        navigation.navigate('LoginStudentDefault'); // Asegúrate de que el nombre de la ruta es correcto
      };
    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={handlePress}>
                <Card containerStyle={styles.card}>
                    <Card.Title>{name}</Card.Title>
                    <Card.Divider />
                    <Image source={{ uri:'https://reactnative.dev/docs/assets/p_cat2.png', }} style={{width:200,height:200,alignSelf: 'center'}}/>
                </Card>
            </TouchableOpacity>
        </View>
    );
};




const styles = StyleSheet.create({
    card: {
        alignSelf: 'center',
        width: '90%', // Ajuste para un ancho razonable en dispositivos grandes
        maxWidth: 400, // Límite máximo de ancho para dispositivos grandes
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4, // Sombra en Android
    },
    text: {
        fontSize: 16,
        color: '#333', // Color del texto para mejor contraste
    },
});

export default UserCard;
