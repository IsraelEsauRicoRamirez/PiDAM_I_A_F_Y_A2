import React, { useState, useCallback } from "react";
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
import { useFocusEffect } from "@react-navigation/native";
import { UsuarioController } from "../controllers/UsuarioController";
import { PedidoController } from "../controllers/PedidoController";

export default function PerfilScreen({ navigation }) {
  const userController = new UsuarioController();
  const pedidoController = new PedidoController();

  const [usuario, setUsuario] = useState(null);
  const [historial, setHistorial] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const currentUser = userController.getUsuarioActivo();

      if (currentUser) {
        setUsuario(currentUser);
        pedidoController
          .obtenerHistorial(currentUser.id)
          .then((data) => setHistorial(data));
      } else {
        navigation.replace("InicioSesion");
      }
    }, [])
  );

  if (!usuario) return null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FF8C00" barStyle="light-content" />

      <Text style={styles.title}>MI PERFIL</Text>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.profileBox}>
          <Ionicons
            name="person-circle-outline"
            size={80}
            color="#FF8C00"
          />
          <Text style={styles.profileName}>{usuario.nombre}</Text>
          <Text style={styles.profileEmail}>{usuario.correo}</Text>
          <Text style={styles.profilePhone}>
            📞 {usuario.telefono || "Sin teléfono"}
          </Text>
        </View>

        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>HISTORIAL DE PEDIDOS</Text>

          {historial.length === 0 ? (
            <Text style={{ textAlign: "center", color: "#999" }}>
              No hay pedidos recientes
            </Text>
          ) : (
            historial.map((item, idx) => (
              <View key={idx} style={styles.orderRow}>
                <Ionicons
                  name="fast-food-outline"
                  size={20}
                  color="#FF8C00"
                />
                <View style={{ marginLeft: 8 }}>
                  <Text style={styles.orderName}>
                    {item.nombreProducto}
                  </Text>
                  <Text style={styles.orderInfo}>
                    {item.fecha} • {item.estado}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              userController.cerrarSesion();
              navigation.replace("InicioSesion");
            }}
          >
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
    textAlign: "center",
    marginVertical: 15,
  },

  scroll: { paddingHorizontal: 20 },

  profileBox: {
    alignItems: "center",
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#FFF8F0",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FF8C00",
  },

  profileName: { fontSize: 18, fontWeight: "bold" },
  profileEmail: { color: "#666" },
  profilePhone: { color: "#666", marginTop: 4 },

  sectionBox: { marginBottom: 20 },

  sectionTitle: {
    fontWeight: "bold",
    color: "#FF8C00",
    marginBottom: 10,
  },

  orderRow: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },

  orderName: { fontWeight: "bold" },
  orderInfo: { color: "#666", fontSize: 12 },

  footer: { alignItems: "center", marginTop: 20 },

  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },

  logoutText: { color: "#FFF", fontWeight: "bold" },
});
