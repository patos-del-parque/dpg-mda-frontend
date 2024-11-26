import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { RouteProp } from '@react-navigation/native';
import AssingMaterialsRequests from "../components/AssingMaterialsRequests";
import { RootStackParamList } from "@/types";

// Datos simulados
const mockRequests = [
  { id: 1, material: "Libro de Matemáticas", cantidad: 10, clase: "Matemáticas 101", asignadoA: null },
  { id: 2, material: "Cuaderno de dibujo", cantidad: 5, clase: "Arte 201", asignadoA: null },
  { id: 3, material: "Reglas", cantidad: 20, clase: "Geometría 102", asignadoA: null },
  { id: 4, material: "Calculadoras", cantidad: 3, clase: "Física 301", asignadoA: null },
];

const mockStudents = ["Pedro González", "María Rodríguez", "Luisa Fernández"];

const AssingMaterialsRequestsScreen = ({ route }) => {
  const { name } = route.params;
  const [requests, setRequests] = useState(mockRequests); // Estado para solicitudes
  const [selectedStudent, setSelectedStudent] = useState<string>(mockStudents[0]); // Estado para el estudiante seleccionado

  const assignToStudent = (requestId: number) => {
    if (!selectedStudent) {
      Alert.alert("Error", "Debes seleccionar un estudiante antes de asignar.");
      return;
    }

    // Actualizamos el estado para asignar el estudiante a la solicitud
   /* setRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === requestId ? { ...request, asignadoA: selectedStudent } : request
      )
    );
*/
    Alert.alert("Asignación exitosa", `La solicitud fue asignada a ${selectedStudent}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Peticiones de Material</Text>

      {/* Picker para seleccionar estudiante */}
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Estudiante: {name}</Text>
        {/* <Picker
          selectedValue={selectedStudent}
          onValueChange={(itemValue) => setSelectedStudent(itemValue)}
          style={styles.picker}
        >
          {mockStudents.map((student, index) => (
            <Picker.Item key={index} label={student} value={student} />
          ))}
        </Picker> */}
      </View>

      {/* Lista de solicitudes */}
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <AssingMaterialsRequests
            material={item.material}
            cantidad={item.cantidad}
            clase={item.clase}
            asignadoA={item.asignadoA}
            onAssign={() => assignToStudent(item.id)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  pickerContainer: {
    marginBottom: 16,
    padding: 8,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    height: 40,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
});

export default AssingMaterialsRequestsScreen;
