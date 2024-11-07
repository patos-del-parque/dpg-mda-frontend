import React, { useState } from 'react';
import { ScrollView,View, Text, Image,  TextInput,Alert, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'; 

    type Step = {
        text: string;
        imageUri?: string;
    };

    const CreateTaskMenu: React.FC = () => {
        const [taskName, setTaskName] = useState('');
        const [taskSteps, setTaskSteps] = useState<Step[]>([]);
        const [currentStepText, setCurrentStepText] = useState('');
        const [taskDate, setTaskDate] = useState('');
        const [imageUri, setImageUri] = useState<string | undefined>(undefined);
        const [videoUri, setVideoUri] = useState<string | undefined>(undefined);

        // Función para seleccionar una imagen
    const selectImage = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            includeBase64: false,
        });

        if (result.assets && result.assets.length > 0) {
            setImageUri(result.assets[0].uri);
        } else {
            Alert.alert('Error', 'Por favor, selecciona una imagen.');
        }
    };

    // Función para añadir el paso actual a la lista de pasos
    const addStep = async () => {
        if (!currentStepText.trim()) {
            Alert.alert('Error', 'Por favor, introduce el texto del paso.');
            return;
        }

        // Verifica si se seleccionaron una imagen y un video
        if (!imageUri) {
            Alert.alert('Error', 'Por favor, selecciona una imagen.');
            return;
        }


        // Crear el nuevo paso con texto, imagen y video
        const newStep: Step = {
            text: currentStepText,
            imageUri: imageUri,
        };

        // Añadir el paso a la lista
        setTaskSteps([...taskSteps, newStep]);

        // Limpiar campos
        setCurrentStepText('');
        setImageUri(undefined);
    };
  
  // Función para eliminar un paso
  const removeStep = (index: number) => {
    setTaskSteps(taskSteps.filter((_, i) => i !== index)); 
  };

  const addTask = () => {
    if (!taskName.trim() || !taskDate.trim() || taskSteps.length === 0) {
      Alert.alert('Error', 'Por favor, completa todos los campos antes de añadir la tarea');
      return;
    }

    // Aquí puedes enviar la tarea a una base de datos o manejarla como prefieras
    Alert.alert('Tarea Añadida', `Tarea "${taskName}" añadida con éxito`);

    // Limpia todos los campos después de añadir la tarea
    setTaskName('');
    setTaskSteps([]);
    setCurrentStepText('');
    setTaskDate('');
  };

  return (
    <View style={styles.formContainer}>
        <Text style={styles.title}>Crear Tareas</Text>
        <View style={styles.formContainer}>
            <Text style={styles.label}>Nombre de la tarea</Text>
            <TextInput
                style={styles.input}
                placeholder="Introduce el nombre de la tarea"
                value={taskName}
                onChangeText={setTaskName}
            />

            <Text style={styles.label}>Fecha de la tarea (DD/MM/YYYY)</Text>
            <TextInput
                style={styles.input}
                placeholder="DD/MM/YYYY"
                value={taskDate}
                onChangeText={setTaskDate}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Paso de la tarea</Text>
                <TextInput
                style={styles.input}
                placeholder="Introduce un paso"
                value={currentStepText}
                onChangeText={setCurrentStepText}
            />

            <TouchableOpacity style={styles.button} onPress={selectImage}>
                    <Text style={styles.buttonText}>Seleccionar Imagen</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={addStep}>
                    <Text style={styles.buttonText}>Añadir Paso</Text>
            </TouchableOpacity>

            <FlatList
                    data={taskSteps}
                    renderItem={({ item, index }) => (
                        <View style={styles.stepContainer}>
                            <Text style={styles.stepText}>{index + 1}. {item.text}</Text>
                            {item.imageUri && <Image source={{ uri: item.imageUri }} style={styles.imagePreview} />}
                            <TouchableOpacity onPress={() => removeStep(index)} style={styles.deleteButton}>
                                <Text style={styles.deleteButtonText}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true} 
                    showsHorizontalScrollIndicator={true} 
                    contentContainerStyle={{ flexDirection: 'row' }} 
                    style={styles.stepsList}
                                />
            
            <TouchableOpacity style={styles.button} onPress={addTask}>
                    <Text style={styles.buttonText}>Añadir Tarea</Text>
            </TouchableOpacity>
        </View>
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



export default CreateTaskMenu;
 