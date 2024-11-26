import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, Pressable  } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import { FontAwesome } from '@expo/vector-icons';


interface TeacherAdminMenuProps {
  route: keyof RootStackParamList;
  label: string;
  iconName: string;
}

const TeacherAdminMenu: React.FC<TeacherAdminMenuProps> = ({ route, label, iconName }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Pressable
      style={styles.button}
      onPress={() => navigation.navigate(route as any)}
    >
      <FontAwesome name={iconName} size={24} color="#fff" style={styles.icon} />
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
}

  const styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#007BFF',
      borderRadius: 5,
      marginBottom: 10,
    },
    icon: {
      marginRight: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
});

export default TeacherAdminMenu;