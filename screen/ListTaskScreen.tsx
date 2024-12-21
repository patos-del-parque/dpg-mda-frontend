import React, { useState, useEffect  } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import { Card } from 'react-native-elements';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  FlatList,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';

// Definición de interfaces
interface Step {
  name: string;
  description: string;
  imageUri?: string;
}

interface Task {
  _id: string,
  nombre: string;
  fechaCreacion: string; // Usar string porque los datos de la API suelen ser fechas en formato ISO
  imagenTarea: string;
  pasos: Step[];
}

//cambiar nombre
// Componente de tarjeta para mostrar cada tarea
const TaskCard: React.FC<{ task: Task; onDelete: (id: string) => void }> = ({ task, onDelete  }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const goToEditTaskScreen = (taskNameOriginal: string) => {
    navigation.navigate('EditTaskScreen', { taskNameOriginal }); // Solo pasas el id
  };

  return (
    <View style={styles.card}>
      <Image
        style={styles.image}
        source={{
          uri: task.imagenTarea || 'https://via.placeholder.com/150', // Imagen por defecto si no hay imagenTarea
        }}
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{task.nombre}</Text>
        <Text style={styles.cardSubtitle}>Fecha: {new Date(task.fechaCreacion).toLocaleDateString()}</Text>
        <Text style={styles.cardSubtitle}>Pasos: {task.pasos.length}</Text>
        <Card.Divider />

            {task.pasos.map((paso) => (
              <View key={paso.name} style={styles.stepContainer}>
                <Text style={styles.cardSubtitle}>{paso.name}</Text>
                <Text style={styles.alternativeText}>Texto: {paso.description}</Text>
                <Image
                  style={styles.image}
                  source={{
                    uri: paso.imageUri || 'https://via.placeholder.com/150', // Imagen por defecto si no hay imagenTarea
                  }}
                />
                <View style={styles.divider} />
              </View>
            ))}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.editButton} onPress={() => goToEditTaskScreen(task.nombre)}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(task._id)}>
            <Text style={styles.buttonText}>Borrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const ListStudentScreen: React.FC = () => {
  const windowWidth = Dimensions.get('window').width;
  const [tasks, setTasks] = useState<Task[]>([]);

  // Función para obtener los datos de la API
  const fetchTasks = async () => {
    try {
      const response = await fetch('https://api.jsdu9873.tech/api/tasks/get', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();
      if (response.ok) {
        setTasks(result.tasks);
      } else {
        console.log('Error', result.message || 'Hubo un problema al obtener las tareas.');
      }
    } catch (error) {
      console.log('Error', 'No se pudo obtener la lista de tareas.');
    }
  };

  const deleteTaskAssign = async (taskID: string ) => {
    try {
      const response = await fetch(`https://api.jsdu9873.tech/api/student-tasks/delete/${taskID}`, {
        method: 'DELETE',
      });
  
      const result = await response.json();

      if (response.ok) {
        console.log('Éxito', result.message);
      } else {
        console.log('Error', result.message || 'No se pudo eliminar la tarea.');
      }
      

    } catch (error) {
      console.log('Error', 'Hubo un problema al eliminar la tarea.');
    }
  }

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const deleteTask = async (taskId: string) => {
    
    try {
      const response = await fetch(`https://api.jsdu9873.tech/api/tasks/delete/${taskId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      deleteTaskAssign(taskId);

      if (response.ok) {
        console.log('Éxito', result.message);
        setTasks(tasks.filter(task => task._id !== taskId));

      } else {
        console.log('Error', result.message || 'No se pudo eliminar la tarea.');
      }
      fetchTasks();
    } catch (error) {
      console.log('Error', 'Hubo un problema al eliminar la tarea.');
    }

    navigation.navigate('ListTaskScreen');
  };


  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tareas</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item)=> item._id}
        renderItem={({ item }) => (
          <TaskCard
          task={item} onDelete={deleteTask}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderColor: '#000000',  // Color del borde
    borderWidth: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 20,
    color: '#666',
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  stepContainer: {
    marginVertical: 10,
    padding: 10,
    fontSize: 20,
    backgroundColor: '#f1f1f1', // Fondo gris claro para pasos
    borderRadius: 8, // Bordes redondeados para pasos
    borderColor: '#000000',  // Color del borde
    borderWidth: 1,
  },
  alternativeText: {
    fontSize: 20,
    color: '#555',
    fontStyle: 'italic',
    textAlign: 'center', // Centrar texto
    marginTop: 5,
  },  
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 10,
  },
});

export default ListStudentScreen;
