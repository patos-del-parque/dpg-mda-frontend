import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import TeacherAdminMenu from '@/components/TeacherAdminMenu';

const TeacherAdminScreen: React.FC = () =>{
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Panel del Profesorado</Text>
      <TeacherAdminMenu route='RegisterTeacher' label='Dar de alta a profesor' iconName='user' />
      <TeacherAdminMenu route='ListTeacher' label='Lista de profesores' iconName='user' />
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


export default TeacherAdminScreen;
