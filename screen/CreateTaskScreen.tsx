import React from 'react';
import { View, StyleSheet} from 'react-native';
import CreateTaskMenu from  '../components/CreateTaskMenu'; 



const CreateTaskScreen: React.FC = () =>{
return(
    <View style={styles.container}>
        <CreateTaskMenu/>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 15,
  }
});


export default CreateTaskScreen;
