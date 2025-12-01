import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function IniciarSesionScreen({ navigation }) {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const irARegistro = () => {
    navigation.navigate("Registro");
  };

  const iniciarSesion = () => {
    navigation.replace("Tabs");
  };

  return (
    <ImageBackground source={require("../assets/fondoTacos.png")} style={styles.background}>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
          <ScrollView contentContainerStyle={styles.scroll}>

            <View style={styles.header}>
              <TouchableOpacity
                style={styles.logoTitle}
                onPress={() => navigation.navigate("Notificaciones")}
              >
                <Image source={require("../assets/tacoLogo.png")} style={styles.logo} />
                <Text style={styles.headerTitle}>Mi Vecino el Taco</Text>
              </TouchableOpacity>

              <View style={styles.headerIcons}>
                <TouchableOpacity onPress={() => navigation.navigate("Notificaciones")}>
                  <Ionicons name="notifications-outline" size={24} color="#1F1F1F" />
                </TouchableOpacity>
              </View>
            </View>

            <TextInput
              style={styles.input}
              placeholder="CORREO ELECTRÓNICO"
              placeholderTextColor="#999"
              value={correo}
              onChangeText={setCorreo}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="CONTRASEÑA"
              placeholderTextColor="#999"
              secureTextEntry
              value={contrasena}
              onChangeText={setContrasena}
            />

            <TouchableOpacity style={styles.button} onPress={iniciarSesion}>
              <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.link}>¿OLVIDASTE TU CONTRASEÑA?</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>¿NO TIENES CUENTA? </Text>
              <TouchableOpacity onPress={irARegistro}>
                <Text style={{ color: "#FF8C00" }}> REGISTRARSE</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.16)",
  },
  container: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: "center", padding: 20 },
  header: { alignItems: "center", marginBottom: 30 },
  logo: { width: 100, height: 100, marginBottom: 16 },
  title: { fontSize: 30, fontWeight: "bold", color: "#FFB86A" },
  subtitle: { fontSize: 16, color: "#666", marginTop: 4, fontWeight: "bold" },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FEE685",
    color: "#1F2937",
  },

  button: {
    backgroundColor: "#FFB86A",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#FFB86A",
    shadowOpacity: 0.3,
    elevation: 4,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  link: { color: "#FFB86A", fontWeight: "600", marginTop: 16, textAlign: "center" },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 24 },
  footerText: { color: "#666", fontSize: 15 },
});