import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert  } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';


interface LoginTextprops {
  ruta: String;
  url: String;
}

const LoginText: React.FC<LoginTextprops> = ({ ruta,url }) => {

  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  
  const pressLoginButton = async () => {
    //navigation.navigate(ruta as keyof RootStackParamList);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombre, password: password }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok && data.success) {
        // Login exitoso
        Alert.alert("Inicio de sesión correcto", "Bienvenido de nuevo");
        navigation.navigate(ruta as keyof RootStackParamList);
      } else {
        // Error en el login
        Alert.alert("Error", data.message || "Correo o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      Alert.alert("Error", "No se pudo iniciar sesión. Intente nuevamente.");
    }
  };

  return(
    <View style={styles.container}>
      <Text style={styles.header}>Inicio Sesión</Text>
      <View style={styles.formContainer}>
        
        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={24} color="#007BFF" style={styles.icon} />
          <TextInput 
            style={styles.input} 
            placeholder="Correo Electrónico" 
            keyboardType="email-address" 
            value={nombre} 
            onChangeText={setNombre}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={24} color="#007BFF" style={styles.icon} />
          <TextInput 
            style={styles.input} 
            placeholder="Contraseña" 
            secureTextEntry
            value={password}
            onChangeText={setPassword} 
          />
          </View>
      
        <Pressable style={styles.button} onPress={pressLoginButton}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </Pressable>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#007BFF',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    borderBottomColor: '#007BFF', 
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
  export default LoginText;
