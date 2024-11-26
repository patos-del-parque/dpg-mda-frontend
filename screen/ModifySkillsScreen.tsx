import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ModifySkills from  '../components/ModifySkills'; 



const ModifySkillsScreen: React.FC = ({ route }) =>{

  const { name } = route.params;
  return(
    <View style={styles.container}>
      <ModifySkills ruta='Admin' name={name}/>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 15,
  }
});


export default ModifySkillsScreen;
