import React, { useState } from 'react';
import { View, Text,  TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';


interface EraseStudentprops {
    ruta: String;
    name: String;
  }
  
const EraseStudent: React.FC<EraseStudentprops> = ({ ruta, name }) => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const pressButton = async () => {
    navigation.navigate(ruta as keyof RootStackParamList);
    //const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    try {
      const response = await fetch('https://api.jsdu9873.tech/api/students/delete', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({nombre: name}),
      });
      const result = await response.json();
      if (response.ok) {
        Alert.alert('Éxito', result.message); 
        alert(result.message || 'Profesor dado de baja exitosamente');
      } else {
        Alert.alert('Error', result.message || 'Hubo un problema al dar de baja al profesor.');
        alert(result.message || 'Hubo un problema al dar de baja al profesor.');
      }
  } catch (error) {
      alert('Error al dar de baja al profesor');
  }
  };

    return(
        <View style={styles.formContainer}>
            <Text style={styles.title}>Dar de baja Estudiante</Text>
    
            <Text style={styles.label}>Estudiante: {name}</Text>
    
            <Pressable style={styles.button} onPress={pressButton}>
            <Text style={styles.buttonText}>Dar de baja</Text>
            </Pressable>
        </View>
    );
  };
  
  const styles = StyleSheet.create({
    formContainer: {
      padding: 20,
      backgroundColor: '#f0f9ff',
      borderRadius: 12,
      maxWidth: 400,
      margin: 'auto',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
      width: '90%',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#00796b',
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      color: '#004d40',
      alignSelf: 'flex-start',
      marginBottom: 5,
    },
    input: {
      height: 45,
      width: '100%',
      borderColor: '#80cbc4',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 15,
      fontSize: 16,
    },
    button: {
      backgroundColor: '#007BFF',
      paddingVertical: 12,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 10,
      width:'100%'
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    pickerContainer: {
      height: 40,
      width: '100%',
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 15,
      justifyContent: 'center',
      
    },
    picker: {
      width: '100%',
      height: 42,
      borderRadius: 8,
      backgroundColor: '#e0f7fa',
      color: '#004d40',
    },
  });


export default EraseStudent;