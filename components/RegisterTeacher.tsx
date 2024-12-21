import React, { useState } from 'react';
import { View, Text,  TextInput, StyleSheet, Alert, Pressable } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import { Picker } from '@react-native-picker/picker';


interface RegisterTeacherprops {
    ruta: String;
  }
  
  const RegisterTeacher: React.FC<RegisterTeacherprops> = ({ ruta }) => {
  
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
    const pressLoginButton = async () => {
      navigation.navigate(ruta as keyof RootStackParamList);

      try {
        const response = await fetch('https://api.jsdu9873.tech/api/teachers/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, password }),
        });
        const result = await response.json();
        if (response.ok) {
          console.log('Éxito', result.message); 
          console.log(result.message || 'Profesor agregado exitosamente');
        } else {
          console.log('Error', result.message || 'Hubo un problema al agregar al profesor.');
          console.log(result.message || 'Hubo un problema al agregar al profesor.');
        }
      } catch (error) {
        console.log('Error al agregar el profesor');
      }
    };

    const [nombre, setNombre] = useState('');
    const [password, setPasswpord] = useState("");

    return(
        <View style={styles.formContainer}>
            <Text style={styles.title}>Registrar Profesor</Text>
    
            <Text style={styles.label}>Nombre</Text>
            <TextInput style={styles.input} value={nombre} onChangeText={setNombre} placeholder="Introduce el nombre" />
       
            <Text style={styles.label}>Contraseña</Text>
            <TextInput style={styles.input} value={password} onChangeText={setPasswpord} placeholder="Introduce la contraseña" keyboardType="numeric" />
 
            <Pressable style={styles.button} onPress={pressLoginButton}>
            <Text style={styles.buttonText}>Registrar</Text>
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


export default RegisterTeacher;