import React from 'react';
import { View, StyleSheet} from 'react-native';
import AssignTask from  '../components/AssignTask'; 



const AssignTaskScreen: React.FC = ({ route }) =>{
  const { name } = route.params;
  return(
    <View style={styles.container}>
        <AssignTask ruta='Admin' name={name}/>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 15,
  }
});


export default AssignTaskScreen;
