import React from 'react';
import { View, StyleSheet } from 'react-native';
import ModifyMaterial from '../components/ModifyMaterial';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';

// Definir los tipos de parámetros para esta pantalla
type ModifyMaterialScreenRouteProp = RouteProp<RootStackParamList, 'ModifyMaterial'>;

interface ModifyMaterialScreenProps {
  route: ModifyMaterialScreenRouteProp;
}

const ModifyMaterialScreen: React.FC<ModifyMaterialScreenProps> = ({ route }) => {
  const { name } = route.params; // Extrae parámetros desde la navegación

  return (
    <View style={styles.container}>
      <ModifyMaterial ruta='ListMaterial' name={name}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
});

export default ModifyMaterialScreen;


