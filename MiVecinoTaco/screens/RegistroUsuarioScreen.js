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
  Switch,
  Alert,
} from "react-native";
import { UsuarioController } from "../controllers/UsuarioController";

export default function RegistroUsuarioScreen({ navigation }) {
  const controller = new UsuarioController();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  const registrarUsuario = async () => {
    if (!nombre || !correo || !contrasena) {
      Alert.alert("Error", "Por favor llena los campos obligatorios.");
      return;
    }

    if (contrasena !== confirmar) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    if (!aceptaTerminos) {
      Alert.alert("Atención", "Debes aceptar los términos y condiciones.");
      return;
    }

    const resultado = await controller.registrar(
      nombre,
      correo,
      telefono,
      contrasena
    );

    if (resultado.success) {
      Alert.alert(
        "¡Bienvenido!",
        "Cuenta creada correctamente. Ahora inicia sesión.",
        [{ text: "OK", onPress: () => navigation.navigate("InicioSesion") }]
      );
    } else {
      Alert.alert("Error", resultado.msg);
    }
  };

  const volverInicioSesion = () => {
    navigation.navigate("InicioSesion");
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
              <Image
                source={require("../assets/tacoLogo.png")}
                style={styles.logo}
              />
              <Text style={styles.title}>Crear Cuenta</Text>
              <Text style={styles.subtitle}>Únete a Mi Vecino el Taco</Text>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Nombre completo"
              placeholderTextColor="#999"
              value={nombre}
              onChangeText={setNombre}
            />

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
              placeholder="Teléfono"
              placeholderTextColor="#999"
              value={telefono}
              onChangeText={setTelefono}
              keyboardType="phone-pad"
            />

            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#999"
              secureTextEntry
              value={contrasena}
              onChangeText={setContrasena}
            />

            <TextInput
              style={styles.input}
              placeholder="Confirmar contraseña"
              placeholderTextColor="#999"
              secureTextEntry
              value={confirmar}
              onChangeText={setConfirmar}
            />

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>
                Acepto los términos y condiciones
              </Text>
              <Switch
                value={aceptaTerminos}
                onValueChange={setAceptaTerminos}
                trackColor={{ false: "#E5E7EB", true: "#FEE685" }}
                thumbColor={aceptaTerminos ? "#ffad6aff" : "#f4f3f4"}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={registrarUsuario}>
              <Text style={styles.buttonText}>REGISTRARSE</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Ya tienes cuenta: </Text>
              <TouchableOpacity onPress={volverInicioSesion}>
                <Text style={styles.link}>Inicia Sesión</Text>
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
    backgroundColor: "rgba(255, 255, 255, 0.14)",
  },

  container: { flex: 1 },

  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },

  header: {
    alignItems: "center",
    marginBottom: 30,
  },

  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFB86A",
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },

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

  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  switchLabel: {
    fontSize: 14,
    color: "#ffaf03ff",
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

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },

  footerText: {
    color: "#666",
    fontSize: 15,
  },

  link: {
    color: "#FFB86A",
    fontWeight: "600",
    fontSize: 15,
  },
});
