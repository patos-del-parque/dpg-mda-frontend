import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

interface LoginTextprops {
  ruta: String;
  url: String;
}

const LoginText: React.FC<LoginTextprops> = ({ ruta, url }) => {
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const pressLoginButton = async () => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombre, password: password }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok && data.success) {
        console.log("Inicio de sesión correcto", "Bienvenido de nuevo");
        navigation.navigate(ruta as keyof RootStackParamList);
      } else {
        console.log("Error", data.message || "Correo o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      console.log("Error", "No se pudo iniciar sesión. Intente nuevamente.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.innerContainer}>
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
    </KeyboardAvoidingView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
  },
  innerContainer: {
    width: '100%',
    maxWidth: width > 600 ? '50%' : '90%', // Ajustar el ancho en tablets
    alignItems: 'center',
  },
  header: {
    fontSize: width > 600 ? 32 : 24, // Ajustar tamaño de fuente
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: width > 600 ? 30 : 20, // Ajustar el relleno en tablets
    borderRadius: 15, // Bordes más suaves
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, // Sombras más ligeras
    shadowRadius: 6,
    elevation: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#007BFF',
    borderWidth: 1,
    borderRadius: 10, // Bordes redondeados
    paddingHorizontal: 10,
    marginBottom: 20, // Más espacio entre campos
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: width > 600 ? 18 : 16, // Ajustar tamaño de texto
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: width > 600 ? 14 : 12, // Botones más grandes en tablets
    borderRadius: 10, // Botón más estilizado
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: width > 600 ? 20 : 16, // Ajustar tamaño de texto del botón
    fontWeight: 'bold',
  },
});

export default LoginText;


