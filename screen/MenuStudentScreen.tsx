import React from 'react';
import { View, StyleSheet } from 'react-native';
import AdminMenu from  '../components/AdminMenu'; 
import UserMenuScreen from './UserMenuScreen';
import MenuStudent from '@/components/MenuStudent';


const MenuStudentScreen: React.FC = () =>{
return(
    <View style={styles.container}>
      < MenuStudent ruta='ListStudentScreen'/> 
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 15,
  }
});


export default MenuStudentScreen;