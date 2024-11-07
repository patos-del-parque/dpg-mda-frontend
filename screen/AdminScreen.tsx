import React from 'react';
import { View, StyleSheet } from 'react-native';
import AdminMenu from  '../components/AdminMenu'; 


const AdminScreen: React.FC = () =>{
return(
    <View style={styles.container}>
      < AdminMenu ruta='TaskMenu' ruta1='ModifySkillsScreen' ruta2='RegisterStudent' /> 
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 15,
  }
});


export default AdminScreen;
