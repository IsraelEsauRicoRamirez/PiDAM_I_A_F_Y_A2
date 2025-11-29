import { Text, StyleSheet, View, Button } from 'react-native'
import React, { Component, useState } from 'react'
import VerComunidadScreen from './VerComunidadScreen'
import IniciarSesionScreen from './IniciarSesionScreen'
import InicioScreen from './InicioScreen'
import ComunidadesScreen from './ComunidadesScreen'
import MapaScreen from './MapaScreen'
import AjustesScreen from './AjustesScreen'
import NotificacionesScreen from './NotificacionesScreen'
import RegistroUsuarioScreen from './RegistroUsuarioScreen'
import OrdenarScreen from './OrdenarScreen'
import PerfilScreen from './PerfilScreen'



export default function MenuScreen() {

    const[screen, setScreen]=useState('menu')

    switch(screen){

        case 'Ver': 
            return <VerComunidadScreen/>
        case 'Iniciar':
            return <IniciarSesionScreen/>
        case 'Inicio':
        return <InicioScreen/>
        case 'Comunidad':
            return <ComunidadesScreen/>
        case 'Mapa':
            return <MapaScreen/>
        case 'Ajustes':
            return <AjustesScreen/>
        case 'Notis':
            return <NotificacionesScreen/>
        case 'Registrarse':
            return <RegistroUsuarioScreen/>
        case 'order':
            return <OrdenarScreen/>
        case 'perfil':
            return <PerfilScreen/>
       
        case 'menu':
            default:
            return (

      <View style={styles.container2}>
        
        <Text  style={styles.texto2}>Menu Screens "Mi vecino el taco" :</Text>
        <View style={styles.contenedorBotones2}>
       <Button color="#FFB86A" onPress={()=>setScreen('Ver')} title='Ver comunidad  '/>
       <Button color="#FEE685"onPress={()=>setScreen('Iniciar')} title='Inicio de sesion'/>
       <Button color="#31C950"onPress={()=>setScreen('Inicio')} title='Inicio'/>
       <Button color="#37BC7D" onPress={()=>setScreen('Comunidad')} title='Comunidades'/>
        <Button color="#721378" onPress={()=>setScreen('Mapa')} title='Mapa de taquerias'/>
       <Button color="#FF637E"onPress={()=>setScreen('Ajustes')} title='Ajustes'/>
       <Button color="#016630"onPress={()=>setScreen('Notis')} title='Notificaciones'/>
       <Button color="#21BCFF" onPress={()=>setScreen('Registrarse')} title='Registro se usuario'/>
        <Button color="#ff2121ff" onPress={()=>setScreen('order')} title='Ordenar'/>
            <Button color="#ebdc13ff" onPress={()=>setScreen('perfil')} title='Perfil'/>
       
        </View>
      </View>
    )
       

    }
  
   
}


const styles = StyleSheet.create({
container2: {
    flex: 1,
    backgroundColor: '#2D9966',
    alignItems: 'center',
    justifyContent: 'center',
  },

contenedorBotones2:{
    marginTop:15,
    
    gap:15


  },
    texto2:{

   color:'#FEF9C2',
    fontSize:30,
    fontFamily: 'Time New Roman',
    fontWeight:'bold',
    fontStyle:'italic',
    textDecorationLine:'underline'


  },
  })