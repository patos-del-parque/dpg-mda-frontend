import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CreateTaskMenu from  '../components/CreateTaskMenu'; //j



const StatusTaskScreen: React.FC = () =>{
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


export default StatusTaskScreen;