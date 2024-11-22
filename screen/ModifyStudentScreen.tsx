import React from 'react';
import { View, StyleSheet} from 'react-native';
import ModifyStudent from  '../components/ModifyStudent'; 



const ModifyStudentScreen: React.FC = () =>{
return(
    <View style={styles.container}>
        <ModifyStudent ruta='Admin'/>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 15,
  }
});


export default ModifyStudentScreen;
