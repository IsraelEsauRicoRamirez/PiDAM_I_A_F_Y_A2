import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native"; 
import { getAllTaquerias } from "../database/Database";

const { width } = Dimensions.get("window");

export default function ComunidadesScreen({ navigation }) {
  const normalizar = (nombre) => {
  return nombre
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // quita acentos
    .replace(/["“”]/g, "") // quita comillas
    .trim();
};

  const [taquerias, setTaquerias] = useState([]);

  
  const cargarTaquerias = async () => {
    try {
      const dbResult = await getAllTaquerias();
      setTaquerias(dbResult);
    } catch (error) {
      console.error("Error al cargar taquerías:", error);
    }
  };



  useFocusEffect(
    useCallback(() => {
      cargarTaquerias();
    }, [])
  );

  const handleNavigateToAddTaqueria = () => {
    navigation.navigate('AgregarTaqueria');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FF8C00" barStyle="light-content" />

      <View style={styles.header}>
        <View style={styles.logoTitle}>
          <Image
            source={require("../assets/tacoLogo.png")}
            style={styles.logo}
          />
          <Text style={styles.headerTitle}>Mi Vecino el Taco</Text>
        </View>

        <View style={styles.headerIcons}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Notificaciones")}
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color="#1F1F1F"
            />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.sectionTitle}>COMUNIDADES</Text>
      
      <Text style={styles.subTitle}>{taquerias.length} TAQUERÍAS REGISTRADAS</Text>

      <ScrollView contentContainerStyle={styles.scroll}>
        
        {taquerias.length === 0 && (
            <Text style={{textAlign: 'center', marginTop: 50, color: '#999'}}>
                No hay taquerías registradas aún. ¡Agrega la primera!
            </Text>
        )}

        
        {taquerias.map((taco, index) => (
          <View key={index} style={styles.card}>
            
            <Image 
                source={require("../assets/tacos1.png")} 
                style={styles.cardImage} 
            />

            <View style={styles.cardContent}>
              <Text style={styles.name}>{taco.nombre}</Text>
              <Text style={styles.details}>{taco.direccion}</Text>
              <Text style={styles.details}>
                 {taco.telefono} · {taco.horario}
              </Text>

              <Text style={styles.rating}>⭐ 5.0 (Nuevo)</Text>

              <View style={styles.buttonRow}>
    <TouchableOpacity
  style={styles.button}
  onPress={() => {
    const nombreLimpio = normalizar(taco.nombre);
    navigation.navigate("VerComunidad", {
      comunidadNombre: nombreLimpio
    });
  }}
>
  <Text style={styles.buttonText}>VER COMUNIDAD</Text>
</TouchableOpacity>



                <TouchableOpacity
                  style={styles.buttonOutline}
                  onPress={() => navigation.navigate("Ordenar")}
                >
                  <Text style={styles.buttonOutlineText}>ORDENAR</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={styles.addButton}
        onPress={handleNavigateToAddTaqueria}
      >
        <Ionicons name="add" size={30} color="#FFF" />
      </TouchableOpacity>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    backgroundColor: "#FF8C00",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  logoTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 48,
    height: 48,
    resizeMode: "contain",
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F1F1F",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1F1F1F",
    textAlign: "center",
    marginTop: 15,
  },
  subTitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 80, 
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FF8C00",
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 160,
  },
  cardContent: {
    padding: 14,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F1F1F",
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  rating: {
    fontSize: 14,
    color: "#FF8C00",
    marginVertical: 6,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#FF8C00",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 12,
  },
  buttonOutline: {
    borderColor: "#FF8C00",
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonOutlineText: {
    color: "#FF8C00",
    fontWeight: "bold",
    fontSize: 12,
  },
  addButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#FF8C00', 
    borderRadius: 30,
    elevation: 8, 
    zIndex: 10, 
  },
});