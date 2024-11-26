import React from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
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
                onPress={() => navigation.navigate('AssignMaterialsRequestsScreen', {name})}
              >
                <Text style={styles.buttonText}>Asignar Tarea Material</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('ModifySkillsScreen', {name})}
              >
                <Text style={styles.buttonText}>Modificar Habilidad</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('ModifyStudent', {name})}
              >
                <Text style={styles.buttonText}>Modificar Estudiante</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('EraseStudent', {name})}
              >
                <Text style={styles.buttonText}>Borrar Estudiante</Text>
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
        /* flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        width: '100%', */
      },
      button: {
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 8,
        margin: 4,
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
});

export default UserCardWithButton;
