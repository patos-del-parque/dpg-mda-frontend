import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Pressable } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import { isAnimationTerminatingCalculation } from 'react-native-reanimated/lib/typescript/animation/springUtils';


interface ModifyStudentprops {
    ruta: String;
    name: String;
  }
  
  const ModifyStudent: React.FC<ModifyStudentprops> = ({ ruta, name }) => {
  
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
    const pressModifyButton = async () => {
      
      navigation.navigate(ruta as keyof RootStackParamList);

      const updatedFields: Record<string, any> = {};

      if (nombre) updatedFields.nombre = nombre;
      if (aula) updatedFields.aula = aula;
      if (password) updatedFields.password = password;
      if (avatar) updatedFields.avatar = avatar;
      //if (lectura) updatedFields.lectura = lectura; 
      updatedFields.lectura = lectura; 
      //if (imagen) updatedFields.imagen = imagen;
      updatedFields.imagen = imagen;
      //if (video) updatedFields.video = video;
      updatedFields.video = video;

      try {
        const response = await fetch('https://api.jsdu9873.tech/api/students/update', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ currentName: name, ...updatedFields, }),
        });
        const result = await response.json();
        if (response.ok) {
          setNombre('');
          setAula('');
          setPasswpord('');
          setAvatar('');
          setLectura(false);
          setImagen(false);
          setVideo(false);
          //setComedor(false);
			}
      console.log('Estudiante modificado exitosamente');
      } 
      catch (error) {
        console.log('Error al modificar al estudiante');
      }
    };

    const [nombre, setNombre] = useState('');
    const [aula, setAula] = useState('');
    const [password, setPasswpord] = useState('');
    const [lectura, setLectura] = useState(false);
    const [imagen, setImagen] = useState(false);
    const [video, setVideo] = useState(false);
    const[avatar, setAvatar] = useState('');

    return(
      <View style={styles.formContainer}>
        <Text style={styles.title}>Modificar Datos Estudiante</Text>

        <Text style={styles.label}>Estudiante</Text>

        <Text style={styles.label}>Nombre: {name}</Text>
        <TextInput style={styles.input} value={nombre} onChangeText={setNombre} placeholder="Introduce el nuevo nombre" />

        <Text style={styles.label}>Aula</Text>
        <TextInput style={styles.input} value={aula} onChangeText={setAula} placeholder="Introduce el nuevo curso" />

        <Text style={styles.label}>Tipo de vista</Text>
        <View>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setLectura(!lectura)}
          >
            <View style={[styles.checkbox, lectura && styles.checkboxSelected]} />
            <Text style={styles.checkboxLabel}>Lectura</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setImagen(!imagen)}
          >
            <View style={[styles.checkbox, imagen && styles.checkboxSelected]} />
            <Text style={styles.checkboxLabel}>Imagen</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setVideo(!video)}
          >
            <View style={[styles.checkbox, video && styles.checkboxSelected]} />
            <Text style={styles.checkboxLabel}>Video</Text>
          </TouchableOpacity>

        </View>

        <Text style={styles.label}>Avatar: {name}</Text>
        <TextInput style={styles.input} value={avatar} onChangeText={setAvatar} placeholder="Introduce el nuevo url de avatar" />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput style={styles.input} value={password} onChangeText={setPasswpord} placeholder="Introduce la nueva contraseña" keyboardType="numeric" />

        <Pressable style={styles.button} onPress={pressModifyButton}>
          <Text style={styles.buttonText}>Modificar</Text>
        </Pressable>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 1,
      borderColor: '#004d40',
      marginRight: 10,
      borderRadius: 4,
    },
    checkboxSelected: {
      backgroundColor: '#004d40',
    },
    checkboxLabel: {
      fontSize: 16,
      color: '#004d40',
    },
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


export default ModifyStudent;