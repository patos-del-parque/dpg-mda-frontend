// screens/GalleryScreen.tsx
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Animated } from 'react-native';
import UserCard from '../components/UserCard';

const GalleryScreen: React.FC = () => {
  const users = [
    { name: 'Mario Medina Lopez', email: 'juan@example.com' },
    { name: 'Carlos Fernandez Arrabal', email: 'ana@example.com' },
    { name: 'Silvia Fernandez Arrabal', email: 'luis@example.com' },
    { name: 'Alonso Doña Martinez', email: 'alonsodmx@gmail.com' },
  ];

  const [scaleValues] = useState(users.map(() => new Animated.Value(1)));

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
              <UserCard name={user.name} urlPhoto={user.email} estado={0} />
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
    backgroundColor: '#1E3A8A',
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
    width: '40%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
});

export default GalleryScreen;
