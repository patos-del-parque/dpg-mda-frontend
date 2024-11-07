import React from 'react';
import { View, StyleSheet } from 'react-native';
import UserMenu from  '../components/UserMenu'; 


const UserMenuScreen: React.FC = () =>{
return(
    <View style={styles.container}>
      < UserMenu ruta='UserTaskScreen' ruta2='MenuStudentScreen' /> 
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 15,
  }
});


export default UserMenuScreen;