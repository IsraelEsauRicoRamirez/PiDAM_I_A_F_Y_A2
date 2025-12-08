import { useEffect, useState } from 'react'
import { Text, StyleSheet, View, SafeAreaView, ImageBackground, TouchableOpacity, Alert } from 'react-native'
import { ScrollView } from 'react-native-web';

export default function ImageBackgroundScreen(){
  const [showSplash, setShowSplash] = useState(true)

  useEffect (() => {
    const timer = setTimeout (() => {
      setShowSplash(false);
    }, 4000);
    return () => clearTimeout(timer);
  },[]);

  
  const editarPerfil = () => {
    Alert.alert(
      "Editar Perfil",
      "¿Deseas guardar los cambios?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Guardar", onPress: () => console.log("Perfil guardado") }
      ]
    );
  };


  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <Text style={styles.splashText}> Cargando... </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source ={{
          uri: 'https://static.vecteezy.com/system/resources/thumbnails/013/039/130/small/sky-blue-galaxy-background-free-photo.jpg',
        }}
        style={styles.background}
      >
        <ScrollView>
          <View style={styles.overlay}>
            <Text style={styles.title}> Abraham Ordoñez Moreno</Text>

            <Text style={styles.text}> Soy Estudiante en ingenieria en sistemas</Text>
            <Text style={styles.text}></Text>
            <Text style={styles.text}> Trabajo y estudio actualmente me dedico a un negocio comercial</Text>
            <Text style={styles.text}> Me gusta practicar varios deportes, el gimnasio y el futbol. </Text>
            <Text style={styles.text}> Estado civil: soltero. </Text>
            <Text style={styles.text}></Text>
            <Text style={styles.text}> Correo electronico: 124049257@upq.edu.mx </Text>

            <TouchableOpacity style={styles.button} onPress={editarPerfil}>
              <Text style={styles.btnText}>Editar Perfil</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({

  splashContainer: {
    flex: 1, 
    backgroundColor: '#000000ff', 
    justifyContent: 'center', 
    alignItems: 'center', 
  },

  splashText: {
    fontSize: 24, 
    color: '#fff', 
  },

  background: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },

  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)', 
    padding: 20, 
    borderRadius: 10, 
    width: '100%',
    minHeight: 1000,
  },

  title: {
    fontSize: 30, 
    color: '#fff', 
    marginBottom: 10, 
    textAlign: 'center', 
  },

  text: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },

  button: {
    marginTop: 25,
    backgroundColor: "#4a90e2",
    paddingVertical: 12,
    borderRadius: 8,
  },

  btnText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  }
});