import React, { useState, useCallback } from "react";
import {
  View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView,
  TouchableOpacity, Image,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { UsuarioController } from "../controllers/UsuarioController";
import { FavoritoController } from "../controllers/FavoritoController";
import { getAllTaquerias } from "../database/Database";


export default function InicioScreen({ navigation }) {
  const userCtrl = new UsuarioController();
  const favCtrl = new FavoritoController();
  const [nombreUsuario, setNombreUsuario] = useState("AMIGO");
  const [misFavoritos, setMisFavoritos] = useState([]);
  const [usuarioId, setUsuarioId] = useState(null);
  const [taquerias, setTaquerias] = useState([]);

  
  

useFocusEffect(
  useCallback(() => {
    const user = userCtrl.getUsuarioActivo();
    if (user) {
      setNombreUsuario(user.nombre.split(" ")[0].toUpperCase());
      setUsuarioId(user.id);

      favCtrl.obtenerMisFavoritos(user.id).then((favs) => {
        setMisFavoritos(favs);
      });
    }

   
    getAllTaquerias().then((data) => {
      setTaquerias(data);
    });

  }, [])
);


  const irAMapa = () => navigation.navigate("MAPA");

  const toggleHeart = async (taqueriaNombre) => {
    if (!usuarioId) return;
    const esFavorito = misFavoritos.includes(taqueriaNombre);
    if (esFavorito) {
      setMisFavoritos((prev) => prev.filter((n) => n !== taqueriaNombre));
    } else {
      setMisFavoritos((prev) => [...prev, taqueriaNombre]);
    }
    await favCtrl.toggleFavorito(usuarioId, taqueriaNombre, esFavorito);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FF8C00" barStyle="light-content" />

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

      <Text style={styles.greeting}>¡HOLA, {nombreUsuario}!</Text>

      <TouchableOpacity style={styles.mapContainer} onPress={irAMapa} activeOpacity={0.9}>
        <Image source={require("../assets/mapa.jpg")} style={styles.mapImage} resizeMode="cover" />
      </TouchableOpacity>

      <Text style={styles.subHeader}>Taquerías Cerca de Ti</Text>

      <ScrollView contentContainerStyle={styles.scroll}>
        {taquerias.map((taco, index) => {
          const isFav = misFavoritos.includes(taco.nombre);
          console.log(">>> NAVEGANDO A ORDENAR CON:", taco.nombre);

          return (
            
           <TouchableOpacity
  key={index}
  style={styles.card}
  
  onPress={() => navigation.navigate("Ordenar", {
    
  taqueriaNombre: taco.nombre,
  direccion: taco.direccion || "Dirección no disponible",
  telefono: taco.telefono || "",
  distancia: taco.distancia || "",
  lat: taco.lat,
  lng: taco.lng
})}

  activeOpacity={0.7}
>

              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{taco.nombre}</Text>
                <Text style={styles.details}>{taco.rating} {taco.distancia}</Text>
              </View>
              <TouchableOpacity onPress={() => toggleHeart(taco.nombre)} style={styles.heartArea}>
                <FontAwesome name={isFav ? "heart" : "heart-o"} size={24} color="#FF8C00" />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        })}
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
  header: { backgroundColor: "#FF8C00", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingVertical: 14, shadowColor: "#000", shadowOpacity: 0.2, shadowOffset: { width: 0, height: 2 }, elevation: 4 },
  logoTitle: { flexDirection: "row", alignItems: "center" },
  logo: { width: 48, height: 48, resizeMode: "contain", marginRight: 10 },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#1F1F1F" },
  headerIcons: { flexDirection: "row", alignItems: "center" },
  greeting: { fontSize: 22, fontWeight: "bold", color: "#1F1F1F", textAlign: "center", marginTop: 20, marginBottom: 10 },
  subHeader: { fontSize: 16, fontWeight: "bold", color: "#666", marginLeft: 20, marginBottom: 10 },
  mapContainer: { height: 150, marginHorizontal: 20, borderRadius: 12, overflow: "hidden", marginBottom: 20, borderWidth: 1, borderColor: "#FF8C00" },
  mapImage: { width: "100%", height: "100%" },
  scroll: { paddingHorizontal: 20, paddingBottom: 20 },
  card: { backgroundColor: "#FFF", borderRadius: 12, padding: 16, marginBottom: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderWidth: 1, borderColor: "#FF8C00" },
  name: { fontSize: 16, fontWeight: "bold", color: "#1F1F1F" },
  details: { fontSize: 14, color: "#666", marginTop: 4 },
  heartArea: { padding: 10 },
  
  // Estilo Botón Flotante
  floatingCart: {
    position: 'absolute', bottom: 20, right: 20, backgroundColor: '#FF8C00',
    width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center',
    elevation: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 4.65, zIndex: 9999
  }
});