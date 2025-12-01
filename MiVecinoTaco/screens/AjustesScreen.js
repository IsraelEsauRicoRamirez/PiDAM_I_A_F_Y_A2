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
  Switch,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AjustesScreen() {
  const [notificaciones, setNotificaciones] = React.useState(true);
  const [ubicacion, setUbicacion] = React.useState(false);
  const [modoOscuro, setModoOscuro] = React.useState(false);

  // Funciones para abrir enlaces (puedes personalizar las URLs)
  const abrirWhatsApp = () => Linking.openURL("https://wa.me/5210000000000");
  const abrirFacebook = () => Linking.openURL("https://facebook.com/mivecinoeltaco");
  const abrirCorreo = () => Linking.openURL("mailto:contacto@mivecinoeltaco.com");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FF8C00" barStyle="light-content" />

      
      <Text style={styles.title}>AJUSTES</Text>

      
      <TouchableOpacity style={styles.profile}>
        <Ionicons name="person-circle-outline" size={60} color="#FF8C00" />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.profileName}>Pompompurin</Text>
          <Text style={styles.profileEmail}>pompomp@p.pupedu.mx</Text>
        </View>
      </TouchableOpacity>

      
      <ScrollView contentContainerStyle={styles.scroll}>
        
        <Text style={styles.section}>PREFERENCIAS</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>NOTIFICACIONES</Text>
          <Switch
            value={notificaciones}
            onValueChange={setNotificaciones}
            thumbColor={notificaciones ? "#FF8C00" : "#f4f3f4"}
            trackColor={{ false: "#ccc", true: "#FFE0B2" }}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>UBICACIÓN</Text>
          <Switch
            value={ubicacion}
            onValueChange={setUbicacion}
            thumbColor={ubicacion ? "#FF8C00" : "#f4f3f4"}
            trackColor={{ false: "#ccc", true: "#FFE0B2" }}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>MODO OSCURO</Text>
          <Switch
            value={modoOscuro}
            onValueChange={setModoOscuro}
            thumbColor={modoOscuro ? "#FF8C00" : "#f4f3f4"}
            trackColor={{ false: "#ccc", true: "#FFE0B2" }}
          />
        </View>

        
        <Text style={styles.section}>CUENTA</Text>
        {["MÉTODOS DE PAGO", "PRIVACIDAD Y SEGURIDAD", "IDIOMA"].map((item, index) => (
          <TouchableOpacity key={index} style={styles.linkRow}>
            <Text style={styles.linkLabel}>{item}</Text>
            <Ionicons name="chevron-forward" size={20} color="#FF8C00" />
          </TouchableOpacity>
        ))}

        
        <Text style={styles.section}>SOPORTE</Text>
        {["CENTRO DE AYUDA", "TÉRMINOS Y CONDICIONES"].map((item, index) => (
          <TouchableOpacity key={index} style={styles.linkRow}>
            <Text style={styles.linkLabel}>{item}</Text>
            <Ionicons name="chevron-forward" size={20} color="#FF8C00" />
          </TouchableOpacity>
        ))}

        
        <View style={styles.footer}>
          <Text style={styles.version}>VERSIÓN 1.0.0</Text>
          <Text style={styles.brand}>MI VECINO EL TACO ©2025</Text>
          <View style={styles.socialRow}>
            <TouchableOpacity onPress={abrirWhatsApp}>
              <Image source={require("../assets/whatsapp.png")} style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={abrirFacebook}>
              <Image source={require("../assets/facebook.png")} style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={abrirCorreo}>
              <Image source={require("../assets/gmail.png")} style={styles.socialIcon} />
            </TouchableOpacity>
          </View>
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
  profile: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#FF8C00",
  },
  profileName: { fontSize: 16, fontWeight: "bold", color: "#1F1F1F" },
  profileEmail: { fontSize: 13, color: "#666" },
  scroll: { paddingHorizontal: 20, paddingBottom: 30 },
  section: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF8C00",
    marginTop: 20,
    marginBottom: 10,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  settingLabel: { fontSize: 15, color: "#1F1F1F" },
  linkRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },
  linkLabel: { fontSize: 15, color: "#1F1F1F" },
  footer: { alignItems: "center", marginTop: 30 },
  version: { fontSize: 12, color: "#999" },
  brand: { fontSize: 12, color: "#999", marginBottom: 10 },
  socialRow: { flexDirection: "row", marginBottom: 16 },
  socialIcon: { width: 28, height: 28, marginHorizontal: 10, resizeMode: "contain" },
  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  logoutText: { color: "#FFF", fontWeight: "bold", fontSize: 14 },
});
