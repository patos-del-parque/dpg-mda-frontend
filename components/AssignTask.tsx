import React, { useState, useEffect } from 'react';
import { View, Text, TextInput,  StyleSheet, Pressable, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';

interface RegisterStudentprops {
  ruta: String;
}

    const AssignTasks: React.FC<RegisterStudentprops> = ({ ruta }) => {

      const [selectedEstudiante, setSelectedEstudiante] = useState<any>(null);
      const [selectedTarea, setSelectedTarea] = useState<any>(null);
      const [estudiantes, setEstudiantes] = useState<any[]>([]);
      const [tareas, setTareas] = useState<any[]>([]);
      const navigation = useNavigation<NavigationProp<RootStackParamList>>();
      const [tamanoVista, setTamanoVista] = useState("entera");
      const [lectura, setLectura] = useState(false);
      const [imagen, setImagen] = useState(false);
      const [video, setVideo] = useState(false);

      const pressLoginButton = async () => {
        if (!selectedEstudiante || !selectedTarea) {
          alert("Selecciona un estudiante y una tarea.");
          return;
        }
    
        // Crear el objeto con los datos seleccionados
        const datosAsignacion = {
          estudianteId: selectedEstudiante._id, 
          tareaId: selectedTarea._id, 
          tamanoVista: tamanoVista, 
          lectura: lectura,
          imagen: imagen,
          video: video,         
        };
    
        try {
          // Enviar datos al backend
          const response = await fetch('https://api.jsdu9873.tech/api/students/asignarTarea', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosAsignacion), 
          });
    
          if (response.ok) {
            alert("Tarea asignada correctamente.");
            navigation.navigate(ruta as keyof RootStackParamList);
          } else {
            alert("Error al asignar la tarea.");
          }
        } catch (error) {
          console.error(error);
          alert("Hubo un problema al asignar la tarea.");
        }
      };

      useEffect(() => {
        fetch('https://api.jsdu9873.tech/api/students') 
          .then(response => response.json())
          .then(data => setEstudiantes(data))
          .catch(error => console.error(error));

          fetch('https://api.jsdu9873.tech/api/tasks') 
          .then(response => response.json())
          .then(data => setTareas(data))
          .catch(error => console.error(error));
      }, []);
  

      return(
        <View style={styles.formContainer}>
          <Text style={styles.title}>Asignar tarea a estudiante</Text>

          <Text style={styles.label}>Estudiante</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedEstudiante}
                onValueChange={(itemValue) => setSelectedEstudiante(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Selecciona un estudiante" value={null} color="#004d40" />
                {estudiantes.map((estudiante) => (
                  <Picker.Item
                    key={estudiante._id}
                    label={estudiante.nombre}
                    value={estudiante} // Pasamos el objeto completo del estudiante
                    color="#004d40"
                  />
                ))}
              </Picker>         
            </View>  

          <Text style={styles.label}>Tarea</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedTarea}
                onValueChange={(itemValue) => setSelectedTarea(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Selecciona una tarea" value={null} color="#004d40" />
                {tareas.map((tarea) => (
                  <Picker.Item
                    key={tarea._id}
                    label={tarea.nombre}
                    value={tarea} // Pasamos el objeto completo de la tarea
                    color="#004d40"
                  />
                ))}
              </Picker>
            </View>  

          <Text style={styles.label}>Tipo de vista</Text>
          <View>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setLectura(!lectura)}
            >
              <View style={[styles.checkbox, lectura && styles.checkboxSelected]} />
              <Text style={styles.checkboxLabel}>Lectura</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setImagen(!imagen)}
            >
              <View style={[styles.checkbox, imagen && styles.checkboxSelected]} />
              <Text style={styles.checkboxLabel}>Imagen</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setVideo(!video)}
            >
              <View style={[styles.checkbox, video && styles.checkboxSelected]} />
              <Text style={styles.checkboxLabel}>Video</Text>
            </TouchableOpacity>
          </View>
            

            <Text style={styles.label}>Tamaño de vista</Text>
            <Picker
              selectedValue={tamanoVista}
              onValueChange={(itemValue) => setTamanoVista(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Entera" value="entera" />
              <Picker.Item label="Media" value="media" />
              <Picker.Item label="Cuarto" value="cuarto" />
            </Picker>

            <Pressable style={styles.button} onPress={pressLoginButton}>
              <Text style={styles.buttonText}>Asignar tarea</Text>
            </Pressable>
        </View>
  );
};

/* BACKEND

app.post('/estudiantes/asignarTarea', (req, res) => {
  const { estudianteId, tareaId, tipoVista, tamanoVista } = req.body;
  
  // Actualizar la base de datos, por ejemplo con Mongoose
  Estudiante.findByIdAndUpdate(estudianteId, {
    tareaAsignada: tareaId,
    tipoVista: tipoVista,
    tamanoVista: tam

*/

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#004d40',
    marginRight: 10,
    borderRadius: 4,
  },
  checkboxSelected: {
    backgroundColor: '#004d40',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#004d40',
  },
  configContainer: {
    marginTop: 20,
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  configLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
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



export default AssignTasks;
 