import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, ActivityIndicator, Image, Alert, Pressable } from 'react-native';
import useFetchData from '@/hooks/useFetchData';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';

const SeeRequestMaterialScreen: React.FC = () => {
  const route = useRoute();
  const name = route.params; // Usamos el parámetro de la ruta
  let refrescar = 0;
  // Estado para los materiales solicitados
  const [materialsRequested, setMaterialsRequested] = useState<{ clase: string; nombre: string; cantidad: number; imagen: string }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado para controlar la carga de datos
  const [isError, setIsError] = useState<boolean>(false); // Estado para manejar errores

  // URL para obtener los materiales solicitados
  const urlSolicitados = `https://api.jsdu9873.tech/api/materials-request/get`;

  // Función para obtener los materiales solicitados
  const fetchMaterialsRequested = async () => {
    setIsLoading(true);
    setIsError(false); // Resetear error al hacer la solicitud
    try {
      const response = await fetch(urlSolicitados);
      const data = await response.json();

      if (response.ok && data && data.materialsRequest) {
        setMaterialsRequested(data.materialsRequest); // Actualiza los materiales solicitados
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true); // Si ocurre un error en la solicitud, establece isError como true
    } finally {
      setIsLoading(false); // Finaliza la carga
    }
  };

  // Llamar a la función al cargar el componente
  useEffect(() => {
    fetchMaterialsRequested();
  }, []);

  const ruta = 'MaterialsScreen';
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Función para manejar la eliminación de un material solicitado
  const pressButton = async (nombre: string) => {
    refrescar=refrescar+1;
    //navigation.navigate(ruta as keyof RootStackParamList);
    try {
      // Llamada a la API para eliminar el material solicitado
      const response = await fetch('https://api.jsdu9873.tech/api/materials-request/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre }), // Enviar nombre del material solicitado
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Éxito', result.message);
        setMaterialsRequested((prev) => prev.filter((material) => material.nombre !== nombre)); // Actualiza la lista después de la eliminación
      } else {
        console.log('Error', result.message || 'Hubo un problema al eliminar el material solicitado.');
      }
    } catch (error) {
      console.log('Error al eliminar material solicitado');
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : isError ? (
        <Text style={styles.errorText}>Hubo un error al cargar los materiales solicitados.</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Verifica si listaMaterialesSolicitados es un arreglo y tiene elementos */}
          {Array.isArray(materialsRequested) && materialsRequested.length > 0 ? (
            materialsRequested.map((material, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.name}>{material.nombre}</Text>
                <Text style={styles.clase}>Clase: {material.clase}</Text>
                <Text style={styles.cantidad}>Cantidad solicitada: {material.cantidad}</Text>
                <Image source={{ uri: material.imagen }} style={styles.image} resizeMode="contain" />

                <Pressable style={styles.button} onPress={() => pressButton(material.nombre)}>
                  <Text style={styles.buttonText}>Eliminar</Text>
                </Pressable>
              </View>
            ))
          ) : (
            <Text>No hay materiales solicitados disponibles.</Text>
          )}
        </ScrollView>
      )}
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
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    paddingVertical: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clase: {
    fontSize: 16,
    color: '#555',
  },
  cantidad: {
    fontSize: 16,
    color: '#555',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default SeeRequestMaterialScreen;


