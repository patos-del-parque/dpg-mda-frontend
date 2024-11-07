import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';



const usuario = {
  name: 'Juan Perez',
  necesidad: 2,
  estado: 'Activo',
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
            <Text>{usuario.estado}</Text>
          </TouchableOpacity>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  stepContainer: {
    marginVertical: 8,
  },
  alternativeText: {
    fontSize: 13,
    color: '#777',
    fontStyle: 'italic',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 5,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginVertical: 10,
  },
});

export default TaskCard;
