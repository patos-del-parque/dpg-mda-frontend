import React from 'react';
import { View, StyleSheet } from 'react-native';
import NumeroMenu from '@/components/NumeroMenu';


const NumeroMenuScreen: React.FC = () =>{
return(
    <View style={styles.container}>
      < NumeroMenu/> 
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#EDE7F6',
    padding: 15,
  }
});


export default NumeroMenuScreen;