import React, { useState } from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';

type UserCardWithButtonProps = {
    name: string;
    aula: string;
    urlPhoto: string;
    lectura:boolean;
    imagen:boolean;
    video:boolean;
};

const UserCardWithButton: React.FC<UserCardWithButtonProps> = ({ name, aula, urlPhoto, lectura, imagen, video}) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    const [comedor, setComedor] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null); 

    const handleComedorAssignment = (name: string) => {
      setComedor(true); // Cambiamos el estado de "Comedor" a true
      setSelectedStudentId(name); // Guardamos el ID del alumno
      console.log('Comedor activado para el estudiante con ID:', name);
    };

    return (
        <View style={styles.card}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.aula}>{"Aula: " + aula}</Text>
            <Text style={styles.aula}>{"Lectura: " + (lectura ? "sí" : "no")}</Text>
            <Text style={styles.aula}>{"Imagen: " + (imagen ? "sí" : "no")}</Text>
            <Text style={styles.aula}>{"Vídeo: " + (video ? "sí" : "no")}</Text>
            
            <Image
              source={{ uri: urlPhoto }} // Usa la URL de la imagen pasada como prop
              style={styles.image}
            />
            <View style={styles.buttonContainer}>

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
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('AssignTaskScreen', {name})}
              >
                <Text style={styles.buttonText}>Asignar Tarea</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleComedorAssignment(name)}              >
                <Text style={styles.buttonText}>Asignar Tarea Comedor</Text>
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
      aula: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
      }, 
      image: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        borderRadius: 50,
        resizeMode: 'cover',
        borderWidth: 2,
        borderColor: '#3498DB',
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
