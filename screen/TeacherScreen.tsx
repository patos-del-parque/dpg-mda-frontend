import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import TeacherMenu from '../components/TeacherMenu';


const TeacherScreen: React.FC = () =>{
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Panel del Profesorado</Text>
      <TeacherMenu route='RequestMaterials' label='Solicitar Materiales' iconName='tasks' />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 30,
    textAlign: 'center',
  },
});


export default TeacherScreen;
