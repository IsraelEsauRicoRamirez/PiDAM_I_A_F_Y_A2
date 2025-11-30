import React from "react";
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

const { width } = Dimensions.get("window");

export default function ComunidadesScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FF8C00" barStyle="light-content" />

      {/* Header con logo + título + íconos */}
      <View style={styles.header}>
        <View style={styles.logoTitle}>
          <Image source={require("../assets/tacoLogo.png")} style={styles.logo} />
          <Text style={styles.headerTitle}>Mi Vecino el Taco</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.navigate("Notificaciones")}>
            <Ionicons name="notifications-outline" size={24} color="#1F1F1F" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Título de sección */}
      <Text style={styles.sectionTitle}>COMUNIDADES</Text>
      <Text style={styles.subTitle}>2 TAQUERÍAS GUARDADAS</Text>

      {/* Lista de taquerías guardadas */}
      <ScrollView contentContainerStyle={styles.scroll}>
        {[
          {
            nombre: "TAQUERÍA “EL PAISA”",
            direccion: "Av. Reforma 123, Centro",
            miembros: "480 miembros",
            distancia: "0.5 km",
            imagen: require("../assets/tacos1.png"),
          },
          {
            nombre: "TAQUERÍA “EL PATA”",
            direccion: "Av. Zapata 115, Centro",
            miembros: "560 miembros",
            distancia: "1.2 km",
            imagen: require("../assets/tacos2.png"),
          },
        ].map((taco, index) => (
          <View key={index} style={styles.card}>
            <Image source={taco.imagen} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.name}>{taco.nombre}</Text>
              <Text style={styles.details}>{taco.direccion}</Text>
              <Text style={styles.details}>{taco.miembros} · {taco.distancia}</Text>
              <Text style={styles.rating}>⭐ 4.9</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate("VerComunidad")}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
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
  logoTitle: { flexDirection: "row", alignItems: "center" },
  logo: { width: 48, height: 48, resizeMode: "contain", marginRight: 10 },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#1F1F1F" },
  headerIcons: { flexDirection: "row", alignItems: "center" },
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
  scroll: { paddingHorizontal: 20, paddingBottom: 20 },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FF8C00",
    overflow: "hidden",
  },
  cardImage: { width: "100%", height: 160 },
  cardContent: { padding: 14 },
  name: { fontSize: 16, fontWeight: "bold", color: "#1F1F1F", marginBottom: 4 },
  details: { fontSize: 14, color: "#666", marginBottom: 2 },
  rating: { fontSize: 14, color: "#FF8C00", marginVertical: 6 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  button: {
    backgroundColor: "#FF8C00",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: { color: "#FFF", fontWeight: "bold", fontSize: 12 },
  buttonOutline: {
    borderColor: "#FF8C00",
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonOutlineText: { color: "#FF8C00", fontWeight: "bold", fontSize: 12 },
});
