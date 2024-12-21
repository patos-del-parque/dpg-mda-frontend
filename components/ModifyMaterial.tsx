import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity, TextInput, StyleSheet, Pressable } from 'react-native';
import { useNavigation, NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import { launchImageLibrary } from 'react-native-image-picker';

// Definir los tipos para los parámetros esperados
interface ModifyMaterialProps {
  ruta: string;
  name: string;
}

const ModifyMaterial: React.FC<ModifyMaterialProps> = ({ ruta, name }) => {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [imagen, setImagen] = useState<string | undefined>(undefined);

  // Lógica para seleccionar una imagen
  const selectImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
    });

    console.log(result);

    if (result.assets && result.assets.length > 0) {
      setImagen(result.assets[0].uri);
    } else {
      console.log('Error', 'Por favor, selecciona una imagen.');
    }
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Lógica para modificar los datos
  const pressModifyButton = async () => {
    const updatedFields: Record<string, any> = {};

    if (nombre) updatedFields.nombre = nombre;
    if (cantidad) updatedFields.cantidad = parseInt(cantidad, 10);
    if (imagen) updatedFields.imagen = imagen;

    try {
      const response = await fetch('https://api.jsdu9873.tech/api/materials/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentName: name, ...updatedFields }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Éxito', 'Material modificado exitosamente');
        setNombre('');
        setCantidad('');
        setImagen('');
        // Regresar a la pantalla anterior (lista de materiales)
        navigation.goBack();
      } else {
        console.log('Error', result.message || 'No se pudo modificar el material.');
      }
    } catch (error) {
      console.log('Error', 'Error al modificar el material.');
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Modificar Datos Material</Text>

      <Text style={styles.label}>Nombre: {name}</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Introduce el nuevo nombre"
      />

      <Text style={styles.label}>Cantidad</Text>
      <TextInput
        style={styles.input}
        value={cantidad}
        onChangeText={setCantidad}
        placeholder="Introduce la nueva cantidad"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={selectImage}>
        <Text style={styles.buttonText}>Seleccionar Imagen del material</Text>
      </TouchableOpacity>

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
    padding: 30, // Aumentar el padding
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    maxWidth: 500, // Aumentar el maxWidth
    margin: 'auto',
    marginTop: -20, // Mantener el margen negativo para moverlo hacia arriba
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    width: '95%', // Aumentar el width
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


export default ModifyMaterial;
