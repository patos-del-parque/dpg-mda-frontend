import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type AulaCardProps = {
  nombreAula: string;
  image: string;
  onPress: () => void;
  taskCompleted?: boolean;
};

const AulaCard: React.FC<AulaCardProps> = ({ nombreAula, image, onPress, taskCompleted }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{nombreAula}</Text>
      </View>
      <TouchableOpacity style={styles.arrowButton} onPress={onPress}>
        <FontAwesome name="arrow-right" size={26} color="#00796b" />
      </TouchableOpacity>
      {taskCompleted && <FontAwesome name="check-circle" size={30} color="green" />}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrowButton: {
    padding: 10,
  },
});

export default AulaCard;
