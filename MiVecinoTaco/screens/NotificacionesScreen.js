import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { UsuarioController } from "../controllers/UsuarioController";
import { NotificacionController } from "../controllers/NotificacionController";

export default function NotificacionesScreen({ navigation }) {
  const userCtrl = new UsuarioController();
  const notiCtrl = new NotificacionController();

  const [lista, setLista] = useState([]);

  const cargarNotificaciones = async () => {
    const user = userCtrl.getUsuarioActivo();

    if (user) {
      const data = await notiCtrl.obtenerMisNotificaciones(user.id);
      setLista(data);
    }
  };

  useFocusEffect(
    useCallback(() => {
      cargarNotificaciones();
    }, [])
  );

  const handleBorrarUno = async (id) => {
    await notiCtrl.eliminar(id);
    setLista((listaActual) =>
      listaActual.filter((item) => item.id !== id)
    );
  };

  const handleLimpiarTodo = () => {
    if (lista.length === 0) return;

    Alert.alert(
      "Limpiar Notificaciones",
      "¿Estás seguro de que quieres borrar todo?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sí, borrar todo",
          style: "destructive",
          onPress: async () => {
            const user = userCtrl.getUsuarioActivo();

            if (user) {
              await notiCtrl.limpiarTodas(user.id);
              setLista([]);
            }
          },
        },
      ]
    );
  };

  const getIcono = (tipo) => {
    switch (tipo) {
      case "pedido":
        return require("../assets/icono_pedido.png");
      case "mensaje":
        return require("../assets/icono_mensaje.png");
      case "promo":
        return require("../assets/icono_promo.png");
      case "ubicacion":
        return require("../assets/icono_mapa.png");
      default:
        return require("../assets/icono_mensaje.png");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#1F1F1F" />
        </TouchableOpacity>

        <View style={styles.logoTitle}>
          <Image
            source={require("../assets/tacoLogo.png")}
            style={styles.logo}
          />
          <Text style={styles.headerTitle}>Mi Vecino el Taco</Text>
        </View>

        <View style={{ width: 40 }} />
      </View>

      <StatusBar backgroundColor="#FF8C00" barStyle="light-content" />

      <Text style={styles.title}>NOTIFICACIONES</Text>

      <ScrollView contentContainerStyle={styles.scroll}>
        {lista.length === 0 ? (
          <View style={{ alignItems: "center", marginTop: 50 }}>
            <Ionicons
              name="notifications-off-outline"
              size={50}
              color="#ccc"
            />
            <Text
              style={{
                textAlign: "center",
                color: "#999",
                marginTop: 10,
              }}
            >
              Sin notificaciones.
            </Text>
          </View>
        ) : (
          <>
            {lista.map((item, index) => (
              <View key={index} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Image
                    source={getIcono(item.tipo)}
                    style={styles.icono}
                  />

                  <Text style={styles.cardTitle}>{item.titulo}</Text>

                  <TouchableOpacity
                    onPress={() => handleBorrarUno(item.id)}
                  >
                    <Ionicons name="close" size={20} color="#999" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.cardDescription}>
                  {item.descripcion}
                </Text>

                <Text style={styles.cardTime}>{item.tiempo}</Text>
              </View>
            ))}

            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleLimpiarTodo}
            >
              <Text style={styles.clearText}>Limpiar todas</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1F1F1F",
    textAlign: "center",
    marginVertical: 15,
  },

  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FF8C00",
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  icono: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginRight: 8,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1F1F1F",
    flex: 1,
  },

  cardDescription: {
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
  },

  cardTime: {
    fontSize: 12,
    color: "#888",
  },

  header: {
    backgroundColor: "#FF8C00",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    elevation: 4,
  },

  logoTitle: {
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    width: 48,
    height: 48,
    resizeMode: "contain",
    marginRight: 10,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F1F1F",
  },

  clearButton: {
    backgroundColor: "#FF8C00",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  clearText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});