import React from 'react';
import { View, StyleSheet } from 'react-native';
import EraseStudent from '../components/EraseStudent';



const EraseStudentScreen: React.FC = () =>{
return(
    <View style={styles.container}>
        <EraseStudent  ruta='Admin'/>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 15,
  }
});


export default EraseStudentScreen;
