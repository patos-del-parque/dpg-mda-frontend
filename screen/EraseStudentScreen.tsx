import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import EraseStudent from '../components/EraseStudent';



const EraseStudentScreen: React.FC = ({ route }) =>{
  const { name } = route.params;
  return(
    <View style={styles.container}>
      <Text>{name}</Text>
      <EraseStudent  ruta='Admin' name={name}/>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 15,
  }
});


export default EraseStudentScreen;
