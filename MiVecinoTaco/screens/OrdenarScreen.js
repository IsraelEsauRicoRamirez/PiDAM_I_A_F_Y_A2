import React, { useState, useEffect } from "react";
import {
  View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView,
  TouchableOpacity, Image, Alert, Linking, Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PedidoController } from "../controllers/PedidoController";
import { UsuarioController } from "../controllers/UsuarioController";
import { CarritoController } from "../controllers/CarritoController";

export default function OrdenarScreen({ navigation, route }) {
const taqueriaNombre = route?.params?.taqueriaNombre || "Taquería";
const direccion = route?.params?.direccion || "Dirección no disponible";
const telefono = route?.params?.telefono || "";
const distancia = route?.params?.distancia || "";
const lat = route?.params?.lat;
const lng = route?.params?.lng;




  

  const pedidoCtrl = new PedidoController();
  const usuarioCtrl = new UsuarioController();
  const cartCtrl = new CarritoController();

  const [openSection, setOpenSection] = useState("tacos");
  const [menu, setMenu] = useState({ tacos: [], bebidas: [], extras: [] });




  useEffect(() => {
    pedidoCtrl.obtenerMenu().then((productos) => {
      setMenu({
        tacos: productos.filter((p) => p.categoria === "tacos"),
        bebidas: productos.filter((p) => p.categoria === "bebidas"),
        extras: productos.filter((p) => p.categoria === "extras"),
      });
    });
  }, []);

 const llamarRestaurante = () => Linking.openURL(`tel:${telefono}`);
const abrirMapa = () => {
  const label = taqueriaNombre;
  const url = Platform.select({ ios: "maps:0,0?q=" + label, android: "geo:0,0?q=" + label });
  Linking.openURL(url);
};

  const irAComunidad = () => navigation.navigate("VerComunidad");

  // Función Agregar al Carrito
  const handleAgregar = async (item) => {
    cartCtrl.agregarProducto(item);
    Alert.alert("Añadido", `${item.nombre} se agregó a tu carrito.`);
  };

  const renderSection = (title, items, sectionKey) => (
    <View style={styles.sectionBox}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setOpenSection(openSection === sectionKey ? null : sectionKey)}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        <Ionicons name={openSection === sectionKey ? "chevron-up" : "chevron-down"} size={20} color="#FF8C00" />
      </TouchableOpacity>
      {openSection === sectionKey && (
        <View style={styles.sectionContent}>
          {items.map((item, idx) => (
            <View key={idx} style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.productName}>{item.nombre}</Text>
                <Text style={styles.productDesc}>{item.descripcion}</Text>
                <Text style={styles.productPrice}>{item.precio}</Text>
              </View>
              <TouchableOpacity style={styles.addButton} onPress={() => handleAgregar(item)}>
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
          <Text style={styles.headerTitle}>Menú</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Notificaciones")}>
          <Ionicons name="notifications-outline" size={24} color="#1F1F1F" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Image source={require("../assets/tacosPromo.png")} style={styles.banner} />
        <Text style={styles.title}>{taqueriaNombre}</Text>
<Text style={styles.subText}>📍 {distancia}</Text>

<View style={styles.infoBox}>
  <Text style={styles.label}>📍 Dirección</Text>
  <Text style={styles.value}>{direccion}</Text>
  <Text style={styles.label}>🕒 Horario</Text>
  <Text style={styles.value}>Lun - Sab: 7:00 PM - 1:00 AM</Text>
  <Text style={styles.label}>📞 Teléfono</Text>
  <Text style={styles.value}>{telefono}</Text>
</View>



        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton} onPress={llamarRestaurante}><Text style={styles.actionText}>📞 LLAMA YA</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={abrirMapa}><Text style={styles.actionText}>🗺️ CÓMO LLEGAR</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={irAComunidad}><Text style={styles.actionText}>🔗 UNIRSE A COMUNIDAD</Text></TouchableOpacity>
        </View>

        {renderSection("🌮 TACOS", menu.tacos, "tacos")}
        {renderSection("🥤 BEBIDAS", menu.bebidas, "bebidas")}
        {renderSection("🥑 EXTRAS", menu.extras, "extras")}

        <View style={styles.footer}>
          <Text style={styles.footerText}>¿Tienes dudas?</Text>
          <TouchableOpacity style={styles.callButton} onPress={llamarRestaurante}>
            <Text style={styles.callText}>📞 Llamar para ordenar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* BOTÓN FLOTANTE INTEGRADO */}
      <TouchableOpacity
        style={styles.floatingCart}
        onPress={() => navigation.navigate("Carrito")}
        activeOpacity={0.8}
      >
        <Ionicons name="cart" size={28} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scroll: { paddingHorizontal: 20, paddingBottom: 30 },
  header: { flexDirection: "row", justifyContent: "space-between", padding: 20, backgroundColor: "#FF8C00", alignItems: "center" },
  logoTitle: { flexDirection: "row", alignItems: "center" },
  logo: { width: 30, height: 30, resizeMode: "contain", marginRight: 10 },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  banner: { width: "100%", height: 180, borderRadius: 12, marginTop: 10, marginBottom: 20, resizeMode: "cover" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", color: "#1F1F1F" },
  subText: { fontSize: 14, color: "#666", textAlign: "center", marginBottom: 10 },
  infoBox: { backgroundColor: "#FFF8F0", borderRadius: 12, padding: 14, marginBottom: 20, borderWidth: 1, borderColor: "#FF8C00" },
  label: { fontSize: 14, fontWeight: "bold", color: "#FF8C00", marginTop: 6 },
  value: { fontSize: 14, color: "#1F1F1F" },
  actionRow: { flexDirection: "column", gap: 10, marginBottom: 20 },
  actionButton: { backgroundColor: "#FF8C00", paddingVertical: 12, borderRadius: 12, alignItems: "center", elevation: 2 },
  actionText: { color: "#FFF", fontWeight: "bold", fontSize: 14 },
  sectionBox: { marginBottom: 12 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 12, backgroundColor: "#FFF3E0", borderRadius: 8, borderWidth: 1, borderColor: "#FF8C00" },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#FF8C00" },
  sectionContent: { marginTop: 8 },
  card: { backgroundColor: "#FFF", borderRadius: 12, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: "#FF8C00", flexDirection: "row", alignItems: "center" },
  productName: { fontSize: 15, fontWeight: "bold", color: "#1F1F1F" },
  productDesc: { fontSize: 13, color: "#666", marginVertical: 4 },
  productPrice: { fontSize: 14, color: "#FF8C00", fontWeight: "bold" },
  addButton: { backgroundColor: "#FF8C00", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  addText: { color: "#fff", fontWeight: "bold", fontSize: 13 },
  footer: { alignItems: "center", marginTop: 20 },
  footerText: { fontSize: 14, color: "#666", marginBottom: 10 },
  callButton: { backgroundColor: "#FF8C00", paddingVertical: 10, paddingHorizontal: 30, borderRadius: 20 },
  callText: { color: "#FFF", fontWeight: "bold", fontSize: 14 },
  
  // Estilo Botón Flotante
  floatingCart: {
    position: 'absolute', bottom: 20, right: 20, backgroundColor: '#FF8C00',
    width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center',
    elevation: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 4.65, zIndex: 9999
  }
});