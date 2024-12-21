import React from 'react';
import { View, StyleSheet } from 'react-native';
import EraseTeacher from '../components/EraseTeacher';



const EraseTeacherScreen: React.FC = ({ route }) =>{
  const { name } = route.params;
  return(
      <View style={styles.container}>
          <EraseTeacher  ruta='ListTeacher' name={name}/>
      </View>
    );
};


const styles = StyleSheet.create({
  container: {
    padding: 15,
  }
});


export default EraseTeacherScreen;
