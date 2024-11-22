import React from 'react';
import { View, StyleSheet } from 'react-native';
import RegisterTeacher from '../components/RegisterTeacher';



const RegisterTeacherScreen: React.FC = () =>{
return(
    <View style={styles.container}>
        <RegisterTeacher  ruta='Admin'/>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 15,
  }
});


export default RegisterTeacherScreen;
