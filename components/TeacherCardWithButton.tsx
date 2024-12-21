import React, { useState } from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';

type TeacherCardWithButtonProps = {
    name: string;
    urlPhoto: string;
};

const TeacherCardWithButton: React.FC<TeacherCardWithButtonProps> = ({ name, urlPhoto}) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    return (
        <View style={styles.card}>
            <Text style={styles.name}>{name}</Text>
            <Image
              source={{ uri: urlPhoto }} // Usa la URL de la imagen pasada como prop
              style={styles.image}
            />
            <View style={styles.buttonContainer}>
{/*               <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('AssignMaterialsRequestsScreen', {name})}
              >
                <Text style={styles.buttonText}>Asignar Tarea Material</Text>
              </TouchableOpacity> */}

{/*               <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('ModifySkillsScreen', {name})}
              >
                <Text style={styles.buttonText}>Modificar Habilidad</Text>
              </TouchableOpacity> */}

{              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('ModifyTeacher', {name})}
              >
                <Text style={styles.buttonText}>Modificar Profesor</Text>
              </TouchableOpacity>}

              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('EraseTeacher', {name})}
              >
                <Text style={styles.buttonText}>Borrar Profesor</Text>
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
        borderColor: '#000000',  // Color del borde
        borderWidth: 2,
      },
      name: {
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

export default TeacherCardWithButton;
