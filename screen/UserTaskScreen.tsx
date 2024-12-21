import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Pressable } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import MenuStudent from '@/components/MenuStudent';
import Icon from 'react-native-vector-icons/FontAwesome';

const UserTaskScreen: React.FC = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { name } = route.params as { name: string };

    const [studentId, setStudentId] = useState<string | null>(null); // Guardamos el studentId
    const [datos, setDatos] = useState<any[]>([]); // Guardamos los datos procesados para MenuStudent
    const [isLoading, setIsLoading] = useState<boolean>(false); // Controla el estado de carga
    const [isError, setIsError] = useState<boolean>(false); // Controla si hay errores
    const handleLogout = () => {
        // Redirigir al login
        navigation.navigate('Home'); // Cambia 'LoginScreen' por el nombre de tu pantalla de login
      };
    // Función para hacer el primer fetch
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

    // Función para hacer el segundo fetch con el studentId
    const fetchTasks = async () => {
        if (!studentId) return; // No hacemos el fetch si no tenemos studentId

        setIsLoading(true);
        try {
            const url2 = `https://api.jsdu9873.tech/api/student-tasks/get/${studentId}`;
            const response = await fetch(url2);
            const data = await response.json();
            console.log('Tareas obtenidas del fetch:', data.tasks);

            if (data?.tasks) {
                // Procesamos los datos para pasarlos a MenuStudent
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

    // Usamos useEffect para realizar las peticiones
    useEffect(() => {
        fetchStudentId(); // Obtener el studentId primero
    }, []); // Dependencia de 'name' para hacer la petición solo cuando cambie

    useEffect(() => {
        if (studentId) {
            fetchTasks(); // Hacer el segundo fetch solo cuando tengamos el studentId
        }
    }, [studentId]); // Dependencia de 'studentId' para hacer la petición cuando sea válido

    // Manejo de renderizado basado en el estado
    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (isError) {
        return <Text style={styles.error}>El estudiante no tiene tareas asignadas.</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tareas Disponibles</Text>
            {datos.length > 0 ? (
                <MenuStudent
                    ruta="SpecificTaskScreen"
                    datos={datos}
                    studentId={name}
                    idEstudiante={studentId}
                />
            ) : (
                <Text>El estudiante no tiene tareas asignadas.</Text>
            )}

            {/* Botón Rojo */}
            <Pressable style={styles.logoutButton} onPress={handleLogout}>
                <Icon name="sign-out" size={44} color="#fff" style={styles.logoutIcon} />
                <Text style={styles.logoutText}>SALIR</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
        backgroundColor: '#EDE7F6',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
        textAlign: 'center',
    },
    error: {
        flex: 1,
        color: 'red',
        textAlign: 'center',
        fontSize: 18,
        backgroundColor: '#EDE7F6',
        marginTop: 20,
    },
    logoutButton: {
        marginTop: 20,
        backgroundColor: '#FF4F4F', // Color rojo
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    logoutText: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    logoutIcon: {
        marginRight: 5,
      },
});

export default UserTaskScreen;
