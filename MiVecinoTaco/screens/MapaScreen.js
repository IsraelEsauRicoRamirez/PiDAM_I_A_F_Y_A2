import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function MapaScreen({ navigation }) {
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
      <Text style={styles.sectionTitle}>MAPA DE TAQUERÍAS</Text>

      {/* Imagen del mapa (tú colocas mapa.png en assets) */}
      <View style={styles.mapContainer}>
        <Image
          source={require("../assets/mapa.png")}
          style={styles.mapImage}
          resizeMode="cover"
        />
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
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1F1F1F",
    textAlign: "center",
    marginVertical: 15,
  },
  mapContainer: {
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#FF8C00",
    marginBottom: 20,
  },
  mapImage: { width: "100%", height: "100%" },
});
