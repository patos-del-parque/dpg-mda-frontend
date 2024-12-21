import React, { useState } from 'react';
import { View, Text, Image,  TextInput,Alert, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'; 
import { useVideoPlayer, VideoView } from 'expo-video';
import { RootStackParamList } from '../navigation/StackNavigator';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RouteProp, useRoute } from '@react-navigation/native'
;
type EditTaskScreenRouteProp = RouteProp<RootStackParamList, 'EditTaskScreen'>;


type Step = {
    description: string;
    name: string,
    imageUri?: string;
};



const EditTask: React.FC<RegisterStudentprops> = () => {

    const route = useRoute<EditTaskScreenRouteProp>();
    const { taskNameOriginal } = route.params;

	const [taskName, setTaskName] = useState('');
	const [taskSteps, setTaskSteps] = useState<Step[]>([]);
	const [currentStepText, setCurrentStepText] = useState('');
	const [taskDate, setTaskDate] = useState('');
	const [taskdescription, setTaskDescription] = useState('');
	const [imageUriTask, setImageUriTask] = useState<string | undefined>(undefined);
	const [imageUri, setImageUri] = useState<string | undefined>(undefined);

	const stringToDate = (dateString: string) => {
		// Dividir la cadena en partes: día, mes, año
		const [day, month, year] = dateString.split('/');
	  
		// Crear un objeto Date (meses en JavaScript son base 0, así que restamos 1)
		const date = new Date(Number(year), Number(month) - 1, Number(day)+1, 0, 0, 0, 0);
	  
		// Validar que el objeto Date es válido
		if (isNaN(date.getTime())) {
		  throw new Error("Fecha inválida");
		}
	  
		return date.toISOString();
	  };

	// Función para seleccionar una imagen
	const selectImageStep = async () => {
		const result = await launchImageLibrary({
			mediaType: 'photo', 
			includeBase64: false, 
		});

		if (result.assets ) {
		    setImageUri(result.assets[0].uri);
		}
	};

	const selectImageTask = async () => {
		const result = await launchImageLibrary({
			mediaType: 'photo',
			includeBase64: false,
		});

		console.log(result);

		if (result.assets) {
			setImageUriTask(result.assets[0].uri);
		}
  	};

    // Función para añadir el paso actual a la lista de pasos
    const addStep = async () => {

		const newStep: Step = {
			name: taskdescription,
			description: currentStepText,
			imageUri: imageUri,
		};

		setCurrentStepText('');
		setTaskDescription('');
		setImageUriTask(undefined);
		setImageUri(undefined);

		// Añadir el paso a la lista
		setTaskSteps([...taskSteps, newStep]);
    };
  
	// Función para eliminar un paso
	const removeStep = (index: number) => {
		setTaskSteps(taskSteps.filter((_, i) => i !== index)); 
	};

  	const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const pressModifyButton = async () => {
      
        const updatedFields: Record<string, any> = {};
  
        if (taskName) updatedFields.nombre = taskName;
        if (taskDate) updatedFields.fechaCreacion = taskDate;
        if (taskSteps.length>0) updatedFields.pasos = taskSteps;
        if (imageUriTask) updatedFields.imagenTarea = imageUriTask;

        try {
          const response = await fetch('https://api.jsdu9873.tech/api/tasks/update', {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ taskNameOriginal, ...updatedFields, }),
              
          });
          console.log(JSON.stringify(updatedFields));

          const result = await response.json();
          if (response.ok) {
            setTaskName('');
            setTaskSteps([]);
            setCurrentStepText('');
            setTaskDate('');
            setTaskDescription('');
            setImageUriTask(undefined);
            setImageUri(undefined);

            console.log('Tarea modificada exitosamente');
            }
            else{
                console.log("no se ha modificado")
            }
        } 
        catch (error) {
          console.log('Error al modificar la tarea');
        }

        navigation.navigate('ListTaskScreen');
      };

  
  return (
    <View style={styles.formContainer}>
        <Text style={styles.title}>Modificar Tarea : {taskNameOriginal}</Text>
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

            <TouchableOpacity style={styles.button} onPress={selectImageTask}>
              	<Text style={styles.buttonText}>Seleccionar Imagen de la tarea</Text>
            </TouchableOpacity>



			{/* <Text> {imageUriTask} </Text> */}
		
            <TouchableOpacity style={styles.button} onPress={selectImageStep}>
              	<Text style={styles.buttonText}>Seleccionar Imagen del paso</Text>
            </TouchableOpacity>

			{/* <Text> {imageUri} </Text> */}

            {/* {<TouchableOpacity style={styles.button} onPress={selectVideo}>
                <Text style={styles.buttonText}>Seleccionar Video</Text>
            </TouchableOpacity>} */}

            <TouchableOpacity style={styles.button} onPress={addStep}>
              	<Text style={styles.buttonText}>Añadir Paso</Text>
            </TouchableOpacity>

			{imageUriTask && (
			<Image source={{ uri: imageUriTask }} style={styles.imageTaskPreview} />
			)}

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
                  {/* {item.videoUri && (
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
                )} */}


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

            
            <TouchableOpacity style={styles.button} onPress={pressModifyButton}>
                    <Text style={styles.buttonText}>Modificar Tarea</Text>
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
  imageTaskPreview: {
    width: 100,
    height: 100,
    marginTop: 10,
    marginRight: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db'
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



export default EditTask;
 