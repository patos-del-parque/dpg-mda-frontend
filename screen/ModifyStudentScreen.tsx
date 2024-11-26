import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import ModifyStudent from  '../components/ModifyStudent'; 



const ModifyStudentScreen: React.FC = ({ route }) =>{
  const { name } = route.params;
  return(
    <View style={styles.container}>
      <ModifyStudent ruta='Admin' name={name}/>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 15,
  }
});


export default ModifyStudentScreen;
