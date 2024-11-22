import React from 'react';
import { View, StyleSheet} from 'react-native';
import AssignTask from  '../components/AssignTask'; 



const AssignTaskScreen: React.FC = () =>{
return(
    <View style={styles.container}>
        <AssignTask ruta='Admin'/>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 15,
  }
});


export default AssignTaskScreen;
