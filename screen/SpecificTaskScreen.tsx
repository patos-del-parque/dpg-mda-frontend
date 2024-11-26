import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import NumeroMenu from '@/components/NumeroMenu';

// Autor Alonso

type SpecificTaskScreenRouteProp = RouteProp<RootStackParamList, 'SpecificTaskScreen'>;

const SpecificTaskScreen: React.FC = () => {
  const route = useRoute<SpecificTaskScreenRouteProp>();
  const navigation = useNavigation(); // Para manejar la navegación
  const { nombreAula, imageAula } = route.params;

  const prueba = {
    tareas: [
      {
        id: 1,
        title: 'Lavarse los dientes',
        photo: 'https://reactnative.dev/docs/assets/p_cat2.png',
        descripcion: 'Lavarse los dientes con el cepillo y la pasta de dientes',
        pasos: [
          { id: 101, description: 'Paso 1, coger un cepillo', imageUrl: 'https://reactnative.dev/docs/assets/p_cat2.png' },
          { id: 102, description: 'Paso 2, esparcir la pasta de dientes por todo el cabezal', imageUrl: 'https://reactnative.dev/docs/assets/p_cat2.png' },
          { id: 103, description: 'Paso 3, aclaramos con un poco de agua', imageUrl: 'https://reactnative.dev/docs/assets/p_cat2.png' },
          { id: 104, description: 'Paso 4, lavarse los dientes', imageUrl: 'https://reactnative.dev/docs/assets/p_cat2.png' },
          { id: 105, description: 'Paso 5, aclarar con agua y colocar en su sitio el cepillo', imageUrl: 'https://reactnative.dev/docs/assets/p_cat2.png' },
        ],
        estado: 0,
      },
    ],
  };

  const [currentStep, setCurrentStep] = useState(0); // Controla el paso actual
  const totalSteps = prueba.tareas[0].pasos.length;

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Si es el último paso, redirige a la primera página
      navigation.navigate('UserTaskScreen', {taskCompleted:true, nombreAula: nombreAula}); // Asegúrate de que 'HomeScreen' esté definido en tu stack
    
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{nombreAula}</Text>
      <Image style={styles.image} source={{ uri: imageAula }} />

      <View style={styles.stepContainer}>
        <Text style={styles.stepDescription}>{prueba.tareas[0].pasos[currentStep].description}</Text>
        <Image style={styles.image} source={{ uri: prueba.tareas[0].pasos[currentStep].imageUrl }} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleNextStep}>
        <Text style={styles.buttonText}>{currentStep < totalSteps - 1 ? 'Siguiente Paso' : 'Finalizar'}</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover',
    margin: 10,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  stepContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  stepDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SpecificTaskScreen;
