import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import InicioSesionScreen from "./screens/IniciarSesionScreen";
import RegistroUsuarioScreen from "./screens/RegistroUsuarioScreen";
import InicioScreen from "./screens/InicioScreen";
import ComunidadesScreen from "./screens/ComunidadesScreen";
import MapaScreen from "./screens/MapaScreen";
import VerComunidadScreen from "./screens/VerComunidadScreen";
import OrdenarScreen from "./screens/OrdenarScreen";
import NotificacionesScreen from './screens/NotificacionesScreen';
import AjustesScreen from './screens/AjustesScreen'; 
import AgregarTaqueriaScreen from "./screens/AgregarTaqueriaScreen";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF8C00",
        tabBarStyle: {
          backgroundColor: "#FFF",
          borderTopColor: "#FF8C00",
          height: 60,
          paddingBottom: 6,
          paddingTop: 6,
        },
      }}
    >
      <Tab.Screen
        name="INICIO"
        component={InicioScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="COMUNIDADES"
        component={ComunidadesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MAPA"
        component={MapaScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" size={size} color={color} />
          ),
        }}
      />
      
      <Tab.Screen
        name="AJUSTES"
        component={AjustesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="InicioSesion"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="InicioSesion" component={InicioSesionScreen} />
        <Stack.Screen name="Registro" component={RegistroUsuarioScreen} />
        <Stack.Screen name="VerComunidad" component={VerComunidadScreen} />
        <Stack.Screen name="Ordenar" component={OrdenarScreen} />
        <Stack.Screen
          name="Notificaciones"
          component={NotificacionesScreen}
          options={{ headerShown: false }}
        />

       
        <Stack.Screen 
            name="AgregarTaqueria" 
            component={AgregarTaqueriaScreen} 
            options={{ title: 'Registrar Taquería', headerShown: true }} 
        />
        
        
        <Stack.Screen name="Tabs" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}