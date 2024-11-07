import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, Pressable  } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import { FontAwesome } from '@expo/vector-icons';


interface LoginTextprops {
  ruta: String;
  ruta2: String;
}

const UserMenu: React.FC<LoginTextprops> = ({ ruta,ruta2 }) => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleCreateTasks = () => {
        //console.log("Pulsar Boton");
        navigation.navigate(ruta as keyof RootStackParamList);
    };

    /* const handleAssingTasks = () => {
      //console.log("Pulsar Boton");
      navigation.navigate(ruta1 as keyof RootStackParamList);
    };
 */
    const handleCreateTasks1 = () => {
      navigation.navigate(ruta2 as keyof RootStackParamList);
    };

    const handleRegisterStudent = () => {
      //console.log("Pulsar Boton");
      navigation.navigate(ruta2 as keyof RootStackParamList);
    };

    return(
      <View style={styles.container}>
      <Text style={styles.title}>Panel de Administración</Text>

      <Pressable style={styles.button} onPress={handleCreateTasks}>
        <FontAwesome name="tasks" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Ver Tareas</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={handleCreateTasks1}>
        <FontAwesome name="user-plus" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Seleccionar Menús</Text>
      </Pressable>
    </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f8ff',
      padding: 20,
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#007BFF',
      marginBottom: 30,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#007BFF',
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginVertical: 10,
      width: '80%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    icon: {
      marginRight: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  
  export default UserMenu;