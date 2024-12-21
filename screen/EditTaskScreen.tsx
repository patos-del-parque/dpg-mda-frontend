import React from 'react';
import { View, StyleSheet} from 'react-native';
import { RouteProp, useRoute  } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import EditTask from  '../components/EditTask'; 


const EditTaskScreen: React.FC = () =>{


    return(
        <View style={styles.container}>
{            <EditTask />
}        </View>
    );
    };


const styles = StyleSheet.create({
  container: {
    padding: 15,
  }
});


export default EditTaskScreen;
