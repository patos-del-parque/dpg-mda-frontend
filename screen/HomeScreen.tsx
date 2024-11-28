//Alonso

//Utilizar UserCard componente ya que es el formato de foto texto flecha
//Seria interesante añadirle sombra a las Card o algo
//URGENTE CAMBIAR EL NOMBRE DE COMPONENTE USERCARD NO VALE
//UserCard hay que darle una vuelta no puede ser tan especifico hay que hacerlo
//mas general

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image,ImageBackground } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import { Ionicons } from 'react-native-vector-icons';
import { Icon } from 'react-native-elements';

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

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://www.sjdgranada.es/sites/default/files/imce/GRANADA/Logotipo%20SJD-modified2.png' }}
        style={styles.headerImage}
      />
      <Text style={styles.title}>Selecciona tu Sesión</Text>
      <Icon name="arrow-down" type="feather" color="#77a345" size={54} />
      <View style={styles.panelsContainer}>
        <TouchableOpacity 
            onPress={handleRightPanelPress} 
            style={styles.panel}
        >
            <Ionicons 
              name="people-outline" 
              size={70} 
              color="#fff" 
            />
            <Text style={styles.panelText}>
              ESTUDIANTES
            </Text>
            <Icon
              name="arrow-right-circle"
              type="feather"
              color="#000000"
              size={34}
              onPress={handleRightPanelPress} 
            />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleThirdButtonPress} style={styles.panel}>
          <Ionicons name="school-outline" size={70} color="#fff" />
          <Text style={styles.panelText}>PROFESOR</Text>
          <Icon
            name="arrow-right-circle"
            type="feather"
            color="#000000"
            size={34}
            onPress={handleThirdButtonPress}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLeftPanelPress} style={styles.panel}>
          <Ionicons name="person-circle-outline" size={70} color="#fff" />
          <Text style={styles.panelText}>ADMINISTRADOR</Text>
          <Icon
            name="arrow-right-circle"
            type="feather"
            color="#000000"
            size={34}
            onPress={handleLeftPanelPress}
          />
        </TouchableOpacity>
      </View>
      {/* Nueva imagen en la parte inferior */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
