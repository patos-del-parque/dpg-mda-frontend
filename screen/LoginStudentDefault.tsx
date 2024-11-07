import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SimpleTable from '../components/SimpleTable';

const LoginStudentDefault: React.FC = () => {

  return (
    <View style={styles.container}>
        <SimpleTable ruta= 'UserMenuScreen'/>
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

export default LoginStudentDefault;
