import React from 'react';
import { View, StyleSheet, Pressable ,Text} from 'react-native';
import UserMenu from  '../components/UserMenu'; 
import { useRoute } from '@react-navigation/native';
import { normalize } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const UserMenuScreen: React.FC = () =>{
  const navigation = useNavigation();
  const route = useRoute();
  const { name, isComedorActive } = route.params as { name: string, isComedorActive:boolean };
  const handleLogout = () => {
    // Redirigir al login
    navigation.navigate('Home'); // Cambia 'LoginScreen' por el nombre de tu pantalla de login
  };

return(
    <View style={styles.container}>
      < UserMenu ruta='UserTaskScreen' ruta2='MenuStudentScreen' 
      name={name} isComedorActive={isComedorActive}  /> 
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="sign-out" size={44} color="#fff" style={styles.logoutIcon} />
        <Text style={styles.logoutText}>SALIR</Text>
      </Pressable>
    </View>
    
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#EDE7F6',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#FF4F4F',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 38,
    fontWeight: 'bold',
  },
  logoutIcon: {
    marginRight: 0,
  },
});


export default UserMenuScreen;