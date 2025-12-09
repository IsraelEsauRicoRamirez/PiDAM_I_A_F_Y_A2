import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, ScrollView, SafeAreaView } from "react-native";

export default function App() {
  const [mostrarSplash, setMostrarSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarSplash(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  if (mostrarSplash) {
    return (
      <View style={styles.splash}>
        <Text style={styles.splashTexto}>CocinApp</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={{
          uri: "https://img.freepik.com/foto-gratis/concepto-ingredientes-cocina-vista-superior-espacio-copia_23-2148601307.jpg"
        }}
        style={styles.fondo}
      >
        <Text style={styles.titulo}>Mis Recetas</Text>

        <ScrollView style={{ width: "100%" }}>
          <View style={styles.card}>
            <Text style={styles.nombre}>Spaghetti a la Boloñesa</Text>
            <Text style={styles.tiempo}>Tiempo: 40 min</Text>
            <Text style={styles.receta}>
              Ingredientes: pasta, carne molida, tomate, cebolla, ajo, especias. 
              Preparación: Cocer pasta, sofreír carne con verduras, agregar salsa y mezclar.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.nombre}>Enchiladas Verdes</Text>
            <Text style={styles.tiempo}>Tiempo: 30 min</Text>
            <Text style={styles.receta}>
              Ingredientes: tortillas, pollo, salsa verde, crema, queso. 
              Preparación: Rellenar tortillas con pollo, bañar con salsa y gratinar.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.nombre}>Tacos de Carne Asada</Text>
            <Text style={styles.tiempo}>Tiempo: 20 min</Text>
            <Text style={styles.receta}>
              Ingredientes: carne asada, tortillas, limón, cilantro, cebolla. 
              Preparación: Asar carne, picar ingredientes y servir en tortilla.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.nombre}>Huevos a la Mexicana</Text>
            <Text style={styles.tiempo}>Tiempo: 10 min</Text>
            <Text style={styles.receta}>
              Ingredientes: huevo, tomate, cebolla, chile. 
              Preparación: Sofreír verduras y agregar huevo batido.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.nombre}>Quesadillas de Champiñón</Text>
            <Text style={styles.tiempo}>Tiempo: 15 min</Text>
            <Text style={styles.receta}>
              Ingredientes: champiñones, queso, tortillas, mantequilla. 
              Preparación: Saltear champiñón, armar quesadilla y dorar.
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000"
  },
  splashTexto: {
    fontSize: 40,
    color: "white",
    fontWeight: "bold"
  },
  fondo: {
    flex: 1,
    padding: 20,
    alignItems: "center"
  },
  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textShadowColor: "#000",
    textShadowRadius: 6
  },
  card: {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 10
  },
  nombre: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5
  },
  tiempo: {
    fontSize: 16,
    color: "#ddd",
    marginBottom: 10
  },
  receta: {
    fontSize: 15,
    color: "#fff"
  }
});