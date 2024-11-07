// src/navigation/StackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screen/HomeScreen';
import GalleryScreen from '../screen/GalleryScreen';
import LoginAdminScreen from '@/screen/LoginAdminScreen';
import LoginStudentDefault from '@/screen/LoginStudentDefault';
import AdminScreen from '@/screen/AdminScreen';
import CreateTaskScreen from '@/screen/CreateTaskScreen';
import RegisterStudentScreen from '@/screen/RegisterStudentScreen';
import UserMenuScreen from '@/screen/UserMenuScreen';
import UserTaskScreen from '@/screen/UserTaskScreen';
import MenuStudentScreen from '@/screen/MenuStudentScreen';
import ModififySkillsScreen from '@/screen/ModifySkillsScreen';
import ListStudentScreen from '@/screen/ListStudentScreen';

export type RootStackParamList = {
  Home: undefined;
  Galeria: undefined;
  LoginAdmin: undefined;
  LoginStudentDefault: undefined;
  Admin: undefined;
  TaskMenu: undefined;
  RegisterStudent: undefined;
  UserMenuScreen : undefined;
  UserTaskScreen : undefined;
  ModifySkillsScreen : undefined;
  MenuStudentScreen: undefined;
  ListStudentScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Galeria" component={GalleryScreen} />
      <Stack.Screen name="LoginAdmin" component={LoginAdminScreen} />
      <Stack.Screen name="LoginStudentDefault" component={LoginStudentDefault} />
      <Stack.Screen name="Admin" component={AdminScreen} />
      <Stack.Screen name="TaskMenu" component={CreateTaskScreen}/>
      <Stack.Screen name="RegisterStudent" component={RegisterStudentScreen}/>
      <Stack.Screen name="UserMenuScreen" component= {UserMenuScreen}/>
      <Stack.Screen name="UserTaskScreen" component= {UserTaskScreen}/>
      <Stack.Screen name="ModifySkillsScreen" component= {ModififySkillsScreen}/>
      <Stack.Screen name="MenuStudentScreen" component= {MenuStudentScreen}/>
      <Stack.Screen name="ListStudentScreen" component= {ListStudentScreen}/>
    </Stack.Navigator>
  );
};

export default StackNavigator;
