import { RootStackParamList } from '@/navigation/StackNavigator';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'; 

const RegisterMaterialScreen: React.FC<{}> = () => {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [imagen, setImagen] = useState<string | undefined>(undefined);

  const selectImage = async () => {
		const result = await launchImageLibrary({
			mediaType: 'photo',
			includeBase64: false,
		});

		console.log(result);

		if (result.assets && result.assets.length > 0) {
			setImagen(result.assets[0].uri);
			//setImageUriTask("./ruta/por/defecto/tarea");
		} else {
			console.log('Error', 'Por favor, selecciona una imagen.');
		}
  	};

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const ruta = 'MaterialsScreen';

  const handleConfirm = async () => {

    navigation.navigate(ruta as keyof RootStackParamList);

    // Validar campos vacíos
    if (!nombre || !cantidad || !imagen) {
      console.log('Error', 'Por favor, completa todos los campos.');
      return;
    }

    // Validar cantidad como número positivo
    const parsedCantidad = parseInt(cantidad, 10);
    if (isNaN(parsedCantidad) || parsedCantidad < 0) {
      console.log('Error', 'La cantidad debe ser un número positivo.');
      return;
    }

    // Construir objeto del material
    const materialData = {
      nombre: nombre.trim(),
      cantidad: parsedCantidad,
      imagen: imagen.trim(),
    };

    console.log('Enviando datos:', materialData);

    try {
      const response = await fetch('https://api.jsdu9873.tech/api/materials/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(materialData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Éxito', result.message || 'Material agregado exitosamente');
        // Resetear campos
        setNombre('');
        setCantidad('');
        setImagen(undefined);
      } else {
        console.log('Error', result.message || 'Hubo un problema al agregar el material.');
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      console.log('Error', 'No se pudo conectar con el servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Material</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del material"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Cantidad"
        value={cantidad}
        onChangeText={setCantidad}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={selectImage}>
          <Text style={styles.buttonText}>Seleccionar Imagen del material</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
});

export default RegisterMaterialScreen;
