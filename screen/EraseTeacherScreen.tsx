import React from 'react';
import { View, StyleSheet } from 'react-native';
import EraseTeacher from '../components/EraseTeacher';



const EraseTeacherScreen: React.FC = () =>{
return(
    <View style={styles.container}>
        <EraseTeacher  ruta='Admin'/>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 15,
  }
});


export default EraseTeacherScreen;
