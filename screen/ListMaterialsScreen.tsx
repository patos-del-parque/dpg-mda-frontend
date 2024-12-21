import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, ActivityIndicator, Image, Button, Alert, Pressable, TouchableOpacity } from 'react-native';
import useFetchData from '@/hooks/useFetchData';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';

const ListMaterialScreen: React.FC = () => {
  const route = useRoute();
  const name = route.params;

  const [materials, setMaterials] = useState<{ nombre: string; cantidad: number; foto: string }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Nueva variable de estado para controlar el loading
  const url = `https://api.jsdu9873.tech/api/materials/get`;

  // Función para obtener los materiales
  const fetchMaterials = async () => {
    setIsLoading(true); // Activa el indicador de carga
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok && data && data.materials) {
        setMaterials(data.materials); // Actualiza los materiales
      } else {
        console.log('No se pudieron cargar los materiales');
      }
    } catch (error) {
      console.log('Error al obtener los materiales');
    } finally {
      setIsLoading(false); // Desactiva el indicador de carga
    }
  };

  // Llamar a la función al cargar el componente
  useEffect(() => {
    fetchMaterials();
  }, []);

  const ruta = 'MaterialsScreen';
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Función para eliminar un material
  const pressButton = async (nombre: string) => {
    

    try {
      const response = await fetch('https://api.jsdu9873.tech/api/materials/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre }),
      });
      const result = await response.json();
      if (response.ok) {
        console.log(result.message || 'Material eliminado');
        setMaterials((prev) => prev.filter((material) => material.nombre !== nombre));
      } else {
        console.log('Error', result.message || 'Hubo un problema al eliminar el material.');
        console.log(result.message || 'Hubo un problema al eliminar el material.');
      }
      fetchMaterials();
    } catch (error) {
      console.log('Error al eliminar material');
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {materials.map((material, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.name}>{material.nombre}</Text>
              <Text style={styles.cantidad}>Cantidad: {material.cantidad}</Text>
              <Image source={{ uri: material.imagen }} style={styles.image} resizeMode="contain" />

              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ModifyMaterial', { name: material.nombre })}>
                <Text style={styles.buttonText}>Modificar Material</Text>
              </TouchableOpacity>

              <Pressable style={styles.button} onPress={() => pressButton(material.nombre)}>
                <Text style={styles.buttonText}>Borrar</Text>
              </Pressable>
            </View>
          ))}
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
});

export default ListMaterialScreen;

