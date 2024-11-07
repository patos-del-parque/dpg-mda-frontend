import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function ComponentCarlos(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Instrucciones:</Text>
      <Text style={styles.item}>1. Prepara los ingredientes.</Text>
      <Text style={styles.item}>2. Cocina a fuego medio durante 10 minutos.</Text>
      <Text style={styles.item}>3. Sirve caliente y disfruta.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    fontSize: 16,
    marginBottom: 5,
  },
});
