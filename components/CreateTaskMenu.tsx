import React, { useState } from 'react';
import { ScrollView, View, Text, Image,  TextInput,Alert, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'; 
import { useVideoPlayer, VideoView } from 'expo-video';
import * as DocumentPicker from 'expo-document-picker';

type Step = {
    text: string;
    description: string,
    videoUri?: string;
    imageUri?: string;
};

    const CreateTaskMenu: React.FC = () => {
        const [taskName, setTaskName] = useState('');
        const [taskSteps, setTaskSteps] = useState<Step[]>([]);
        const [currentStepText, setCurrentStepText] = useState('');
        const [taskDate, setTaskDate] = useState('');
        const [taskdescription, setTaskDescription] = useState('');
        const [imageUri, setImageUri] = useState<string | undefined>(undefined);
        const [videoUri, setVideoUri] = useState<string | undefined>(undefined);
        const [isPlaying, setIsPlaying] = useState(false);


        // Crear el nuevo paso con texto, imagen y video
        const newStep: Step = {
          description: taskdescription,
          text: currentStepText,
          imageUri: imageUri,
          videoUri: videoUri,
        };

        // Función para seleccionar una imagen
    const selectImage = async () => {
      const result = await launchImageLibrary({
        mediaType: 'photo', 
        includeBase64: false, 
      });

      console.log(result);

        if (result.assets && result.assets.length > 0) {
            setImageUri(result.assets[0].uri);
        } else {
            Alert.alert('Error', 'Por favor, selecciona una imagen.');
        }
    };

    const selectVideo = async () => {
      try {
        const result = await DocumentPicker.getDocumentAsync({
          type: 'video/*',
        });

        if (result.assets && result.assets.length > 0) {
          const videoUri = result.assets[0].uri;
          setVideoUri(videoUri); 
        } else {
          Alert.alert('Error', 'Por favor, selecciona un video.');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Hubo un problema al seleccionar el video.');
      }
    };

    const player = videoUri
    ? useVideoPlayer(videoUri, (player) => {
          player.loop = true;
      })
    : null;

    const togglePlayPause = () => {
        if (player) {
            if (isPlaying) {
                player.pause();
            } else {
                player.play();
            }
            setIsPlaying(!isPlaying); // Alterna el estado de reproducción
        }
    };


    // Función para añadir el paso actual a la lista de pasos
    const addStep = async () => {
        if (!currentStepText.trim()) {
            Alert.alert('Error', 'Por favor, introduce el texto del paso.');
            return;
        }

        if (!taskdescription.trim()) {
          Alert.alert('Error', 'Por favor, introduce la descripcion del paso.');
          return;
      }

        // Verifica si se seleccionaron una imagen y un video
        if (!imageUri  && !videoUri) {
            Alert.alert('Error', 'Por favor, selecciona una imagen.');
            return;
        }

        const newStep: Step = {
          description: taskdescription,
          text: currentStepText,
          imageUri: imageUri,
          videoUri: videoUri,
      };

        // Añadir el paso a la lista
        setTaskSteps([...taskSteps, newStep]);


        
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
    setTaskDescription('');
    setImageUri(undefined);
    setVideoUri(undefined);
    
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

            <Text style={styles.label}>Paso a realizar</Text>
                <TextInput
                style={styles.input}
                placeholder="Introduce el paso a realizar"
                value={currentStepText}
                onChangeText={setCurrentStepText}
            />


            <Text style={styles.label}>Descripcion del paso</Text>
                <TextInput
                style={styles.input}
                placeholder="Introduce una descripcion del paso"
                value={taskdescription}
                onChangeText={setTaskDescription}
            />

            <TouchableOpacity style={styles.button} onPress={selectImage}>
                    <Text style={styles.buttonText}>Seleccionar Imagen</Text>
            </TouchableOpacity>

            {<TouchableOpacity style={styles.button} onPress={selectVideo}>
                <Text style={styles.buttonText}>Seleccionar Video</Text>
            </TouchableOpacity>}

            <TouchableOpacity style={styles.button} onPress={addStep}>
                    <Text style={styles.buttonText}>Añadir Paso</Text>
            </TouchableOpacity>

            <FlatList
              data={taskSteps}
              renderItem={({ item, index }) => (
                <View style={styles.stepContainer}>
                  <Text style={styles.stepText}>
                    {index + 1}. {item.text}
                  </Text>
                  <Text style={styles.stepDescription}>{item.description}</Text>
                  {item.imageUri && (
                    <Image source={{ uri: item.imageUri }} style={styles.imagePreview} />
                  )}
                  {item.videoUri && (
                    <View style={{ alignItems: 'center' }}>
                        <VideoView
                            style={styles.videoPreview}
                            player={player}
                            allowsFullscreen
                            allowsPictureInPicture
                        />
                        <Button
                            title={isPlaying ? 'Pause' : 'Play'}
                            onPress={togglePlayPause}
                        />
                    </View>
                )}


                  <TouchableOpacity
                    onPress={() => removeStep(index)}
                    style={styles.deleteButton}
                  >
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
  videoPreview: {
    width: 200,
    height: 150,
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: '#000', 
  },

  stepDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    width: 200, 
    flexWrap: 'wrap', 
    textAlign: 'left', 
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
 