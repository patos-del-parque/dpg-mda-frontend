import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, Animated, Alert } from 'react-native';
import UserCard from '../components/UserCard';

const GalleryScreen: React.FC = () => {
  const [users, setUsers] = useState<{ name: string; aula: string; lectura: boolean,imagen: boolean,video: boolean; }[]>([]);
  const [scaleValues, setScaleValues] = useState<Animated.Value[]>([]);

  const handleMouseEnter = (index: number) => {
    Animated.spring(scaleValues[index], {
      toValue: 1.1,
      useNativeDriver: true,
    }).start();
  };

  const handleMouseLeave = (index: number) => {
    Animated.spring(scaleValues[index], {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    // Función para obtener los datos de la API
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://api.jsdu9873.tech/api/students/get', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        if (response.ok) {
          const nombres = result.students.map((student: { nombre: string; aula: string,lectura: boolean,imagen: boolean,video:boolean }) => ({
            name: student.nombre,
            aula: student.aula,
            lectura: student.lectura,
            imagen: student.imagen,
            video: student.video,
          }));
          setUsers(nombres); // Actualizamos el estado con los nombres obtenidos
          setScaleValues(nombres.map(() => new Animated.Value(1))); // Creamos las animaciones para cada usuario
        } else {
          Alert.alert('Error', result.message || 'Hubo un problema al obtener los estudiantes.');
        }
      } catch (error) {
        Alert.alert('Error', 'No se pudo obtener la lista de estudiantes.');
      }
    };

    fetchUsers();
  }, []); // Se ejecuta solo al montar el componente

  return (
    <View style={styles.container}>
      <View style={styles.gradient}>
        <Text style={styles.title}>Estudiantes</Text>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {users.map((user, index) => (
            <Animated.View
              key={index}
              style={[styles.card, { transform: [{ scale: scaleValues[index] }] }]}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <UserCard name={user.name} urlPhoto={"https://reactnative.dev/docs/assets/p_cat2.png"} estado={0} lectura={user.lectura} imagen={user.imagen} video={user.video} />
            </Animated.View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#11388e',
  },
  gradient: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 16,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    shadowColor: '#60A5FA',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  scrollContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    alignSelf: 'center', // Se adapta automáticamente al contenido.
  },
});

export default GalleryScreen;
