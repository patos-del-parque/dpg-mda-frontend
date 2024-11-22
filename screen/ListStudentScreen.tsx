import React from 'react';
import { View, StyleSheet, Text, Dimensions, FlatList } from 'react-native';
import UserCardWithButton from  '../components/UserCardWithButton'; 

const ListStudentScreen: React.FC = () =>{

  const users = [
    { name: 'Mario Medina Lopez', email: 'juan@example.com' },
    { name: 'Carlos Fernandez Arrabal', email: 'ana@example.com' },
    { name: 'Silvia Fernandez Arrabal', email: 'luis@example.com' },
    { name: 'Alonso Doña Martinez', email: 'alonsodmx@gmail.com'},
    
    // Agrega más usuarios aquí
  ];

  const windowWidth = Dimensions.get('window').width;

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Estudiantes</Text>
      <FlatList
        data={users}
        numColumns={Math.floor(windowWidth / 150)} // Calcula cuántas tarjetas caben en una fila
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <UserCardWithButton
            keyProp={index}
            name={item.name}
            urlPhoto="https://reactnative.dev/docs/assets/p_cat2.png"
          />
        )}
        contentContainerStyle={styles.grid}
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
  grid: {
    justifyContent: 'space-between',
  },
});


export default ListStudentScreen;