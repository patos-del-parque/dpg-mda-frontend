import React, { useState } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
type NumeroMenuScreenRouteProp = RouteProp<RootStackParamList, 'NumeroMenuScreen'>;

const NumeroMenu: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const route = useRoute<NumeroMenuScreenRouteProp>();
    const { nombreAula, imageAula } = route.params; // Obtiene el nombre del aula pasado como parámetro
    
    const menus = [
        { id: 1, title: 'MENU 1', description: 'CARNE', image: 'https://media.istockphoto.com/id/1371751060/es/foto/bistec-de-ternera-de-solomillo-o-filete-de-rabadilla-a-la-parrilla-medium-rare-en-una-bandeja.jpg?s=612x612&w=0&k=20&c=dfOZFPv5l5zaGJnWomynI7v2VWeqAREWfo8iRDMkie0=' },
        { id: 2, title: 'MENU 2',  description: 'TRITURADO', image: 'https://farm8.staticflickr.com/7033/6796616701_453b354444_b.jpg' },
        { id: 3, title: 'MENU 3',  description: 'VEGETARIANO', image: 'https://www.fithappysisters.com/Portals/FitHappySister/Mercadillo/files/Receta-Vegetariana_-Budha-bowl-Horizontal.jpg' },
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
                        <Image source={{ uri: menus[menuIndex].image }} style={styles.image} />
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
            <FontAwesome name="arrow-right" size={50} color="#00796b" />
            </TouchableOpacity>
            {menuIndex === 2 && (
                    <TouchableOpacity 
                        style={styles.enviarButton} 
                        onPress={() => handleCreateTasks()}
                    >
                        <Text style={styles.enviarButtonText}>ENVIAR</Text>
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
        backgroundColor: '#EDE7F6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#00796b',
        marginBottom: 20,
    },
    description: {
        fontSize: 28,
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
        width: '50%',
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
        fontSize: 28,
        fontWeight: 'bold',
        color: '#00796b',
        marginBottom: 10,
        textAlign: 'center',
    },
    image: {
        width: 120,
        height: 120,
        marginBottom: 15,
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        width: 70,
        height: 70,
        borderRadius: 15,
        backgroundColor: '#00796b',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        margin: 30,
        padding: 30,
        gap:60,
    },
    buttonText: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    quantity: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#00796b',
    },
    dynamicImage: {
        width: 100, // Imagen dinámica más grande
        height: 100,
        marginTop: 15,
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
        fontSize: 26,
        fontWeight: 'bold',
    },
});


export default NumeroMenu;
