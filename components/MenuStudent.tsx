import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import { FontAwesome } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';

interface LoginTextProps {
    ruta: string;
    datos: Array<{
        nombreAula: string;
        imageAula: string;
    }>;
}

type MenuStudentScreenRouteProp = RouteProp<RootStackParamList, 'MenuStudentScreen'>;

const MenuStudent: React.FC<LoginTextProps> = ({ ruta, datos }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const route = useRoute<MenuStudentScreenRouteProp>();
    const { taskCompleted, nombreAula: completedAula } = route.params || {};

    const [completedTasks, setCompletedTasks] = useState<{ [aula: string]: boolean }>({});

    useEffect(() => {
        if (taskCompleted && completedAula && !completedTasks[completedAula]) {
            setCompletedTasks((prev) => ({ ...prev, [completedAula]: true }));
        }
    }, [taskCompleted, completedAula]);

    const handleCreateTasks = (nombreAula: string, imageAula: string) => {
        navigation.navigate(ruta, { nombreAula, imageAula });
    };

    return (
        <View style={styles.container}>
            <ScrollView>

                {datos.map((dato, index) => (
                    <View key={index} style={styles.row}>
                        <View style={styles.aulaCard}>
                            <Image source={{ uri: dato.imageAula }} style={styles.image} />
                            <View style={styles.textContainer}>
                                <Text style={styles.aulaTitle}>{dato.nombreAula}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.arrowButton}
                                onPress={() => handleCreateTasks(dato.nombreAula, dato.imageAula)}
                            >
                                <FontAwesome name="arrow-right" size={26} color="#00796b" />
                            </TouchableOpacity>
                            {completedTasks[dato.nombreAula] && (
                                <FontAwesome name="check-circle" size={30} color="green" />
                            )}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    aulaCard: {
        width: '90%',
        padding: 20,
        backgroundColor: '#e0f7fa',
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 15,
    },
    textContainer: {
        alignItems: 'center',
    },
    aulaTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#00796b',
        marginBottom: 8,
    },
    text: {
        fontSize: 16,
        color: '#004d40',
        marginBottom: 4,
    },
    arrowButton: {
        marginTop: 10,
    },
});

export default MenuStudent;
