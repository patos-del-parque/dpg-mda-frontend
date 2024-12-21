import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Alert, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import useFetchData from '@/hooks/useFetchData';
const emoticons = [
  { id: 1, url: 'https://images.vexels.com/content/134789/preview/happy-smile-emoji-emoticon-icon-c8c1f7.png', nombre: 'ALEGRE' },
  { id: 2, url: 'https://images.vexels.com/content/134491/preview/cry-emoji-emoticon-02783e.png', nombre: 'TRISTE' },
  { id: 3, url: 'https://images.vexels.com/content/223418/preview/surprised-icon-emoji-32c575.png', nombre: 'SORPRENDIDO' },
  { id: 4, url: 'https://static.vecteezy.com/system/resources/previews/032/416/708/non_2x/top-quality-emoticon-sleeping-emoji-snoring-emoticon-zzz-yellow-face-with-closed-eyes-yellow-face-emoji-popular-element-free-png.png', nombre: 'DORMIDO' },
  { id: 5, url: 'https://images.vexels.com/content/134603/preview/in-love-emoji-emoticon-07e698.png', nombre: 'ENAMORADO' },
  { id: 6, url: 'https://images.vexels.com/content/134532/preview/emoji-angry-emoticon-94d990.png', nombre: 'ENFADADO' },
];


interface LoginTextprops {
  ruta: string;
  name: string;
}


const SimpleTable: React.FC<LoginTextprops> = ({ ruta, name }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [password, setPassword] = useState<{ uniqueId: number; id: number; url: string }[]>([]);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);

  const url = `https://api.jsdu9873.tech/api/students/get-password/${name}`;
  console.log(url);
  const [data, isLoading, isError] = useFetchData(url); // Usamos el hook
  // Asegúrate de que correctPassword sea un arreglo
  const correctPassword = data ? data.password : []; // Asegúrate de acceder a la propiedad `password` correctamente

  const handleEmoticonPress = (id: number) => {
    if (password.length >= 4) {
      console.log('Límite alcanzado', 'No puedes añadir más de 4 emoticonos.');
      return;
    }

    const selectedEmoticon = emoticons.find((item) => item.id === id);
    if (selectedEmoticon) {
      const newPassword = [...password, { ...selectedEmoticon, uniqueId: Date.now() + Math.random() }];

      // Verificamos si el nuevo arreglo de emoticonos excede la longitud de la contraseña correcta
      if (newPassword.length > correctPassword.length) {
        setIncorrectAttempts((prev) => prev + 1);
        setPassword([]);
        console.log('Error', 'Contraseña incorrecta. Intenta nuevamente.');
      } else {
        setPassword(newPassword);

        const enteredIds = newPassword.map((item) => item.id);
        const isCorrect = correctPassword.slice(0, enteredIds.length).every((val, index) => val === enteredIds[index]);

        if (!isCorrect) {
          setIncorrectAttempts((prev) => prev + 1);
          setPassword([...password]);
          console.log('Error', 'Contraseña incorrecta. Intenta nuevamente.');
        } else if (enteredIds.length === correctPassword.length){
          // Si la contraseña es correcta, puedes proceder con la acción que necesites
          navigation.navigate(ruta as keyof RootStackParamList, { name });
        }
      }
    }
  };

  const handleClear = () => {
    setPassword([]);
    setIncorrectAttempts(0);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Array.from({ length: 2 }).map((_, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {emoticons.slice(rowIndex * 3, rowIndex * 3 + 3).map((item) => (
            <TouchableOpacity key={item.id} onPress={() => handleEmoticonPress(item.id)} style={styles.cell}>
              <Image source={{ uri: item.url }} style={styles.emoticon} />
              <Text style={styles.cellText}>{item.nombre}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <View style={styles.passwordContainer}>
        {password.length === 0 ? (
          <Text style={styles.emptyText}>No hay emoticonos seleccionados</Text>
        ) : (
          password.map((item) => (
            <Image key={item.uniqueId} source={{ uri: item.url }} style={styles.selectedEmoticon} />
          ))
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleClear}>
          <Icon name="trash" size={50} color="red" />
          <Text style={[styles.buttonText, { color: 'red' }]}>BORRAR</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 36,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 16,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    aspectRatio: 1, // Garantiza que la celda sea cuadrada
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    maxWidth: 140, // Tamaño máximo para evitar que se vuelvan demasiado grandes
    minWidth: 140,  // Tamaño mínimo para mantener legibilidad
    borderWidth: 2,
    borderColor: '#d0d0d0',
  },
  cellText: {
    fontSize: 17,
    color: '#333',
    textAlign: 'center',
  },
  emoticon: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 16,
    padding: 30,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedEmoticon: {
    width: 80,
    height: 80,
    margin: 5,
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
    
  },
  button: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 30,
  },
});

export default SimpleTable;
