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
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function VerComunidadScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FF8C00" barStyle="light-content" />

      {/* HEADER */}
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

      <Text style={styles.sectionTitle}>COMUNIDAD</Text>
      <Text style={styles.subTitle}>TAQUERÍA “EL PAISA”</Text>

      <ScrollView contentContainerStyle={styles.scroll}>
        {[
          {
            usuario: "Juan Julián Juárez",
            tiempo: "hace 5 meses",
            texto:
              "¡Los tacos al pastor son los mejores! 100% recomendados con piña",
            likes: 16,
            comentarios: 4,
          },
          {
            usuario: "Paulin ReneGul",
            tiempo: "hace 5 meses",
            texto:
              "Cuando pedí campechanos, el chorizo traía un pelo, qué oso efe",
            likes: 5,
            comentarios: 1,
          },
          {
            usuario: "Saul Rico",
            tiempo: "hace 1 año",
            texto:
              "Buen lugar, sabor único, limpieza al 100%, gran servicio... Todo eso faltó!!",
            likes: 30,
            comentarios: 12,
          },
        ].map((item, index) => (
          <View key={index} style={styles.commentCard}>
            <View style={styles.commentHeader}>
              <Ionicons name="person-circle-outline" size={32} color="#FF8C00" />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.user}>{item.usuario}</Text>
                <Text style={styles.time}>{item.tiempo}</Text>
              </View>
            </View>

            <Text style={styles.commentText}>{item.texto}</Text>

            <View style={styles.commentFooter}>
              <TouchableOpacity style={styles.metric}>
                <FontAwesome name="thumbs-up" size={16} color="#FF8C00" />
                <Text style={styles.metricText}>{item.likes}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.metric}>
                <FontAwesome name="comment" size={16} color="#FF8C00" />
                <Text style={styles.metricText}>{item.comentarios}</Text>
              </TouchableOpacity>
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
  commentCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FF8C00",
  },
  commentHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  user: { fontSize: 15, fontWeight: "bold", color: "#1F1F1F" },
  time: { fontSize: 12, color: "#666" },
  commentText: { fontSize: 14, color: "#1F1F1F", marginBottom: 10 },
  commentFooter: { flexDirection: "row", gap: 20 },
  metric: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  metricText: { fontSize: 13, color: "#1F1F1F" },
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
