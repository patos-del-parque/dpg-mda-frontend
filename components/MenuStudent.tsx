/**
 * Componente MenuStudent
 *
 * Este componente muestra una lista de tarjetas con una imagen y titulo. Permite
 * navegar a una pantalla específica cuando se pulsa en la imagen de abajo, y marca las
 * tarjetas como completadas con un ícono de "check".
 *
 * Props:
 * @param {string} ruta - Ruta a la que se debe navegar al pulsar en la imagen de abajo.
 * @param {Array<{ nombreAula: string, imageAula: string }>} datos - Lista de elementos con su nombre e imagen.
 *
 * Navegación:
 * Este componente utiliza React Navigation para navegar entre pantallas.
 *
 * Uso:
 * <MenuStudent ruta="Xpagina" datos={[{ nombreAula: 'Aula 1', imageAula: 'url' }]} />
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import { FontAwesome } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';

interface LoginTextProps {
  ruta: string;
  datos: Array<{
    nombreAula: string;
    imageAula: string;
    pasos: [];
    realizada: boolean;
    taskId: string;
  }>;
  studentId : string;
  idEstudiante : string;
}

type MenuStudentScreenRouteProp = RouteProp<RootStackParamList, 'MenuStudentScreen'>;

const MenuStudent: React.FC<LoginTextProps> = ({ ruta, datos,studentId,idEstudiante }) => {
  // Hook de navegación para cambiar de pantalla
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Hook para acceder a los parámetros de la ruta actual
  const route = useRoute<MenuStudentScreenRouteProp>();
  //const { taskCompleted, nombreAula: completedAula,imageAula,pasos } = route.params || {};
  //const { nombreAula, imageAula, pasos } = route.params;

  //const {nombreAula,imageAula,pasos} = datos[0];
  const studentID = studentId;
  const IDestudiante = idEstudiante;
console.log(`Estoyyy mostrando el studentID:  ${datos[0].realizada}`)
  // Estado para manejar las tareas completadas
  const [completedTasks, setCompletedTasks] = useState<{ [aula: string]: boolean }>({});

  /**
   * Actualiza el estado de tareas completadas cuando los parámetros cambian.
   */
/*   useEffect(() => {
    if (taskCompleted && completedAula && !completedTasks[completedAula]) {
      setCompletedTasks((prev) => ({ ...prev, [completedAula]: true }));
    }
  }, [taskCompleted, completedAula]); */

  /**
   * Navega a la pantalla especificada y pasa los parámetros del elemento seleccionado.
   * @param {string} nombreAula - Nombre del aula.
   * @param {string} imageAula - URL de la imagen del aula.
   */
  const handleCreateTasks = (nombreAula: string, imageAula: string ,pasos: [],taskId:string,IDestudiante: string) => {
    navigation.navigate(ruta, { nombreAula, imageAula,pasos,studentID,taskId,IDestudiante});
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {datos.map((dato, index) => (
          <View key={index} style={styles.row}>
            <View style={styles.aulaCard}>
              <Image source={{ uri: dato.imageAula }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.aulaTitle}>{dato.nombreAula}</Text>
              </View>
              <TouchableOpacity
                style={styles.arrowButton}
                onPress={() => handleCreateTasks(dato.nombreAula, dato.imageAula,dato.pasos,dato.taskId,IDestudiante)}
              >
                <FontAwesome name="arrow-right" size={26} color="#00796b" />
              </TouchableOpacity>
              {dato.realizada && (
                <FontAwesome name="check-circle" size={30} color="green" />
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// Estilos del componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#EDE7F6',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  aulaCard: {
    width: '90%',
    padding: 20,
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 15,
  },
  textContainer: {
    alignItems: 'center',
  },
  aulaTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 8,
  },
  arrowButton: {
    marginTop: 10,
  },
});

export default MenuStudent;
