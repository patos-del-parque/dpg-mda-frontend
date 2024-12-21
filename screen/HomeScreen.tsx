//Alonso

//Utilizar UserCard componente ya que es el formato de foto texto flecha
//Seria interesante añadirle sombra a las Card o algo
//URGENTE CAMBIAR EL NOMBRE DE COMPONENTE USERCARD NO VALE
//UserCard hay que darle una vuelta no puede ser tan especifico hay que hacerlo
//mas general

import React, { useRef, useState } from 'react';
import { Animated, View, Text, StyleSheet, TouchableOpacity, Image,ImageBackground } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import { Ionicons } from 'react-native-vector-icons';
import { Icon } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLeftPanelPress = () => {
    navigation.navigate('LoginAdmin');
  };

  const handleRightPanelPress = () => {
    navigation.navigate('Galeria');
  };

  const handleThirdButtonPress = () => {
    navigation.navigate('LoginTeacher');
  };

  const scaleAdmin = useRef(new Animated.Value(1)).current;
  const scaleTeacher = useRef(new Animated.Value(1)).current;
  const scaleStudent = useRef(new Animated.Value(1)).current;


  const animateScale = (scaleRef: Animated.Value, toValue: number) => {
    Animated.timing(scaleRef, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://hospital-sanjuandedios.es/wp-content/uploads/2022/05/GRANADA-SJD.png' }}
        style={styles.headerImage}
      />

      {/* Botones pequeños para PROFESOR y ADMINISTRADOR */}
      <View style={styles.smallPanelsContainer}>
        <Animated.View
          style={[styles.roundButton2, { transform: [{ scale: scaleTeacher }] }]}
          onMouseEnter={() => animateScale(scaleTeacher, 1.1)}
          onMouseLeave={() => animateScale(scaleTeacher, 1)}
        >
          <TouchableOpacity 
            onPress={handleThirdButtonPress} 
            style={styles.roundButton2}
          >
          <FontAwesome5 name="chalkboard-teacher" size={40} color="#fff" />
          <Text style={styles.roundButtonText}>PROFESOR</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[styles.roundButton, { transform: [{ scale: scaleAdmin }] }]}
          onMouseEnter={() => animateScale(scaleAdmin, 1.1)}
          onMouseLeave={() => animateScale(scaleAdmin, 1)}
        >
          <TouchableOpacity 
            onPress={handleLeftPanelPress} 
            style={styles.roundButton}
          >
            <FontAwesome5 name="user-cog" size={40} color="#fff" />
            <Text style={styles.roundButtonText}>ADMIN</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <Text style={styles.title}>Selecciona tu Sesión</Text>
      <Icon name="arrow-down" type="feather" color="#77a345" size={74} />
      
      <Animated.View
        style={[styles.largePanel, { transform: [{ scale: scaleStudent }] }]}
        onMouseEnter={() => animateScale(scaleStudent, 1.05)}
        onMouseLeave={() => animateScale(scaleStudent, 1)}
      >
      <TouchableOpacity 
        onPress={handleRightPanelPress} 
        style={styles.largePanel}
      >
        <FontAwesome5 name="user-graduate"
          size={100} 
          color="#fff" 
        />
        
        <Text style={styles.panelTextLarge}>ESTUDIANTES</Text>
        
      </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  largePanel: {
    width: 1800,
    height: 300,
    backgroundColor: '#447ff6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    marginBottom: 20, // Espaciado respecto a los botones pequeños
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  roundButton: {
    backgroundColor: '#447ff6',
    width: 90, // Tamaño del botón
    height: 90, // Tamaño del botón
    borderRadius: 30, // Hace que sea redondo
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  roundButton2: {
    backgroundColor: '#447ff6',
    width: 90, // Tamaño del botón
    height: 90, // Tamaño del botón
    borderRadius: 30, // Hace que sea redondo
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  roundButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5, // Espaciado entre el icono y el texto
  },
  panelTextLarge: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  smallPanelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  
  container: {
    flex: 1,
    backgroundColor: '#EDE7F6',
    alignItems: 'center',
  },
  headerImage: {
    width: '20%',
    height: 100, // Ajusta la altura según tus necesidades
    resizeMode: 'contain',
    marginBottom: 20, // Espaciado debajo de la imagen
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 30,
    textAlign: 'center',
  },
  panelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 30,
  },
  panel: {
    flex: 1,
    backgroundColor: '#447ff6',
    borderRadius: 20,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  panelText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  floatingButtonsContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  floatingButton: {
    backgroundColor: '#FF6F61',
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  floatingButtonLeft: {
    backgroundColor: '#4CAF50',
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  floatingButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});


export default HomeScreen;
