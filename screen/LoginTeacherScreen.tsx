import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LoginText from  '../components/LoginText';


const LoginTeacherScreen: React.FC = () => {


  return (
    <View style={styles.container}>
      < LoginText ruta='Teacher' url='https://api.jsdu9873.tech/api/teachers/login'/>
    </View>
    
  );
};

const styles = StyleSheet.create({
    container: {
      padding: 15,
    },
    tableHeader: {
      backgroundColor: '#DCDCDC',
    },
  });

export default LoginTeacherScreen;