import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import { ActiveCursor } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon';

const usuario = {
  name: 'Juan Perez',
  necesidad: 2,
};


interface Paso {
  id: number;
  description: string;
  imageUrl: string;
}

interface Tarea {
  id: number;
  title: string;
  descripcion: string;
  pasos: Paso[];
  estado: number;
  photo: string;
}

interface TaskCardProps {
  prueba: {
    tareas: Tarea[];
  };
}


const TaskCard: React.FC = ({prueba}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate('LoginStudentDefault');
  };

  return (
    <View style={styles.container}>
      {prueba.tareas.map((tarea) => (
        <Card key={tarea.id} containerStyle={styles.card}>
          <TouchableOpacity onPress={handlePress}>
            <Card.Title>{tarea.title}</Card.Title>
            <Text style={styles.description}>{tarea.descripcion}</Text>
            <Image source ={{ uri: tarea.photo}} style={styles.image} />
            <Card.Divider />

            {tarea.pasos.map((paso) => (
              <View key={paso.id} style={styles.stepContainer}>
                <Text>{paso.description}</Text>
                {usuario.necesidad <= 1 && (
                  <Text style={styles.alternativeText}>Texto: {paso.description}</Text>
                )}
                {usuario.necesidad <= 2 && (
                  <Image source={{ uri: paso.imageUrl }} style={styles.image} />
                )}
                {usuario.necesidad === 3 && <Text>Aquí iría el video</Text>}
                <View style={styles.divider} />
              </View>
            ))}
            <Text>{tarea.estado}</Text>
          </TouchableOpacity>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9', // Fondo claro para destacar las tarjetas
  },
  card: {
    borderRadius: 12, // Bordes redondeados
    shadowColor: '#000', // Sombra
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, // Sombra en Android
    padding: 16, // Espaciado interno
    backgroundColor: '#fff', // Fondo blanco para las tarjetas
    marginBottom: 15, // Espaciado entre tarjetas
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center', // Texto centrado
    fontWeight: 'bold', // Destacar descripción
  },
  stepContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f1f1f1', // Fondo gris claro para pasos
    borderRadius: 8, // Bordes redondeados para pasos
  },
  alternativeText: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    textAlign: 'center', // Centrar texto
    marginTop: 5,
  },
  image: {
    width: 120,
    height: 120,
    marginTop: 10,
    borderRadius: 8, // Bordes redondeados para imágenes
    alignSelf: 'center', // Centrar imagen
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 10,
  },
  estadoText: {
    fontSize: 14,
    color: '#007BFF', // Color azul para el estado
    textAlign: 'center', // Centrar texto
    fontWeight: '600', // Resaltar texto del estado
  },
});

export default TaskCard;
