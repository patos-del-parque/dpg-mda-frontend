import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable, Image  } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import { FontAwesome } from '@expo/vector-icons';


interface LoginTextprops {
    ruta: String;
  }
  
  

  

const MenuStudent: React.FC<LoginTextprops> = ({ruta}) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
    const handleCreateTasks = () => {
        navigation.navigate(ruta as keyof RootStackParamList);
    };

    const menus = [
        {
          nombre: 'Menú 1',
          tipoComida: 'Vegetariana',
          ingredientes: ['Zanahorias', 'Calabacín', 'Tomates'],
          alergenos: ['Gluten'],
          horarioApertura: '12:00 PM',
          horarioCierre: '3:00 PM',
          image: 'https://reactnative.dev/docs/assets/p_cat2.png',
        },
        {
          nombre: 'Menú 2',
          tipoComida: 'Carne',
          ingredientes: ['Pollo', 'Patatas', 'Ensalada'],
          alergenos: ['Ninguno'],
          horarioApertura: '12:00 PM',
          horarioCierre: '3:00 PM',
          image: 'https://reactnative.dev/docs/assets/p_cat2.png',
        },
        {
          nombre: 'Menú 3',
          tipoComida: 'Pescado',
          ingredientes: ['Salmón', 'Espárragos', 'Arroz'],
          alergenos: ['Pescado'],
          horarioApertura: '12:00 PM',
          horarioCierre: '3:00 PM',
          image: 'https://reactnative.dev/docs/assets/p_cat2.png',
        },
      ];
    
      return (
        <ScrollView contentContainerStyle={styles.container}>
          {menus.map((menu, index) => (
            <View key={index} style={styles.card}>
              <Image source={{ uri: menu.image }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{menu.nombre}</Text>
                <Text style={styles.text}>Tipo de comida: {menu.tipoComida}</Text>
                <Text style={styles.text}>Ingredientes: {menu.ingredientes.join(', ')}</Text>
                <Text style={styles.text}>Alérgenos: {menu.alergenos.join(', ')}</Text>
                <Text style={styles.text}>Horario: {menu.horarioApertura} - {menu.horarioCierre}</Text>
              </View>
              <Pressable 
                style={styles.arrowButton}
                onPress={handleCreateTasks} 
              >
                <FontAwesome name="arrow-right" size={35} color="#00796b" />
              </Pressable>
            </View>
          ))}
        </ScrollView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        padding: 20,
        alignItems: 'center',
      },
      card: {
        flexDirection: 'row',
        width: '90%',
        padding: 20,
        marginVertical: 10,
        backgroundColor: '#e0f7fa',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
        alignItems: 'center',
      },
      image: {
        width: 95,
        height: 95,
        borderRadius: 10,
        marginRight: 15,
      },
      textContainer: {
        flex: 1,
      },
      title: {
        fontSize: 20,
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
        padding: 10,
      },
    });
    
    

export default MenuStudent;