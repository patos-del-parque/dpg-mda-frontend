import React from 'react';
import { View, Text, Image ,ImageBackground, StyleSheet, Button, Pressable  } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import { FontAwesome } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';

interface LoginTextprops {
  ruta: String;
  ruta2: String;
  name: String;
  isComedorActive: boolean; 
}

const UserMenu: React.FC<LoginTextprops> = ({ ruta, ruta2, name, isComedorActive }) => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleCreateTasks = () => {
        //console.log("Pulsar Boton");
        navigation.navigate(ruta as keyof RootStackParamList,{name});
    };

    /* const handleAssingTasks = () => {
      //console.log("Pulsar Boton");
      navigation.navigate(ruta1 as keyof RootStackParamList);
    };
 */
    const handleCreateTasks1 = () => {
      navigation.navigate(ruta2 as keyof RootStackParamList,{name});
    };

isComedorActive = true;
    return(
      <View style={styles.container}>
        <Text style={styles.title}>Panel de Estudiante</Text>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleCreateTasks}>
          <ImageBackground 
                      source={{uri : 'https://static.guiainfantil.com/media/27022/c/las-tareas-cuento-corto-para-ninos-que-no-quieren-hacer-los-deberes-sm.jpg'}} // Ruta de tu imagen

            style={styles.imageBackground} // Estilo para cubrir el botón
    imageStyle={styles.imageStyle} // Opcional: para ajustar bordes redondeados
  >
    <Text style={styles.buttonText}>TAREAS</Text>
  </ImageBackground>
          </Pressable>

          {isComedorActive && (
          <Pressable style={styles.button} onPress={handleCreateTasks1}>
          <ImageBackground 
                      source={{uri : 'https://media.istockphoto.com/id/1291415857/es/vector/ilustraci%C3%B3n-vectorial-de-dibujos-animados-de-una-ni%C3%B1a-comiendo-manzana-verde-y-mostrando.jpg?s=612x612&w=0&k=20&c=dI7Fjbgoglwgi0XoKJIVvjNcpIpKs2s0PjR2mt6AA_8='}} // Ruta de tu imagen

            style={styles.imageBackground} // Estilo para cubrir el botón
    imageStyle={styles.imageStyle} // Opcional: para ajustar bordes redondeados
  >
    <Text style={styles.buttonText}>MENÚ</Text>
  </ImageBackground>
          </Pressable>)}
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#EDE7F6',
      padding: 20,
    },
    title: {
      fontSize: 46,
      fontWeight: 'bold',
      color: '#007BFF',
      marginBottom: 30,
      position: 'absolute', // Posiciona absolutamente
    top: 10, // Espaciado desde la parte superior
    textAlign: 'center', // Centra el texto horizontalmente
    width: '100%', // Asegura que ocupe todo el ancho
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 1000,
      height: 500,
      paddingHorizontal: 10,
    },
    button: {
      flex: 1,
      marginHorizontal: 50,
      borderRadius: 10,
      overflow: 'hidden', // Asegura que la imagen no sobresalga de los bordes redondeados
      elevation: 5,
      justifyContent: 'flex-end',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    imageBackground: {
      flex: 1,
      justifyContent: 'flex-end', // Centra el texto verticalmente
      alignItems: 'center', // Centra el texto horizontalmente
      resizeMode: 'cover',  // Ajusta la imagen al tamaño del botón sin distorsionar
       width: '100%', // Asegura que la imagen ocupe todo el ancho disponible
    height: '100%'
    
  },

    imageStyle: {
      borderRadius: 10, // Bordes redondeados para la imagen de fondo
    },
    buttonText: {
      color: '#000', // Contrasta con la imagen
      fontSize: 28,
      textAlign: 'center',
      width :130,
      height:40,
      justifyContent: 'center',
      margin: 10,
      backgroundColor:'#ADD8E6',
      borderRadius: 10,  
      fontWeight: 'bold',
      textShadowColor: '#000', // Añade un sombreado para mejorar la visibilidad
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
      lineHeight: 45,
    },
  });
  
  export default UserMenu;