import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const StepsComponent = () => {
  const route = useRoute(); // Obtiene los parámetros pasados a esta pantalla
  const navigation = useNavigation(); // Para manejar la navegación

  const { nombreAula, imageAula, pasos, studentID,taskId,IDestudiante } = route.params;

  /*const [IDestudiante, setIDestudiante] = useState('');
  const [taskID, settaskID] = useState('');*/
  /*const [password, setPasswpord] = useState('');
  const [lectura, setLectura] = useState(false);
  const [imagen, setImagen] = useState(false);
  const [video, setVideo] = useState(false);
  const[avatar, setAvatar] = useState('');*/

  const markTaskAsDone = async (IDestudiante: string, taskId: string) => {
    const url = `https://api.jsdu9873.tech/api/student-tasks/mark-as-done/${IDestudiante}/${taskId}`;
    
    try {
        const response = await fetch(url, {
            method: 'PUT',  // Usamos PUT porque estás actualizando datos
            headers: {
                'Content-Type': 'application/json',  // Tipo de contenido que estás enviando
            },
            // Si necesitas enviar datos, puedes agregarlos aquí (aunque no es necesario para tu caso)
            body: JSON.stringify({
                // En este caso, no estamos enviando datos adicionales, pero se pueden agregar
            }),
        });

        // Comprobar si la respuesta fue exitosa
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error:', errorData.message);
            throw new Error(errorData.message);
        }

        const data = await response.json();
        console.log('Tarea marcada como realizada:', data.assignment);
        // Puedes hacer algo con la respuesta aquí, por ejemplo actualizar el estado
    } catch (error) {
        console.error('Error al marcar la tarea:', error);
        console.log(`${IDestudiante} yyyyy ${taskId}`)
    }
};


  if (!pasos || pasos.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>No hay pasos disponibles</Text>
      </View>
    );
  }

  const [currentStep, setCurrentStep] = useState(0); // Controla el paso actual

  const handleNextStep = () => {
    if (currentStep < pasos.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Si es el último paso, redirige a otra pantalla
      //marcar como completado
      markTaskAsDone(IDestudiante,taskId );
      navigation.navigate('UserTaskScreen', {name : studentID});
    }
  };

  return (
    <View style={styles.container}>
      {/* Información general del aula */}
      <Text style={styles.title}>{nombreAula}</Text>
      <Image source={{ uri: imageAula }} style={styles.image} />

      {/* Paso actual */}
      <View style={styles.stepContainer}>
        <Image source={{ uri: pasos[currentStep].imageUri }} style={styles.stepImage} />
        <View style={styles.stepDetails}>
          <Text style={styles.stepName}>{pasos[currentStep].name}</Text>
          <Text style={styles.stepDescription}>{pasos[currentStep].description}</Text>
        </View>
      </View>

      {/* Botón para avanzar al siguiente paso */}
      <TouchableOpacity style={styles.button} onPress={handleNextStep}>
        <Text style={styles.buttonText}>
          {currentStep < pasos.length - 1 ? 'Siguiente Paso' : 'Finalizar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#EDE7F6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  stepContainer: {
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stepImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  stepDetails: {
    alignItems: 'center',
  },
  stepName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  stepDescription: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
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
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default StepsComponent;
