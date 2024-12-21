import React from 'react';
import { View, StyleSheet} from 'react-native';
import ModifyTeacher from  '../components/ModifyTeacher'; 



const ModifyTeacherScreen: React.FC = ({ route }) =>{
  const { name } = route.params;
  return(
      <View style={styles.container}>
          <ModifyTeacher ruta='Admin' name={name}/>
      </View>
    );
};


const styles = StyleSheet.create({
  container: {
    padding: 15,
  }
});


export default ModifyTeacherScreen;
