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
  Alert,
} from "react-native";
import { UsuarioController } from "../controllers/UsuarioController";

export default function IniciarSesionScreen({ navigation }) {
  const controller = new UsuarioController();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const irARegistro = () => {
    navigation.navigate("Registro");
  };

  const iniciarSesion = async () => {
    if (!correo || !contrasena) {
      Alert.alert("Error", "Ingresa correo y contraseña");
      return;
    }
    const usuarioEncontrado = await controller.validarLogin(correo, contrasena);
    if (usuarioEncontrado) {
      navigation.replace("Tabs");
    } else {
      Alert.alert("Error", "Correo o contraseña incorrectos");
    }
  };

  // Recuperar Contraseña
  const handleRecuperar = async () => {
    if (!correo) {
      Alert.alert("Atención", "Escribe tu correo en el campo para recuperarla.");
      return;
    }
    const res = await controller.recuperarContrasena(correo);
    if (res.success) {
      Alert.alert("Recuperación Exitosa", `Tu contraseña es: ${res.password}`);
    } else {
      Alert.alert("Error", "Este correo no está registrado.");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/fondoTacos.png")}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

          <ScrollView contentContainerStyle={styles.scroll}>
            <View style={styles.header}>
              <Image source={require("../assets/tacoLogo.png")} style={styles.logo} />
              <Text style={styles.title}>INICIAR SESIÓN</Text>
              <Text style={styles.subtitle}>MI VECINO EL TACO</Text>
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

            <TouchableOpacity onPress={handleRecuperar}>
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
  overlay: { flex: 1, backgroundColor: "rgba(255, 255, 255, 0.16)" },
  container: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: "center", padding: 20 },
  header: { alignItems: "center", marginBottom: 30 },
  logo: { width: 100, height: 100, marginBottom: 16 },
  title: { fontSize: 30, fontWeight: "bold", color: "#FFB86A" },
  subtitle: { fontSize: 16, color: "#666", marginTop: 4, fontWeight: "bold" },
  input: { backgroundColor: "#FFF", borderRadius: 12, padding: 14, fontSize: 16, marginBottom: 16, borderWidth: 1, borderColor: "#FEE685", color: "#1F2937" },
  button: { backgroundColor: "#FFB86A", borderRadius: 12, paddingVertical: 16, alignItems: "center", marginTop: 10, shadowColor: "#FFB86A", shadowOpacity: 0.3, elevation: 4 },
  buttonText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
  link: { color: "#FFB86A", fontWeight: "600", marginTop: 16, textAlign: "center" },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 24 },
  footerText: { color: "#666", fontSize: 15 },
});