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

export default function IniciarSesionScreen() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  return (
    <ImageBackground source={require("../assets/fondoTacos.png")} style={styles.background}>
      {/* Overlay blanco semitransparente */}
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
          <ScrollView contentContainerStyle={styles.scroll}>
            
            {/* Logo y título */}
            <View style={styles.header}>
              <Image source={require("../assets/tacoLogo.png")} style={styles.logo} />
              <Text style={styles.title}>Iniciar Sesión</Text>
              <Text style={styles.subtitle}>Bienvenido a Mi Vecino el Taco</Text>
            </View>

            {/* Inputs */}
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor="#999"
              value={correo}
              onChangeText={setCorreo}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#999"
              secureTextEntry
              value={contrasena}
              onChangeText={setContrasena}
            />

            {/* Botón principal */}
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>

            {/* Recuperar contraseña */}
            <TouchableOpacity>
              <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            {/* Registro */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>¿No tienes cuenta? </Text>
              <TouchableOpacity>
                <Text style={styles.link}>Regístrate aquí</Text>
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
    backgroundColor: "rgba(255, 255, 255, 0.16)", // capa blanca semitransparente
  },
  container: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: "center", padding: 20 },
  header: { alignItems: "center", marginBottom: 30 },
  logo: { width: 100, height: 100, marginBottom: 16 },
  title: { fontSize: 26, fontWeight: "bold", color: "#FFB86A" }, // naranja principal
  subtitle: { fontSize: 16, color: "#666", marginTop: 4 },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FEE685", // amarillo suave
    color: "#1F2937",
  },
  button: {
    backgroundColor: "#FFB86A", // naranja principal
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#FFB86A",
    shadowOpacity: 0.3,
    elevation: 4,
  },
  buttonText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
  link: { color: "#FFB86A", fontWeight: "600", marginTop: 16, textAlign: "center" },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 24 },
  footerText: { color: "#666", fontSize: 15 },
});
