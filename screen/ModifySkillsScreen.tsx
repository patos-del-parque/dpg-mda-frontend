import React from 'react';
import { View, StyleSheet} from 'react-native';
import ModifySkills from  '../components/ModifySkills'; 



const ModifySkillsScreen: React.FC = () =>{
return(
    <View style={styles.container}>
        <ModifySkills ruta='Admin'/>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 15,
  }
});


export default ModifySkillsScreen;
