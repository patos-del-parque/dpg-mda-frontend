import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, FlatList, ActivityIndicator, Button, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MenuStudent from '@/components/MenuStudent';

const EditUserTaskScreen: React.FC = () => {
    const route = useRoute();
    const { name } = route.params as { name: string };

    const [studentId, setStudentId] = useState<string | null>(null);
    const [datos, setDatos] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    // Función para obtener el studentId
    const fetchStudentId = async () => {
        setIsLoading(true);
        try {
            const url1 = `https://api.jsdu9873.tech/api/students/get-id/${name}`;
            const response = await fetch(url1);
            const data = await response.json();

            if (data?.studentId) {
                setStudentId(data.studentId);
            } else {
                throw new Error('No se encontró el studentId');
            }
        } catch (error) {
            setIsError(true);
            console.error('Error al obtener el studentId:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Función para obtener las tareas
    const fetchTasks = async () => {
        if (!studentId) return;

        setIsLoading(true);
        try {
            const url2 = `https://api.jsdu9873.tech/api/student-tasks/get/${studentId}`;
            const response = await fetch(url2);
            const data = await response.json();

            if (data?.tasks) {
                const processedData = data.tasks.map((task: any) => ({
                    nombreAula: task.taskName,
                    imageAula: task.taskImage || 'https://via.placeholder.com/100',
                    pasos: task.taskPasos || [],
                    realizada: task.taskRealizada,
                    taskId: task.taskId,
                }));
                setDatos(processedData);
            } else {
                throw new Error('No se encontraron tareas');
            }
        } catch (error) {
            setIsError(true);
            console.error('Error al obtener las tareas:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Función para eliminar una tarea
    const deleteTask = async (taskId: string) => {
        try {
            const url = `https://api.jsdu9873.tech/api/student-tasks/delete/${taskId}`;
            const response = await fetch(url, { method: 'DELETE' });

            if (response.ok) {
                // Actualizar el estado local eliminando la tarea
                setDatos((prevDatos) => prevDatos.filter((task) => task.taskId !== taskId));
            } else {
                console.error('Error al eliminar la tarea:', await response.text());
            }
        } catch (error) {
            console.error('Error al eliminar la tarea:', error);
        }
    };

    // Usamos useEffect para realizar las peticiones
    useEffect(() => {
        fetchStudentId();
    }, []);

    useEffect(() => {
        if (studentId) {
            fetchTasks();
        }
    }, [studentId]);

    // Manejo de renderizado basado en el estado
    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (isError) {
        return <Text style={styles.error}>Hubo un error al obtener los datos.</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tareas Asignadas</Text>
            {datos.length > 0 ? (
                <FlatList
                    data={datos}
                    keyExtractor={(item) => item.taskId}
                    renderItem={({ item }) => (
                        <View style={styles.taskContainer}>
                            <Image source={{ uri: item.imageAula }} style={styles.taskImage} />
                            <View style={styles.taskDetails}>
                                <Text style={styles.taskTitle}>{item.nombreAula}</Text>
                                <Text>{item.realizada ? 'Realizada' : 'Pendiente'}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => deleteTask(item.taskId)}
                            >
                                <Text style={styles.deleteButtonText}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            ) : (
                <Text>No se encontraron tareas para este estudiante.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
        textAlign: 'center',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        fontSize: 18,
        marginTop: 20,
    },
    taskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 5,
    },
    taskImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    taskDetails: {
        flex: 1,
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: '#ff5252',
        padding: 8,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    updateButtonContainer: {
        marginTop: 20,
    },
});

export default EditUserTaskScreen;

