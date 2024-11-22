import React from 'react';
import { View, StyleSheet} from 'react-native';
import ModifyTeacher from  '../components/ModifyTeacher'; 



const ModifyTeacherScreen: React.FC = () =>{
return(
    <View style={styles.container}>
        <ModifyTeacher ruta='Admin'/>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 15,
  }
});


export default ModifyTeacherScreen;
