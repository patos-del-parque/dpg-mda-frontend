import React, { useState, useEffect } from 'react';
import { View, Text,  TextInput, StyleSheet, Alert, Pressable } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import { Picker } from '@react-native-picker/picker';


interface RequestMaterialsprops {
    ruta: String;
  }
  
  const RequestMaterial: React.FC<RequestMaterialsprops> = ({ ruta }) => {

    const [selectedMaterial, setSelectedMaterial] = useState<string>("");
    const [materiales, setMateriales] = useState<any[]>([]);
    const [selectedCantidad, setSelectedCantidad] = useState<string>("1");
    const [Clase, setClase] = useState('');
  
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
    const pressRequestButton = async () => {

      if (!selectedMaterial) {
        Alert.alert("Error Selecciona un material.");
        return;
      }

      if (!selectedCantidad) {
        Alert.alert("Error", "Selecciona cantidad de material a pedir.");
        return;
      }

      const parsedCantidad = parseInt(selectedCantidad, 10);

      try {
        const response = await fetch('https://api.jsdu9873.tech/api/materials-request/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({clase: Clase, nombre: selectedMaterial, cantidad: parsedCantidad})
        });
        const result = await response.json();
        if (response.ok) {
          console.log('Éxito', result.message); 
          console.log(result.message || 'Solicitud de material agregada exitosamente');
          navigation.navigate(ruta as keyof RootStackParamList);
        } else {
          console.log('Error', result.message || 'Hubo un problema al agregar la solicitud de material.');
          console.log(result.message ||  'Hubo un problema al agregar la solicitud de material.');
        }
    } catch (error) {
      console.error(error);
      console.log('Error', 'No se pudo conectar con el servidor.');
      console.log('No se pudo conectar con el servidor.');
    }
    };

    const fetchMateriales = async () => {
      try {
        const response = await fetch("https://api.jsdu9873.tech/api/materials/get", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
  
        const result = await response.json();
        if (response.ok) {
          const materialesProcesados = result.materials.map(
            (material: { _id: string; nombre: string; cantidad: Number; imagen: string}) => ({
              id: material._id,
              nombre: material.nombre,
              cantidad: material.cantidad,
              imagen: material.imagen
            })
          );
          setMateriales(materialesProcesados);
        } else {
          console.log(
            "Error",
            result.message || "Hubo un problema al obtener los materiales."
          );
        }
      } catch (error) {
        console.log("Error", "No se pudo obtener la lista de materiales.");
      }
    };

    useEffect(() => {
      fetchMateriales();
    }, []);

  // Obtener la cantidad máxima del material seleccionado
  const material = materiales.find((material) => material.nombre === selectedMaterial);
  const maxCantidad = material?.cantidad || 1;

    return(
        <View style={styles.formContainer}>
            <Text style={styles.title}>Solicitar Material</Text>

            <Text style={styles.label}>Clase a donde llevar el material</Text>
            <TextInput style={styles.input} value={Clase} onChangeText={setClase} placeholder="Introduce el número de la clase" />
    
            <Text style={styles.label}>Material</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedMaterial}
                onValueChange={(itemValue) => setSelectedMaterial(itemValue)
                }
                style={styles.picker}
              >
                {materiales.map((material) => (
                  <Picker.Item
                    key={material.id}
                    label={material.nombre}
                    value={material.nombre}
                    color="#004d40"
                  />
                ))}
              </Picker>
            </View>

            <Text style={styles.label}>Cantidad</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedCantidad}
                onValueChange={(itemValue) => setSelectedCantidad(itemValue)}
                style={styles.picker}
                //enabled={!!selectedMaterial} // Desactivar si no hay material seleccionado
              >
                {Array.from({ length: maxCantidad }, (_, index) => index + 1).map(
                            (cantidad) => (
                              <Picker.Item
                                key={cantidad}
                                label={cantidad.toString()}
                                value={cantidad}
                                color="#004d40"
                              />
                            )
                )}
              </Picker>
            </View>
            
            <Pressable style={styles.button} onPress={pressRequestButton}>
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