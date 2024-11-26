import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// Tipos de datos esperados
interface RequestItemProps {
  material: string;
  cantidad: number;
  clase: string;
  asignadoA: string | null;
  onAssign: () => void; // Función para asignar la solicitud
}

const RequestItem: React.FC<RequestItemProps> = ({ material, cantidad, clase, asignadoA, onAssign}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.materialText}>Material: {material}</Text>
      <Text style={styles.cantidadText}>Cantidad: {cantidad}</Text>
      <Text style={styles.claseText}>Clase: {clase}</Text>
      {asignadoA ? (
        <Text style={styles.asignadoText}>Asignado a: {asignadoA}</Text>
      ) : (
        <TouchableOpacity style={styles.assignButton} onPress={onAssign}>
          <Text style={styles.assignButtonText}>Asignar a Estudiante</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  materialText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cantidadText: {
    fontSize: 14,
  },
  claseText: {
    fontSize: 14,
    color: "#555",
  },
  asignadoText: {
    fontSize: 14,
    color: "green",
  },
  assignButton: {
    marginTop: 8,
    backgroundColor: "#007bff",
    padding: 8,
    borderRadius: 4,
  },
  assignButtonText: {
    color: "#ffffff",
    textAlign: "center",
  },
});

export default RequestItem;
