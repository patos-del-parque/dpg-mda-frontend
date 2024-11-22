import React, { useState } from 'react';
import { View, Text,  TextInput, StyleSheet, Pressable } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import { Picker } from '@react-native-picker/picker';


interface ModifyStudentprops {
    ruta: String;
  }
  
  const ModifyStudent: React.FC<ModifyStudentprops> = ({ ruta }) => {
  
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
    const pressLoginButton = async () => {
      navigation.navigate(ruta as keyof RootStackParamList);

      try {
        const response = await fetch('http://localhost:27017/api/students/add-student', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, apellidos, DNI, edad: parseInt(edad), curso, selectedNecesidad, password}),
        });
        const result = await response.json();
        alert(result.message || 'Estudiante modificado exitosamente');
    } catch (error) {
        alert('Error al modificar al estudiante');
    }
    };

    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [DNI, setDNI] = useState('');
    const [edad, setEdad] = useState('');
    const [curso, setCurso] = useState('');
    const [selectedNecesidad, setSelectedNecesidad] = useState("");
    const [password, setPasswpord] = useState("");
    const [estudiantes, setEstudiantes] = useState([]);
    const [selectedEstudiante, setSelectedEstudiante] = useState(null);

    return(
            <View style={styles.formContainer}>
            <Text style={styles.title}>Modificar Datos Estudiante</Text>

            <Text style={styles.label}>Estudiante</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedEstudiante}
                onValueChange={(itemValue) => setSelectedEstudiante(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Selecciona un estudiante" value={null} color="#004d40" />
                {estudiantes.map(estudiante => (
                  <Picker.Item
                    //key={estudiante._id}
                    //label={estudiante.nombre} coge de la bd 
                    color="#004d40"
                  />
                ))}
              </Picker>
            </View>
    
            <Text style={styles.label}>Nombre</Text>
            <TextInput style={styles.input} value={nombre} onChangeText={setNombre} placeholder="Introduce el nuevo nombre" />
    
            <Text style={styles.label}>Apellidos</Text>
            <TextInput style={styles.input} value={apellidos} onChangeText={setApellidos} placeholder="Introduce los nuevos apellidos" />
    
            <Text style={styles.label}>DNI</Text>
            <TextInput style={styles.input} value={DNI} onChangeText={setDNI} placeholder="Introduce el nuevo DNI" />
    
            <Text style={styles.label}>Curso</Text>
            <TextInput style={styles.input} value={curso} onChangeText={setCurso} placeholder="Introduce el nuevo curso" />
    
            <Text style={styles.label}>Edad</Text>
            <TextInput style={styles.input} value={edad} onChangeText={setEdad} placeholder="Introduce la nueva edad" keyboardType="numeric" />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput style={styles.input} value={password} onChangeText={setPasswpord} placeholder="Introduce la nueva contraseña" keyboardType="numeric" />
 
            <Pressable style={styles.button} onPress={pressLoginButton}>
            <Text style={styles.buttonText}>Modificar</Text>
            </Pressable>
        </View>
    );
  };
  
  const styles = StyleSheet.create({
    formContainer: {
      padding: 20,
      backgroundColor: '#f0f9ff',
      borderRadius: 12,
      maxWidth: 400,
      margin: 'auto',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
      width: '90%',
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
  });


export default ModifyStudent;