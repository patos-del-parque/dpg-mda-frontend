// src/components/HomeScreen.tsx
import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLeftPanelPress = () => {
    navigation.navigate('LoginAdmin');
  };

  const handleRightPanelPress = () => {
    navigation.navigate('Galeria'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Colegio San Rafael</Text>
      <View style={styles.panelsContainer}>
        <TouchableOpacity onPress={handleRightPanelPress} style={styles.rightPanel}>
          <Image source={{ uri: 'https://reactnative.dev/docs/assets/p_cat2.png' }} style={styles.placeholderImage} />
          <Text style={styles.text}>ESTUDIANTES</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleLeftPanelPress} style={styles.floatingButton}>
        <Text style={styles.text}>Admin</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  panelsContainer: {
    flex: 1,
    flexDirection: 'row', // Cambia a disposición horizontal
  },
  rightPanel: {
    flex: 1,
    backgroundColor: '#44f675',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#447ff6',
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Para sombra en Android
    shadowColor: '#000', // Para sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  placeholderImage: {
    width: 100,
    height: 100,
    opacity: 0.3,
  },
});

export default HomeScreen;
