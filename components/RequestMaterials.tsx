import React, { useState } from 'react';
import { View, Text,  TextInput, StyleSheet, Pressable } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import { Picker } from '@react-native-picker/picker';


interface RequestMaterialsprops {
    ruta: String;
  }
  
  const RequestMaterial: React.FC<RequestMaterialsprops> = ({ ruta }) => {
  
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
    const pressLoginButton = async () => {
      navigation.navigate(ruta as keyof RootStackParamList);

      try {
        const response = await fetch('http://localhost:27017/api/materials', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({Material}),
        });
        const result = await response.json();
        alert(result.message || 'Material solicitado exitosamente');
    } catch (error) {
        alert('Error al solicitar el material');
    }
    };

    const [Material, setMaterial] = useState('');
    const [Cantidad, setCantidad] = useState('');
    const [Clase, setClase] = useState('');


    return(
        <View style={styles.formContainer}>
            <Text style={styles.title}>Solicitar Material</Text>

            <Text style={styles.label}>Clase a donde llevar el material</Text>
            <TextInput style={styles.input} value={Clase} onChangeText={setClase} placeholder="Introduce la clase a donde llevar el material" />
    
            <Text style={styles.label}>Nombre del material</Text>
            <TextInput style={styles.input} value={Material} onChangeText={setMaterial} placeholder="Introduce el nombre del material" />

            <Text style={styles.label}>Cantidad</Text>
            <TextInput style={styles.input} value={Cantidad} onChangeText={setCantidad} placeholder="Introduce la cantidad" />

            <Pressable style={styles.button} onPress={pressLoginButton}>
            <Text style={styles.buttonText}>Solicitar material</Text>
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


export default RequestMaterial;