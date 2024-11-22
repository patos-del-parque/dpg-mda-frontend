import React from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';

type UserCardWithButtonProps = {
    keyProp: number;
    name: string;
    urlPhoto: string;
};

const UserCardWithButton: React.FC<UserCardWithButtonProps> = ({ name, urlPhoto, keyProp}) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()

    return (
        <View style={styles.card}>
            <Text style={styles.name}>{name}</Text>
            <Image
                source={{ uri: urlPhoto }} // Usa la URL de la imagen pasada como prop
                style={styles.image}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('AssignTaskScreen')
                }
                >
                <Text style={styles.buttonText}>A</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('RegisterStudent')
                }
                >
                <Text style={styles.buttonText}>R</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('ModifyStudent')
                }
                >
                <Text style={styles.buttonText}>M</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('EraseStudent')
                }
                >
                <Text style={styles.buttonText}>B</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 16,
        margin: 8,
        borderRadius: 8,
        backgroundColor: '#f8f9fa',
        alignItems: 'center',
        justifyContent: 'center',
      },
      name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
      },
      image: {
        width: 100, // Tamaño fijo para la imagen
        height: 100, // Tamaño fijo para la imagen
        alignSelf: 'center',
        borderRadius: 8, // Opcional, para bordes redondeados
        resizeMode: 'cover', // Puede usar 'contain' si lo prefieres
    },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        width: '100%',
      },
      button: {
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 8,
        margin: 4,
        alignItems: 'center',
        justifyContent: 'center',
        width: 60, // Ancho fijo para cada botón
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
});

export default UserCardWithButton;
