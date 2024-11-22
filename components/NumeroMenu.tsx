import React, { useState } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type NumeroMenuScreenRouteProp = RouteProp<RootStackParamList, 'NumeroMenuScreen'>;

const NumeroMenuScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const route = useRoute<NumeroMenuScreenRouteProp>();
    const { nombreAula, imageAula } = route.params; // Obtiene el nombre del aula pasado como parámetro
    
    const menus = [
        { id: 1, title: 'MENU 1', description: 'Pipas', image: 'https://reactnative.dev/docs/assets/p_cat2.png' },
        { id: 2, title: 'MENU 2',  description: 'Triturado', image: 'https://reactnative.dev/docs/assets/p_cat2.png' },
        { id: 3, title: 'MENU 3',  description: 'Vegetariano', image: 'https://reactnative.dev/docs/assets/p_cat2.png' },
    ];

    const [menuIndex, setMenuIndex] = useState(0);
    const handleNextMenu = () => {
        if(menuIndex<2)
        setMenuIndex((prevIndex) => prevIndex + 1); // Incrementa el índice
        
    };

    const [taskCompleted, setTaskCompleted] = useState(false);

    const handleCreateTasks = () => {
        setTaskCompleted(true);
        navigation.navigate("MenuStudentScreen", {taskCompleted:true, nombreAula: nombreAula});
    };

    const imagesByQuantity = [
        'https://images.vexels.com/content/164150/preview/hand-finger-fist-s-letter-s-illustration-32e237.png', // Imagen para cantidad 0
        'https://cdn-icons-png.flaticon.com/512/9125/9125119.png', // Imagen para cantidad 1
        'https://cdn-icons-png.flaticon.com/512/2107/2107651.png', // Imagen para cantidad 2
        'https://cdn-icons-png.flaticon.com/512/9971/9971655.png', // Imagen para cantidad 3
        'https://cdn-icons-png.freepik.com/512/9971/9971654.png', // Imagen para cantidad 4

    ];

    const [quantities, setQuantities] = useState<number[]>([0, 0, 0]);

    const increaseQuantity = (index: number) => {
            const updatedQuantities = [...quantities];
            if (updatedQuantities[index] < imagesByQuantity.length - 1) {
                updatedQuantities[index] += 1;
            }
            setQuantities(updatedQuantities);
        };

    const decreaseQuantity = (index: number) => {
        const updatedQuantities = [...quantities];
        if (updatedQuantities[index] > 0) {
            updatedQuantities[index] -= 1;
        }
        setQuantities(updatedQuantities);
    };
    const aux=0;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{nombreAula}</Text>
            <Image source={{uri:imageAula}} style={styles.image} />
            <View style={styles.cardsContainer}>
                    <View key={menus[menuIndex].id} style={styles.card}>
                        <Text style={styles.cardTitle}>{menus[menuIndex].title}</Text>
                        <Text style={styles.cardTitle}>{menus[menuIndex].description}</Text>
                        <Image source={{ uri: menus[0].image }} style={styles.image} />
                        <View style={styles.counterContainer}>
                            <TouchableOpacity onPress={() => decreaseQuantity(0)} style={styles.button}>
                                <Text style={styles.buttonText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantity}>{quantities[0]}</Text>
                            <TouchableOpacity onPress={() => increaseQuantity(0)} style={styles.button}>
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <Image
                            source={{ uri: imagesByQuantity[quantities[0]] }}
                            style={styles.dynamicImage}
                        /> 
                    </View>
                
            </View > 
            <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={() => { handleNextMenu();  setQuantities(new Array(quantities.length).fill(0)); }}>
            <FontAwesome name="arrow-right" size={30} color="#00796b" />
            </TouchableOpacity>
            {menuIndex === 2 && (
                    <TouchableOpacity 
                        style={styles.enviarButton} 
                        onPress={() => handleCreateTasks()}
                    >
                        <Text style={styles.enviarButtonText}>Enviar</Text>
                    </TouchableOpacity>
                )}  
            </View> 
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00796b',
        marginBottom: 20,
    },
    description: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00796b',
        marginBottom: 20,
    },
    cardsContainer: {
        flex: 1, // Esto hace que el contenedor ocupe el 100% del espacio disponible
        justifyContent: 'center', // Centra las cartas verticalmente
        alignItems: 'center', // Centra las cartas horizontalmente
        width: '100%', // Asegura que el co
    },
    card: {
        width: '30%',
        backgroundColor: '#e0f7fa',
        borderRadius: 10,
        alignItems: 'center',
        padding: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00796b',
        marginBottom: 10,
        textAlign: 'center',
    },
    image: {
        width: 60,
        height: 60,
        marginBottom: 10,
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 15,
        backgroundColor: '#00796b',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantity: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00796b',
    },
    dynamicImage: {
        width: 70,
        height: 70,
        marginTop: 10,
    },
    buttonsContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20, 
        marginTop: 20,
    },
    arrowButton: {
        backgroundColor: '#e0f7fa',
        padding: 20,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    enviarButton: {
        backgroundColor: '#00796b',
        paddingVertical: 16,
        paddingHorizontal: 30,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    enviarButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});


export default NumeroMenuScreen;
