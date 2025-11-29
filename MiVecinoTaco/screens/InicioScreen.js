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
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function InicioScreen() {
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
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="#1F1F1F" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 16 }}>
            <Ionicons name="person-circle-outline" size={28} color="#1F1F1F" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Saludo */}
      <Text style={styles.greeting}>¡HOLA, USUARIO!</Text>

      {/* Imagen del mapa */}
      <View style={styles.mapContainer}>
        <Image
          source={require("../assets/mapa.png")}
          style={styles.mapImage}
          resizeMode="cover"
        />
      </View>

      {/* Lista de taquerías */}
      <ScrollView contentContainerStyle={styles.scroll}>
        {[
          { nombre: "TAQUERÍA “EL PAISA”", rating: "⭐ 4.9", distancia: "📍 0.5km" },
          { nombre: "TAQUERÍA “EL PATA”", rating: "⭐ 4.4", distancia: "📍 1.2km" },
          { nombre: "TAQUERÍA “LOS COMPAS”", rating: "⭐ 4.7", distancia: "📍 0.8km" },
          { nombre: "TAQUERÍA “LA ESQUINA”", rating: "⭐ 4.5", distancia: "📍 1.5km" },
          { nombre: "TAQUERÍA “EL SABOR”", rating: "⭐ 4.8", distancia: "📍 2.0km" },
        ].map((taco, index) => (
          <View key={index} style={styles.card}>
            <View>
              <Text style={styles.name}>{taco.nombre}</Text>
              <Text style={styles.details}>{taco.rating}     {taco.distancia}</Text>
            </View>
            <FontAwesome name="heart-o" size={24} color="#FF8C00" />
          </View>
        ))}
      </ScrollView>

      {/* Barra de navegación inferior alineada */}
      <View style={styles.navBar}>
        {[
          { icon: "people", label: "COMUNIDADES" },
          { icon: "home", label: "INICIO" },
          { icon: "map", label: "MAPA" },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.navItem}>
            <Ionicons name={item.icon} size={24} color="#1F1F1F" />
            <Text style={styles.navText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
  greeting: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1F1F1F",
    textAlign: "center",
    marginVertical: 15,
  },
  mapContainer: {
    height: 180,
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#FF8C00",
  },
  mapImage: { width: "100%", height: "100%" },
  scroll: { paddingHorizontal: 20, paddingBottom: 20 },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FF8C00",
  },
  name: { fontSize: 16, fontWeight: "bold", color: "#1F1F1F" },
  details: { fontSize: 14, color: "#666", marginTop: 4 },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.08,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#FF8C00",
    backgroundColor: "#FFF",
  },
  navItem: { alignItems: "center", flex: 1 },
  navText: { fontSize: 12, color: "#1F1F1F", marginTop: 4, textAlign: "center" },
});
