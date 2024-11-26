// src/components/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import { Ionicons } from 'react-native-vector-icons';

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
      <Text style={styles.title}>¿Quién eres?</Text>

      <View style={styles.panelsContainer}>
        <TouchableOpacity onPress={handleRightPanelPress} style={styles.panel}>
          <Ionicons name="people-outline" size={70} color="#fff" />
          <Text style={styles.panelText}>ESTUDIANTES</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleThirdButtonPress} style={styles.panel}>
          <Ionicons name="school-outline" size={70} color="#fff" />
          <Text style={styles.panelText}>PROFESOR</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLeftPanelPress} style={styles.panel}>
          <Ionicons name="person-circle-outline" size={70} color="#fff" />
          <Text style={styles.panelText}>ADMIN</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.floatingButtonsContainer}>
        <TouchableOpacity onPress={handleLeftPanelPress} style={styles.floatingButton}>
          <Text style={styles.floatingButtonText}>Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleThirdButtonPress} style={styles.floatingButtonLeft}>
          <Text style={styles.floatingButtonText}>Profesor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E4E7E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
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
});

export default HomeScreen;
