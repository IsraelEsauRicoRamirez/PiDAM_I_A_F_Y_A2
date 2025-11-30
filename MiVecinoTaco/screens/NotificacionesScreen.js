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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function NotificacionesScreen({ navigation }) {
  const notificaciones = [
    {
      tipo: "pedido",
      titulo: "Pedido Confirmado",
      descripcion: "Tu pedido en Tacos El Otero ha sido confirmado. Tiempo estimado: 15 min.",
      tiempo: "Hace 5 min",
      icono: require("../assets/icono_pedido.png"),
    },
    {
      tipo: "mensaje",
      titulo: "Nuevo mensaje en comunidad",
      descripcion: 'Juan comentó en Taquería La Esquina: “¿Tienen tacos de pastor hoy?”',
      tiempo: "Hace 1 hora",
      icono: require("../assets/icono_mensaje.png"),
    },
    {
      tipo: "promo",
      titulo: "¡Promoción especial! 🎉",
      descripcion: "Don Tacos ofrece 2x1 en tacos de asada hasta las 9 PM.",
      tiempo: "Hace 2 horas",
      icono: require("../assets/icono_promo.png"),
    },
    {
      tipo: "ubicacion",
      titulo: "Nueva taquería cerca",
      descripcion: "Tacos Don Chuy abrió a 0.3 km de tu ubicación.",
      tiempo: "Hace 1 día",
      icono: require("../assets/icono_mapa.png"),
    },
    {
      tipo: "mencion",
      titulo: "Te mencionaron",
      descripcion: "María te mencionó en un comentario de Tacos El Paso.",
      tiempo: "Hace 1 día",
      icono: require("../assets/icono_mensaje.png"),
    },
    {
      tipo: "promo",
      titulo: "¡Promoción especial! 🎉",
      descripcion: "Tacos La Esquina ofrece 2x1 en tacos de asada hasta las 10 PM.",
      tiempo: "Hace 2 días",
      icono: require("../assets/icono_promo.png"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#1F1F1F" />
        </TouchableOpacity>

        <View style={styles.logoTitle}>
          <Image source={require("../assets/tacoLogo.png")} style={styles.logo} />
          <Text style={styles.headerTitle}>Mi Vecino el Taco</Text>
        </View>

        <View style={{ width: 40 }} />
      </View>
      <StatusBar backgroundColor="#FF8C00" barStyle="light-content" />
      <Text style={styles.title}>NOTIFICACIONES</Text>

      <ScrollView contentContainerStyle={styles.scroll}>
        {notificaciones.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <Image source={item.icono} style={styles.icono} />
              <Text style={styles.cardTitle}>{item.titulo}</Text>
              <TouchableOpacity>
                <Ionicons name="close" size={20} color="#999" />
              </TouchableOpacity>
            </View>
            <Text style={styles.cardDescription}>{item.descripcion}</Text>
            <Text style={styles.cardTime}>{item.tiempo}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.clearButton}>
          <Text style={styles.clearText}>Limpiar todas</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1F1F1F",
    textAlign: "center",
    marginVertical: 15,
  },
  scroll: { paddingHorizontal: 20, paddingBottom: 30 },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FF8C00",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  icono: { width: 24, height: 24, resizeMode: "contain", marginRight: 8 },
  cardTitle: { fontSize: 15, fontWeight: "bold", color: "#1F1F1F", flex: 1 },
  cardDescription: { fontSize: 14, color: "#333", marginBottom: 6 },
  cardTime: { fontSize: 12, color: "#888" },
  clearButton: {
    backgroundColor: "#FF8C00",
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },
  clearText: { color: "#FFF", fontWeight: "bold", fontSize: 14 },

  header: {
    backgroundColor: "#FF8C00",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    elevation: 4,
  },
  logoTitle: { flexDirection: "row", alignItems: "center" },
  logo: { width: 48, height: 48, resizeMode: "contain", marginRight: 10 },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#1F1F1F" },
});
