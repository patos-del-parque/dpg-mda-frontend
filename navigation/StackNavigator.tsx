// src/navigation/StackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screen/HomeScreen';
import GalleryScreen from '../screen/GalleryScreen';
import LoginAdminScreen from '@/screen/LoginAdminScreen';
import LoginTeacherScreen from '@/screen/LoginTeacherScreen';
import LoginStudentDefault from '@/screen/LoginStudentDefault';
import AdminScreen from '@/screen/AdminScreen';
import TeacherScreen from '@/screen/TeacherScreen';
import CreateTaskScreen from '@/screen/CreateTaskScreen';
import RegisterStudentScreen from '@/screen/RegisterStudentScreen';
import ModifyStudentScreen from '@/screen/ModifyStudentScreen';
import EraseStudentScreen from '@/screen/EraseStudentScreen';
import RegisterTeacherScreen from '@/screen/RegisterTeacherScreen';
import ModifyTeacherScreen from '@/screen/ModifyTeacherScreen';
import EraseTeacherScreen from '@/screen/EraseTeacherScreen';
import UserMenuScreen from '@/screen/UserMenuScreen';
import UserTaskScreen from '@/screen/UserTaskScreen';
import MenuStudentScreen from '@/screen/MenuStudentScreen';
import ModififySkillsScreen from '@/screen/ModifySkillsScreen';
import NumeroMenuScreen from '@/screen/NumeroMenuScreen';
import AssignTaskScreen from '@/screen/AssignTaskScreen';
import RequestMaterials from '@/screen/RequestMaterialsScreen';
import ListStudentScreen from '@/screen/ListStudentScreen';



export type RootStackParamList = {
  Home: undefined;
  Galeria: undefined;
  LoginAdmin: undefined;
  LoginTeacher: undefined;
  LoginStudentDefault: { idPhoto: String};
  Admin: undefined;
  Teacher:undefined;
  TaskMenu: undefined;
  RegisterStudent: undefined;
  ModifyStudent: undefined;
  EraseStudent: undefined;
  RegisterTeacher: undefined;
  EraseTeacher: undefined;
  UserMenuScreen : undefined;
  UserTaskScreen : undefined;
  ModifySkillsScreen : undefined;
  RequestMaterials: undefined;
  ModifyTeacher: undefined;
  ListStudent: undefined;
  MenuStudentScreen: {taskCompleted: boolean, nombreAula: string};
  AssignTaskScreen: undefined;
  NumeroMenuScreen: { nombreAula: string, imageAula:string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Galeria" component={GalleryScreen} />
      <Stack.Screen name="LoginAdmin" component={LoginAdminScreen} />
      <Stack.Screen name="LoginTeacher" component={LoginTeacherScreen} />
      <Stack.Screen name="LoginStudentDefault" component={LoginStudentDefault} />
      <Stack.Screen name="Admin" component={AdminScreen} />
      <Stack.Screen name="Teacher" component={TeacherScreen} />
      <Stack.Screen name="RequestMaterials" component= {RequestMaterials}/>
      <Stack.Screen name="TaskMenu" component={CreateTaskScreen}/>
      <Stack.Screen name="RegisterStudent" component={RegisterStudentScreen}/>
      <Stack.Screen name="ModifyStudent" component={ModifyStudentScreen}/>
      <Stack.Screen name="EraseStudent" component={EraseStudentScreen}/> 
      <Stack.Screen name="RegisterTeacher" component={RegisterTeacherScreen}/>
      <Stack.Screen name="EraseTeacher" component={EraseTeacherScreen}/>
      <Stack.Screen name="ModifyTeacher" component={ModifyTeacherScreen}/>
      <Stack.Screen name="UserMenuScreen" component= {UserMenuScreen}/>
      <Stack.Screen name="UserTaskScreen" component= {UserTaskScreen}/>
      <Stack.Screen name="ModifySkillsScreen" component= {ModififySkillsScreen}/>
      <Stack.Screen name="MenuStudentScreen" component= {MenuStudentScreen}/>
      <Stack.Screen name="NumeroMenuScreen" component= {NumeroMenuScreen}/>
      <Stack.Screen name="AssignTaskScreen" component= {AssignTaskScreen}/>
      <Stack.Screen name="ListStudent" component= {ListStudentScreen}/>    
    </Stack.Navigator>
  );
};

export default StackNavigator;
