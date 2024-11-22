import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity,Text, ScrollView, Button, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';

const data = [
  { id: 1, uri: 'https://reactnative.dev/docs/assets/p_cat2.png' },
  { id: 2, uri: 'https://reactnative.dev/docs/assets/p_cat2.png' },
  { id: 3, uri: 'https://reactnative.dev/docs/assets/p_cat2.png' },
  { id: 4, uri: 'https://reactnative.dev/docs/assets/p_cat2.png' },
  { id: 5, uri: 'https://reactnative.dev/docs/assets/p_cat2.png' },
  { id: 6, uri: 'https://reactnative.dev/docs/assets/p_cat2.png' },
  { id: 7, uri: 'https://reactnative.dev/docs/assets/p_cat2.png' },
  { id: 8, uri: 'https://reactnative.dev/docs/assets/p_cat2.png' },
  { id: 9, uri: 'https://reactnative.dev/docs/assets/p_cat2.png' },
];
interface LoginTextprops {
  ruta: String;
}
const SimpleTable: React.FC<LoginTextprops> = ({ ruta }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [password, setPassword] = useState<{ uniqueId: number; id: number; uri: string }[]>([]);

  const handleImagePress = (id: number) => {
    if (password.length >= 4) {
      Alert.alert("Límite alcanzado", "No puedes añadir más de 4 imágenes.");
      return;
    }
    const valor = data.find((item) => item.id === id);
    if (valor) {
      setPassword([...password, { ...valor, uniqueId: Date.now() + Math.random() }]);
    }
  };

  const handleClear = () => {
    setPassword([]);
  };

  const handleSubmit = () => {
    Alert.alert("Formulario Enviado", `Imágenes seleccionadas: ${password.length}`);
    navigation.navigate(ruta as keyof RootStackParamList);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Array.from({ length: 3 }).map((_, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {data.slice(rowIndex * 3, rowIndex * 3 + 3).map((item) => (
            <TouchableOpacity key={item.id} onPress={() => handleImagePress(item.id)} style={styles.cell}>
              <Image source={{ uri: item.uri }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
      ))}
      <View style={styles.passwordContainer}>
        {password.length === 0 ? (
          <View style={styles.emptyMessage}>
            <Image source={{ uri: 'https://reactnative.dev/docs/assets/p_cat2.png' }} style={styles.placeholderImage} />
          </View>
        ) : (
          password.map((item) => (
            <Image key={item.uniqueId} source={{ uri: item.uri }} style={styles.image} />
          ))
        )}
      </View>

      
    <View style={styles.buttonContainer}>
      
      <TouchableOpacity style={styles.button} onPress={handleClear}>
        <Icon name="trash" size={40} color="red" />
        <Text style={[styles.buttonText, { color: 'red' }]}>Borrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Icon name="arrow-right" size={40} color="green" />
        <Text style={[styles.buttonText, { color: 'green' }]}>Avanzar</Text>
      </TouchableOpacity>
      
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    width: '100%',
    marginBottom: 16,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  emptyMessage: {
    alignItems: 'center',
  },
  placeholderImage: {
    width: 50,
    height: 50,
    opacity: 0.3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 16,
    color: 'black',
  },
});

export default SimpleTable;
