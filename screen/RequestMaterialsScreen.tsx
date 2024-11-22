import React from 'react';
import { View, StyleSheet } from 'react-native';
import RequestMaterials from '../components/RequestMaterials';



const RequestMaterialsScreen: React.FC = () =>{
return(
    <View style={styles.container}>
        <RequestMaterials  ruta='Teacher'/>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 15,
  }
});


export default RequestMaterialsScreen;
