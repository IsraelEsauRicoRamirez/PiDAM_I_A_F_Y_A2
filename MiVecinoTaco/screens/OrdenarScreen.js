import React, { useState } from "react";
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

export default function OrdenarScreen({ navigation }) {
  const [openSection, setOpenSection] = useState(null);

  const tacos = [
    { nombre: "TACOS DE BISTEC", descripcion: "Bistec con cebolla asada", precio: "$17" },
    { nombre: "TACOS DE SESOS", descripcion: "Mezcla de carnes", precio: "$10" },
    { nombre: "TACOS DE PASTOR", descripcion: "Cerdo adobado con piña", precio: "$15" },
  ];

  const bebidas = [
    { nombre: "AGUA DE HORCHATA", descripcion: "Vaso 500 ml", precio: "$12" },
    { nombre: "REFRESCO", descripcion: "Lata 355 ml (varios)", precio: "$18" },
    { nombre: "AGUA DE JAMAICA", descripcion: "Vaso 500 ml", precio: "$12" },
  ];

  const extras = [
    { nombre: "GUACAMOLE", descripcion: "Porción individual", precio: "$10" },
    { nombre: "QUESO", descripcion: "Rallado, porción", precio: "$8" },
    { nombre: "SALSA ESPECIAL", descripcion: "Receta de la casa", precio: "$6" },
  ];

  const renderSection = (title, items, sectionKey) => (
    <View style={styles.sectionBox}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setOpenSection(openSection === sectionKey ? null : sectionKey)}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        <Ionicons
          name={openSection === sectionKey ? "chevron-up" : "chevron-down"}
          size={20}
          color="#FF8C00"
        />
      </TouchableOpacity>

      {openSection === sectionKey && (
        <View style={styles.sectionContent}>
          {items.map((item, idx) => (
            <View key={`${sectionKey}-${idx}`} style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.productName}>{item.nombre}</Text>
                <Text style={styles.productDesc}>{item.descripcion}</Text>
                <Text style={styles.productPrice}>{item.precio}</Text>
              </View>

              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addText}>+ Agregar</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FF8C00" barStyle="light-content" />

  
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#1F1F1F" />
        </TouchableOpacity>

        <View style={styles.logoTitle}>
          <Image source={require("../assets/tacoLogo.png")} style={styles.logo} />
          <Text style={styles.headerTitle}>Mi Vecino el Taco</Text>
        </View>
        <TouchableOpacity style={styles.headerIcons} onPress={() => navigation.navigate("Notificaciones")}>
          <Ionicons name="notifications-outline" size={24} color="#1F1F1F" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Image source={require("../assets/tacosPromo.png")} style={styles.banner} />

        <Text style={styles.title}>Taquería 20 de Noviembre</Text>
        <Text style={styles.subText}>📍 A 1.2 Km</Text>

        <View style={styles.infoBox}>
          <Text style={styles.label}>📍 Dirección</Text>
          <Text style={styles.value}>Calle Morales 456, Col. Juárez</Text>

          <Text style={styles.label}>🕒 Horario</Text>
          <Text style={styles.value}>Lun - Sab: 7:00 PM - 1:00 AM</Text>

          <Text style={styles.label}>📞 Teléfono</Text>
          <Text style={styles.value}>+52 833 155 0045</Text>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>📞 LLAMA YA</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>🗺️ CÓMO LLEGAR</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>🔗 UNIRSE A LA COMUNIDAD</Text>
          </TouchableOpacity>
        </View>

        {renderSection("TACOS", tacos, "tacos")}
        {renderSection("BEBIDAS", bebidas, "bebidas")}
        {renderSection("EXTRAS", extras, "extras")}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Agrega productos a tu pedido</Text>

          <TouchableOpacity style={styles.callButton}>
            <Text style={styles.callText}>📞 Llamar para ordenar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scroll: { paddingHorizontal: 20, paddingBottom: 30 },
  banner: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 20,
    resizeMode: "cover",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1F1F1F",
    textAlign: "center",
  },
  subText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  infoBox: {
    backgroundColor: "#FFF8F0",
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#FF8C00",
  },
  label: { fontSize: 14, fontWeight: "bold", color: "#FF8C00", marginTop: 6 },
  value: { fontSize: 14, color: "#1F1F1F" },
  actionRow: { flexDirection: "column", gap: 10, marginBottom: 20 },
  actionButton: {
    backgroundColor: "#FF8C00",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  actionText: { color: "#FFF", fontWeight: "bold", fontSize: 14 },
  sectionBox: { marginBottom: 12 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF3E0",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FF8C00",
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#FF8C00" },
  sectionContent: { marginTop: 8 },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#FF8C00",
    flexDirection: "row",
    alignItems: "center",
  },
  productName: { fontSize: 15, fontWeight: "bold", color: "#1F1F1F" },
  productDesc: { fontSize: 13, color: "#666", marginVertical: 4 },
  productPrice: { fontSize: 14, color: "#FF8C00", fontWeight: "bold" },
  addButton: {
    backgroundColor: "#FF8C00",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addText: { color: "#FFF", fontWeight: "bold", fontSize: 13 },
  footer: { alignItems: "center", marginTop: 20 },
  footerText: { fontSize: 14, color: "#666", marginBottom: 10 },
  callButton: {
    backgroundColor: "#FF8C00",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  callText: { color: "#FFF", fontWeight: "bold", fontSize: 14 },
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
});
