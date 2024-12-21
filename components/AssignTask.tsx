import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/StackNavigator";

interface RegisterStudentprops {
  ruta: string;
  name: string;
}

const AssignTasks: React.FC<RegisterStudentprops> = ({ ruta, name }) => {
  
  const [selectedTarea, setSelectedTarea] = useState<string>("");
  const [tareas, setTareas] = useState<any[]>([]);
  const [estudiante, setEstudiante] = useState<string>("");
  const [tipoVista, setTipoVista] = useState('');

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const pressAssignButton = async () => {
    if (!selectedTarea) {
      return;
    }

    const data = JSON.stringify({
      studentId: estudiante,
      taskId: selectedTarea,
      tipoVista: "lectura"
    });

    console.log("Asignacion que se realiza:", data);

    try {
      const response = await fetch(
        "https://api.jsdu9873.tech/api/student-tasks/assign-task",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId: estudiante,
            taskId: selectedTarea,
            tipoVista: tipoVista
          }),
        }
      );

      if (response.ok) {
        console.log("Éxito", "Tarea asignada correctamente.");
        navigation.navigate(ruta as keyof RootStackParamList);
      } else {
        console.log("Error", "Error al asignar la tarea.", response);
      }
    } catch (error) {
      console.error(error);
      console.log("Error", "Hubo un problema al asignar la tarea.");
    }
  };

  const fetchTareas = async () => {
    try {
      const response = await fetch("https://api.jsdu9873.tech/api/tasks/get", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      if (response.ok) {
        const tareasProcesadas = result.tasks.map(
          (tarea: { _id: string; nombre: string; fechaCreacion: Date; imagenTarea: string, pasos:[]}) => ({
            id: tarea._id,
            nombre: tarea.nombre,
            fechaCreacion: tarea.fechaCreacion,
            pasos:tarea.pasos
          })
        );
        setTareas(tareasProcesadas);
      } else {
        console.log(
          "Error",
          result.message || "Hubo un problema al obtener las tareas."
        );
      }
    } catch (error) {
      console.log("Error", "No se pudo obtener la lista de tareas.");
    }
  };

  const selectedStudent = async (studentName: string) => {
    try {
      const response = await fetch(
        `https://api.jsdu9873.tech/api/students/get/${studentName}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo obtener el estudiante");
      }

      const data = await response.json();
      const estudianteID = data.student._id;
      setEstudiante(estudianteID);

      const lectura = data.student.lectura;
      const imagen = data.student.imagen;
      const video = data.student.video;

      if(lectura){
        setTipoVista("lectura");
      } else if (video) {
        setTipoVista("video");
      } else {
        setTipoVista("imagen");
      }

      console.log("Lectura;", lectura);
      console.log("Imagen:", imagen);
      console.log("Video:", video);

      console.log("Estudiante:", studentName);
      console.log("EstudianteID:", estudianteID);
      console.log("Estudiante obtenido:", data);
      return data;
    } catch (error) {
      console.error("Error en la solicitud GET:", error);
    }
  };

  useEffect(() => {
    selectedStudent(name);
    fetchTareas();
  }, []);

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Asignar tarea a estudiante</Text>

      <Text style={styles.label}>Estudiante: {name}</Text>

      <Text style={styles.label}>Tarea</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedTarea}
          onValueChange={(itemValue) => setSelectedTarea(itemValue)}
          style={styles.picker}
        >
          {tareas.map((tarea) => (
            <Picker.Item
              key={tarea.id}
              label={tarea.nombre}
              value={tarea.id}
              color="#004d40"
            />
          ))}
        </Picker>
      </View>

      <Pressable style={styles.button} onPress={pressAssignButton}>
        <Text style={styles.buttonText}>Asignar tarea</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#004d40",
    marginRight: 10,
    borderRadius: 4,
  },
  checkboxSelected: {
    backgroundColor: "#004d40",
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#004d40",
  },
  configContainer: {
    marginTop: 20,
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  configLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  formContainer: {
    padding: 20,
    backgroundColor: "#f0f9ff",
    borderRadius: 12,
    maxWidth: 700,
    margin: "auto",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    width: "90%",
  },
  pickerContainer: {
    height: 40,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    justifyContent: "center",
  },
  picker: {
    width: "100%",
    height: 42,
    borderRadius: 8,
    backgroundColor: "#e0f7fa",
    color: "#004d40",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00796b",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#004d40",
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  input: {
    height: 45,
    width: "100%",
    borderColor: "#80cbc4",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  stepContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginRight: 15,
    backgroundColor: "#e0f7fa",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderColor: "#80cbc4",
    borderWidth: 1,
    marginLeft: 10,
  },
  stepText: {
    fontSize: 16,
    color: "#333",
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#FF5722",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginTop: 10,
    marginRight: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  stepsList: {
    flexDirection: "column",
    marginTop: 15,
    width: "100%",
    paddingVertical: 10,
    overflow: "hidden",
  },
});

export default AssignTasks;
