import React from 'react';
import { View, StyleSheet } from 'react-native';
import RegisterStudent from '../components/RegisterStudent';



const RegisterStudentScreen: React.FC = () =>{
return(
    <View style={styles.container}>
        <RegisterStudent  ruta='Admin'/>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 15,
  }
});


export default RegisterStudentScreen;
