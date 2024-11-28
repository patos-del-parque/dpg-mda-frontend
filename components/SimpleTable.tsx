import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';

// Lista de colores predefinidos
const colors = [
  { id: 1, color: '#FF0000',nombre:'ROJO' }, // Tomate
  { id: 2, color: '#1E90FF',nombre:'AZUL' }, // Azul
  { id: 3, color: '#32CD32',nombre:'VERDE' }, // Verde lima
  { id: 4, color: '#808080',nombre:'GRIS' }, // Dorado
  { id: 5, color: '#FF69B4',nombre:'ROSA' }, // Rosa fuerte
  { id: 6, color: '#8A2BE2',nombre:'VIOLETA' }, // Azul violeta
  { id: 7, color: '#000000',nombre:'NEGRO' }, // Amarillo
  { id: 8, color: '#FFA500',nombre:'NARANJA' }, // Turquesa oscuro
  { id: 9, color: '#800000',nombre:'MARRON' }, // Verde chartreuse
];

const animales = [
  { id:1,url:'url',nombre:'Ciervo'}
];

interface LoginTextprops {
  ruta: string;
  name: string;
}

const SimpleTable: React.FC<LoginTextprops> = ({ ruta, name }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [password, setPassword] = useState<{ uniqueId: number; id: number; color: string }[]>([]);

  const handleColorPress = (id: number) => {
    if (password.length >= 4) {
      Alert.alert('Límite alcanzado', 'No puedes añadir más de 4 colores.');
      return;
    }
    const selectedColor = colors.find((item) => item.id === id);
    if (selectedColor) {
      setPassword([...password, { ...selectedColor, uniqueId: Date.now() + Math.random() }]);
    }
  };

  const handleClear = () => {
    setPassword([]);
  };

  const handleSubmit = () => {
    const selectedColorIds = password.map((item) => item.id).join(''); // Obtener los IDs de los colores seleccionados como string
    pressLoginButton(name, selectedColorIds);
  };

  const pressLoginButton = async (nombre: string, password: string) => {
    const url = 'https://api.jsdu9873.tech/api/students/login';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, password }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        Alert.alert('Inicio de sesión correcto', 'Bienvenido de nuevo');
        navigation.navigate(ruta as keyof RootStackParamList);
      } else {
        Alert.alert('Error', data.message || 'Correo o contraseña incorrectos');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo iniciar sesión. Intente nuevamente.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Array.from({ length: 2 }).map((_, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {colors.slice(rowIndex * 3, rowIndex * 3 + 3).map((item) => (
            <TouchableOpacity key={item.id} onPress={() => handleColorPress(item.id)} style={[styles.cell, { backgroundColor: item.color }]}>
              <Text style={styles.cellText}>{item.nombre}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <View style={styles.passwordContainer}>
        {password.length === 0 ? (
          <Text style={styles.emptyText}>No hay colores seleccionados</Text>
        ) : (
          password.map((item) => (
            <View key={item.uniqueId} style={[styles.selectedColor, { backgroundColor: item.color }]} />
          ))
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleClear}>
          <Icon name="trash" size={80} color="red" />
          <Text style={[styles.buttonText, { color: 'red' }]}>Borrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Icon name="arrow-right" size={40} color="green" />
          <Text style={[styles.buttonText, { color: 'green' }]}>Enviar</Text>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  cell: {
    flex: 1,
    height: 100,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  cellText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 40,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 150,
    width: '100%',
    marginBottom: 16,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
  },
  selectedColor: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 5,
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
    fontSize: 36,
  },
});

export default SimpleTable;
