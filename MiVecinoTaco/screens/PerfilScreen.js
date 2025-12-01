import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PerfilScreen() {
  const pedidos = [
    { nombre: "Tacos al Pastor", fecha: "20 Nov 2025", estado: "Entregado" },
    { nombre: "Agua de Horchata", fecha: "18 Nov 2025", estado: "Entregado" },
    { nombre: "Tacos de Bistec", fecha: "15 Nov 2025", estado: "Cancelado" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FF8C00" barStyle="light-content" />
      <Text style={styles.title}>MI PERFIL</Text>

      <ScrollView contentContainerStyle={styles.scroll}>
    
        <View style={styles.profileBox}>
          <Ionicons name="person-circle-outline" size={80} color="#FF8C00" />
          <Text style={styles.profileName}>Pompompurin</Text>
          <Text style={styles.profileEmail}>pompomp@p.pupedu.mx</Text>
          <Text style={styles.profilePhone}>📞 +52 833 155 0045</Text>
          <Text style={styles.profileAddress}>📍 Calle Morales 456, Col. Juárez</Text>
        </View>

        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>PREFERENCIAS</Text>
          <Text style={styles.sectionItem}>🔔 Notificaciones: Activadas</Text>
          <Text style={styles.sectionItem}>📍 Ubicación: Compartida</Text>
          <Text style={styles.sectionItem}>🌙 Modo Oscuro: Desactivado</Text>
        </View>

     
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>FAVORITOS</Text>
          <Text style={styles.sectionItem}>❤️ 5 productos guardados</Text>
        </View>

        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>HISTORIAL DE PEDIDOS</Text>
          {pedidos.map((item, idx) => (
            <View key={idx} style={styles.orderRow}>
              <Ionicons name="fast-food-outline" size={20} color="#FF8C00" />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.orderName}>{item.nombre}</Text>
                <Text style={styles.orderInfo}>
                  {item.fecha} • {item.estado}
                </Text>
              </View>
            </View>
          ))}
        </View>


        <View style={styles.optionsBox}>
          <TouchableOpacity style={styles.optionRow}>
            <Ionicons name="create-outline" size={22} color="#FF8C00" />
            <Text style={styles.optionText}>Editar Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionRow}>
            <Ionicons name="heart-outline" size={22} color="#FF8C00" />
            <Text style={styles.optionText}>Mis Favoritos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => navigation.navigate("Ajustes")}
          ></TouchableOpacity>
          <TouchableOpacity style={styles.optionRow}>
            <Ionicons name="settings-outline" size={22} color="#FF8C00" />
            <Text style={styles.optionText}>Ajustes</Text>
          </TouchableOpacity>
        </View>


        <View style={styles.footer}>
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
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
  profileBox: {
    alignItems: "center",
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FF8C00",
    backgroundColor: "#FFF8F0",
  },
  profileName: { fontSize: 18, fontWeight: "bold", color: "#1F1F1F", marginTop: 8 },
  profileEmail: { fontSize: 14, color: "#666", marginTop: 4 },
  profilePhone: { fontSize: 14, color: "#666", marginTop: 4 },
  profileAddress: { fontSize: 14, color: "#666", marginTop: 4, textAlign: "center" },
  sectionBox: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FF8C00",
    marginBottom: 20,
    padding: 14,
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#FF8C00", marginBottom: 8 },
  sectionItem: { fontSize: 14, color: "#1F1F1F", marginBottom: 4 },
  orderRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  orderName: { fontSize: 14, fontWeight: "bold", color: "#1F1F1F" },
  orderInfo: { fontSize: 12, color: "#666" },
  optionsBox: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FF8C00",
    marginBottom: 20,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },
  optionText: { fontSize: 15, color: "#1F1F1F", marginLeft: 10 },
  footer: { alignItems: "center", marginTop: 20 },
  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  logoutText: { color: "#FFF", fontWeight: "bold", fontSize: 14 },
});
