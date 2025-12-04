import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert
} from "react-native";

import { Ionicons, FontAwesome } from "@expo/vector-icons";

import { ComunidadController } from "../controllers/ComunidadController";
import { UsuarioController } from "../controllers/UsuarioController";

export default function VerComunidadScreen({ navigation, route }) {
const comunidadNombre = route?.params?.comunidadNombre || "Comunidad";


  const controller = new ComunidadController();
  const userCtrl = new UsuarioController();

  const [comentarios, setComentarios] = useState([]);
  const [nuevoTexto, setNuevoTexto] = useState("");

  const cargarComentarios = async () => {
  const data = await controller.obtenerComentarios(comunidadNombre);
  setComentarios(data);
};


useEffect(() => {
  if (!comunidadNombre || comunidadNombre === "Comunidad") {
    return; 
  }

  cargarComentarios();
}, [comunidadNombre]);



  
  const publicar = async () => {
    const user = userCtrl.getUsuarioActivo();

    if (!user) return Alert.alert("Error", "Debes iniciar sesión para comentar");
    if (nuevoTexto.trim() === "") return;

   controller.publicar(user.nombre, nuevoTexto, comunidadNombre);


    if (exito) {
      setNuevoTexto("");
      cargarComentarios();
    }
  };

  // INTERACCIÓN: DAR LIKE
  const handleLike = async (item) => {
    // 1. Actualizar BD
    await controller.darLike(item.id, item.likes);

    // 2. Actualizar UI rápido (Efecto instantáneo)
    cargarComentarios();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FF8C00" barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#1F1F1F" />
        </TouchableOpacity>

  <Text style={styles.headerTitle}>
  Comunidad de la Taquería "{comunidadNombre}"
</Text>




        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* CAJA PARA PUBLICAR (Interactiva) */}
        <View style={styles.postContainer}>
          <View style={styles.postHeader}>
            <Ionicons name="chatbubble-ellipses-outline" size={20} color="#FF8C00" />
            <Text style={styles.postTitle}>Deja tu opinión</Text>
          </View>

          <View style={styles.postBox}>
            <TextInput
              style={styles.input}
              placeholder="¿Qué te parecieron los tacos?"
              value={nuevoTexto}
              onChangeText={setNuevoTexto}
              multiline
            />

            <TouchableOpacity style={styles.btnPublicar} onPress={publicar}>
              <Ionicons name="send" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* LISTA DE COMENTARIOS */}
        {comentarios.map((item, index) => (
          <View key={index} style={styles.commentCard}>
            <View style={styles.commentHeader}>
              <Ionicons name="person-circle-outline" size={36} color="#FF8C00" />

              <View style={{ marginLeft: 10 }}>
                <Text style={styles.user}>{item.usuarioNombre}</Text>
                <Text style={styles.time}>{item.fecha}</Text>
              </View>
            </View>

            <Text style={styles.commentText}>{item.texto}</Text>

            <View style={styles.divider} />

            {/* BOTONES DE INTERACCIÓN */}
            <View style={styles.commentFooter}>
              <TouchableOpacity
                style={styles.metricButton}
                onPress={() => handleLike(item)}
              >
                <FontAwesome name="thumbs-up" size={18} color="#FF8C00" />
                <Text style={styles.metricText}>{item.likes} Me gusta</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.metricButton}>
                <FontAwesome name="comment-o" size={18} color="#666" />
                <Text style={[styles.metricText, { color: "#666" }]}>
                  Responder
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

/* ===========================
   ESTILOS
=========================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5"
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#FF8C00",
    alignItems: "center",
    elevation: 4
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "bold"
  },

  scroll: {
    padding: 15
  },

  // Estilo caja publicar
  postContainer: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2
  },

  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 8
  },

  postTitle: {
    fontWeight: "bold",
    color: "#444"
  },

  postBox: {
    flexDirection: "row",
    alignItems: "center"
  },

  input: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 80
  },

  btnPublicar: {
    backgroundColor: "#FF8C00",
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2
  },

  // Estilo tarjeta comentario
  commentCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    elevation: 1
  },

  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },

  user: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#333"
  },

  time: {
    fontSize: 12,
    color: "#888"
  },

  commentText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
    marginBottom: 12
  },

  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginBottom: 8
  },

  commentFooter: {
    flexDirection: "row",
    justifyContent: "space-around"
  },

  metricButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    gap: 6
  },

  metricText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FF8C00"
  }
});
