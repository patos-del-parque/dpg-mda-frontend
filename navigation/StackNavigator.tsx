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
import ModifySkillsScreen from '@/screen/ModifySkillsScreen';
import NumeroMenuScreen from '@/screen/NumeroMenuScreen';
import AssignTaskScreen from '@/screen/AssignTaskScreen';
import RequestMaterials from '@/screen/RequestMaterialsScreen';
import ListStudentScreen from '@/screen/ListStudentScreen';
import ListTeacherScreen from '@/screen/ListTeacherScreen';
import TaskScreen from '@/screen/TaskScreen';
import StudentsScreen from '@/screen/StudentsScreen';
import TeacherAdminScreen from '@/screen/TeacherAdminScreen';
import AssignMaterialsRequestsScreen from '@/screen/AssingMaterialsRequestsScreen';
import SpecificTaskScreen from '@/screen/SpecificTaskScreen';
import ListMaterialScreen from '@/screen/ListMaterialsScreen';
import MaterialsScreen from '@/screen/MaterialsScreen';
import RegisterMaterialScreen from '@/screen/RegisterMaterialScreen';
import SeeRequestMaterialScreen from '@/screen/SeeRequestMaterialScreen';
import ModifyMaterialScreen from '@/screen/ModifyMaterialScreen';
import SeeTaskProgressScreen from '@/screen/SeeTaskProgressScreen';
import EditUserTaskScreen from '@/screen/EditUserTaskScreen';
import ListTaskScreen from '@/screen/ListTaskScreen';
import EditTaskScreen from '@/screen/EditTaskScreen';


export type RootStackParamList = {
  Home: undefined;
  Galeria: undefined;
  LoginAdmin: undefined;
  LoginTeacher: undefined;
  LoginStudentDefault: { idPhoto: String, foto: String};
  Admin: undefined;
  Teacher:undefined;
  TaskMenu: undefined;
  RegisterStudent: undefined;
  ModifyStudent: { name: string };
  ModifyMaterial: { name: string }
  EraseStudent: { name: string };
  RegisterTeacher: undefined;
  EraseTeacher: { name: string };
  UserMenuScreen : { name: string, isComedorActive: boolean };
  UserTaskScreen : { name: string};
  EditUserTaskScreen : { name: string};
  ModifySkillsScreen : { name: string };
  RequestMaterials: undefined;
  ModifyTeacher: { name: string };
  TaskScreen: undefined;
  ListStudent: undefined;
  ListTeacher: undefined;
  MenuStudentScreen: {taskCompleted: boolean, nombreAula: string};
  AssignTaskScreen: {name: string};
  NumeroMenuScreen: { nombreAula: string, imageAula:string};
  StudentsScreen: undefined;
  TeacherAdminScreen: undefined;
  SpecificTaskScreen: undefined;
  AssignMaterialsRequestsScreen: {name: string};
  DaltonicoLoginScreen: { idPhoto: String};
  ListMaterialScreen: undefined;
  MaterialsScreen: undefined;
  RegisterMaterialScreen: undefined;
  SeeRequestMaterialScreen: undefined;
  SeeTaskProgressScreen: undefined;
  ListTaskScreen: undefined;
  EditTaskScreen: { taskNameOriginal: String };
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
      <Stack.Screen name="ModifyMaterial" component={ModifyMaterialScreen}/>
      <Stack.Screen name="EraseStudent" component={EraseStudentScreen}/> 
      <Stack.Screen name="RegisterTeacher" component={RegisterTeacherScreen}/>
      <Stack.Screen name="EraseTeacher" component={EraseTeacherScreen}/>
      <Stack.Screen name="ModifyTeacher" component={ModifyTeacherScreen}/>
      <Stack.Screen name="UserMenuScreen" component= {UserMenuScreen}/>
      <Stack.Screen name="UserTaskScreen" component= {UserTaskScreen}/>
      <Stack.Screen name="EditUserTaskScreen" component= {EditUserTaskScreen}/>
      <Stack.Screen name="ModifySkillsScreen" component= {ModifySkillsScreen}/>
      <Stack.Screen name="MenuStudentScreen" component= {MenuStudentScreen}/>
      <Stack.Screen name="NumeroMenuScreen" component= {NumeroMenuScreen}/>
      <Stack.Screen name="AssignTaskScreen" component= {AssignTaskScreen}/>
      <Stack.Screen name="ListStudent" component= {ListStudentScreen}/>
      <Stack.Screen name="ListTeacher" component= {ListTeacherScreen}/> 
      <Stack.Screen name="TaskScreen" component= {TaskScreen}/>    
      <Stack.Screen name="StudentsScreen" component= {StudentsScreen}/>    
      <Stack.Screen name="TeacherAdminScreen" component= {TeacherAdminScreen}/>
      <Stack.Screen name="AssignMaterialsRequestsScreen" component= {AssignMaterialsRequestsScreen}/>
      <Stack.Screen name="SpecificTaskScreen" component= {SpecificTaskScreen}/>
      <Stack.Screen name="DaltonicoLoginScreen" component= {LoginStudentDefault}/>
      <Stack.Screen name="ListMaterialScreen" component= {ListMaterialScreen} />
      <Stack.Screen name="MaterialsScreen" component= {MaterialsScreen} />
      <Stack.Screen name="RegisterMaterialScreen" component= {RegisterMaterialScreen} />         
      <Stack.Screen name="SeeRequestMaterialScreen" component= {SeeRequestMaterialScreen} /> 
      <Stack.Screen name="SeeTaskProgressScreen" component= {SeeTaskProgressScreen} />
      <Stack.Screen name ="ListTaskScreen" component={ListTaskScreen} />  
      <Stack.Screen name ="EditTaskScreen" component={EditTaskScreen} />  

    </Stack.Navigator>
  );
};

export default StackNavigator;
