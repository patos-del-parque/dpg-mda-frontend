import React, { useState, useEffect } from 'react';
import { View, Text, TextInput,  StyleSheet, Pressable, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';

interface RegisterStudentprops {
  ruta: String;
  name: String;
}

const ModifySkills: React.FC<RegisterStudentprops> = ({ ruta, name }) => {
  const [selectLevel, setSelectedLevel] = useState("");
  const [estudiantes, setEstudiantes] = useState([]);
  const [selectedEstudiante, setSelectedEstudiante] = useState(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const pressLoginButton = async () => {
    navigation.navigate(ruta as keyof RootStackParamList);

  };

  useEffect(() => {
    fetch('http://localhost:27017/estudiantes') 
      .then(response => response.json())
      .then(data => setEstudiantes(data))
      .catch(error => console.error(error));
  }, []);


  return(
    <View style={styles.formContainer}>
        <Text style={styles.title}>Modificar Habilidades Estudiante</Text>

        <Text style={styles.label}>Estudiante: {name}</Text>
        <Text style={styles.label}>Nuevo nivel</Text>
        <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectLevel}
          onValueChange={(itemValue) => setSelectedLevel(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Nivel 1" value="Nivel1" color="#004d40"/>
          <Picker.Item label="Nivel 2" value="Nivel2" color="#004d40"/>
          <Picker.Item label="Nivel 3" value="Nivel3" color="#004d40"/>
        </Picker>
      </View>
      <Pressable style={styles.button} onPress={pressLoginButton}>
        <Text style={styles.buttonText}>Aplicar Cambios</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    maxWidth: 700,
    margin: 'auto',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    width: '90%',
  },
  pickerContainer: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    justifyContent: 'center',
    
  },
  picker: {
      width: '100%',
      height: 42,
      borderRadius: 8,
      backgroundColor: '#e0f7fa',
      color: '#004d40',
    },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#004d40',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  input: {
    height: 45,
    width: '100%',
    borderColor: '#80cbc4',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    width:'100%'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 15,
    backgroundColor: '#e0f7fa',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderColor: '#80cbc4',
    borderWidth: 1,
    marginLeft: 10,
  },
  stepText: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginTop: 10,
    marginRight: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  stepsList: {
    flexDirection: 'column',
    marginTop: 15,
    width: '100%',
    paddingVertical: 10,
    overflow: 'hidden',
    
  },
});



export default ModifySkills;
 