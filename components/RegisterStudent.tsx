import React, { useState } from 'react';
import { View, Text,  TextInput, StyleSheet, Alert, Pressable } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import CheckBox from '@react-native-community/checkbox';

interface RegisterStudentprops {
    ruta: String;
  }

  
  const RegisterStudent: React.FC<RegisterStudentprops> = ({ ruta }) => {
  
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
    const pressLoginButton = async () => {
      navigation.navigate(ruta as keyof RootStackParamList);

      try {
        const response = await fetch('https://api.jsdu9873.tech/api/students/add-student', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, apellidos, edad: parseInt(edad) ,aula, password }),
        });
        const result = await response.json();
        if (response.ok) {
          Alert.alert('Éxito', result.message); 
        } else {
          Alert.alert('Error', result.message || 'Hubo un problema al agregar el estudiante.');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'No se pudo conectar con el servidor.');
      }
    };

    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [edad, setEdad] = useState('');
    const [aula, setAula] = useState('');
    const [password, setPasswpord] = useState("");
    const [lectura, setLectura] = useState(false);
    const [imagen, setImagen] = useState(false);
    const [video, setVideo] = useState(false);


    return(
        <View style={styles.formContainer}>
            <Text style={styles.title}>Registrar Estudiante</Text>
    
            <Text style={styles.label}>Nombre</Text>
            <TextInput style={styles.input} value={nombre} onChangeText={setNombre} placeholder="Introduce el nombre" />
    
            <Text style={styles.label}>Apellidos</Text>
            <TextInput style={styles.input} value={apellidos} onChangeText={setApellidos} placeholder="Introduce los apellidos" />
    
            <Text style={styles.label}>Aula</Text>
            <TextInput style={styles.input} value={aula} onChangeText={setAula} placeholder="Introduce el curso" />
    
            <Text style={styles.label}>Edad</Text>
            <TextInput style={styles.input} value={edad} onChangeText={setEdad} placeholder="Introduce la edad" keyboardType="numeric" />

           {/*  <Text style={styles.label}>Lectura</Text>
            <CheckBox
              value={lectura}
              onValueChange={setLectura}
              tintColors={{ true: '#00f', false: '#f00' }} 
            />
            <Text style={styles.label}>Imagen</Text>
            <CheckBox
              value={imagen}
              onValueChange={setImagen}
              tintColors={{ true: '#00f', false: '#f00' }} 
            />
            <Text style={styles.label}>Video</Text>
            <CheckBox
              value={video}
              onValueChange={setVideo}
              tintColors={{ true: '#00f', false: '#f00' }} 
            />  */}

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
  });


export default RegisterStudent;