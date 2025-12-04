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
  Switch,
  Linking,
  Modal,
  TextInput,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { UsuarioController } from "../controllers/UsuarioController";

export default function AjustesScreen({ navigation }) {
  const userCtrl = new UsuarioController();

  const [usuario, setUsuario] = useState(null);
  const [notificaciones, setNotificaciones] = useState(true);
  const [ubicacion, setUbicacion] = useState(false);
  const [modoOscuro, setModoOscuro] = useState(false);

  // Estados Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [editNombre, setEditNombre] = useState("");
  const [editTelefono, setEditTelefono] = useState("");
  const [editPass, setEditPass] = useState("");

  useFocusEffect(
    useCallback(() => {
      const currentUser = userCtrl.getUsuarioActivo();
      if (currentUser) {
        setUsuario(currentUser);
        setEditNombre(currentUser.nombre);
        setEditTelefono(currentUser.telefono || "");
        setEditPass(currentUser.contrasena);
      } else {
        navigation.replace("InicioSesion");
      }
    }, [])
  );

  const handleCerrarSesion = () => {
    userCtrl.cerrarSesion();
    navigation.replace("InicioSesion");
  };

  const abrirWhatsApp = () => Linking.openURL("https://wa.me/5210000000000");
  const abrirFacebook = () => Linking.openURL("https://facebook.com/mivecinoeltaco");
  const abrirCorreo = () => Linking.openURL("mailto:contacto@mivecinoeltaco.com");

  // Lógica Guardar (Update)
  const handleGuardarCambios = async () => {
    if (!editNombre || !editPass) {
      Alert.alert("Error", "Nombre y contraseña no pueden estar vacíos");
      return;
    }

    if (usuario.contrasena !== editPass) {
      Alert.alert(
        "Seguridad",
        "Hemos detectado un cambio de contraseña. Se enviará un aviso de verificación a tu correo.",
        [{ text: "Entendido", onPress: () => procederGuardar() }]
      );
    } else {
      procederGuardar();
    }
  };

  const procederGuardar = async () => {
    const exito = await userCtrl.editarDatos(usuario.id, editNombre, editTelefono, editPass);
    if (exito) {
      setUsuario({ ...usuario, nombre: editNombre, telefono: editTelefono, contrasena: editPass });
      setModalVisible(false);
      Alert.alert("Éxito", "Tus datos han sido actualizados.");
    } else {
      Alert.alert("Error", "No se pudieron actualizar los datos.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FF8C00" barStyle="light-content" />
      <Text style={styles.title}>AJUSTES</Text>

      <View style={styles.profile}>
        <Ionicons name="person-circle-outline" size={60} color="#FF8C00" />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={styles.profileName}>
            {usuario ? usuario.nombre : "Cargando..."}
          </Text>
          <Text style={styles.profileEmail}>
            {usuario ? usuario.correo : ""}
          </Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="create-outline" size={24} color="#FF8C00" />
        </TouchableOpacity>
      </View>

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
        {["MÉTODOS DE PAGO", "PRIVACIDAD Y SEGURIDAD", "IDIOMA"].map(
          (item, index) => (
            <TouchableOpacity key={index} style={styles.linkRow}>
              <Text style={styles.linkLabel}>{item}</Text>
              <Ionicons name="chevron-forward" size={20} color="#FF8C00" />
            </TouchableOpacity>
          )
        )}

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
          <TouchableOpacity style={styles.logoutButton} onPress={handleCerrarSesion}>
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* MODAL EDICIÓN */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Perfil</Text>

            <Text style={styles.labelInput}>Nombre:</Text>
            <TextInput style={styles.input} value={editNombre} onChangeText={setEditNombre} />

            <Text style={styles.labelInput}>Teléfono:</Text>
            <TextInput style={styles.input} value={editTelefono} onChangeText={setEditTelefono} keyboardType="phone-pad" />

            <Text style={styles.labelInput}>Contraseña:</Text>
            <TextInput style={styles.input} value={editPass} onChangeText={setEditPass} />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.btnModal, { backgroundColor: '#ccc' }]} onPress={() => setModalVisible(false)}>
                <Text>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btnModal, { backgroundColor: '#FF8C00' }]} onPress={handleGuardarCambios}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  title: { fontSize: 22, fontWeight: "bold", color: "#1F1F1F", textAlign: "center", marginVertical: 15 },
  profile: { flexDirection: "row", alignItems: "center", padding: 20, borderBottomWidth: 1, borderColor: "#FF8C00", backgroundColor: "#FFF8F0" },
  profileName: { fontSize: 16, fontWeight: "bold", color: "#1F1F1F" },
  profileEmail: { fontSize: 13, color: "#666" },
  scroll: { paddingHorizontal: 20, paddingBottom: 30 },
  section: { fontSize: 14, fontWeight: "bold", color: "#FF8C00", marginTop: 20, marginBottom: 10 },
  settingRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  settingLabel: { fontSize: 15, color: "#1F1F1F" },
  linkRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 12, borderBottomWidth: 1, borderColor: "#EEE" },
  linkLabel: { fontSize: 15, color: "#1F1F1F" },
  footer: { alignItems: "center", marginTop: 30 },
  version: { fontSize: 12, color: "#999" },
  brand: { fontSize: 12, color: "#999", marginBottom: 10 },
  socialRow: { flexDirection: "row", marginBottom: 16 },
  socialIcon: { width: 28, height: 28, marginHorizontal: 10, resizeMode: "contain" },
  logoutButton: { backgroundColor: "#FF3B30", paddingVertical: 10, paddingHorizontal: 30, borderRadius: 20 },
  logoutText: { color: "#FFF", fontWeight: "bold", fontSize: 14 },
  
  // Styles Modal
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { width: '85%', backgroundColor: 'white', borderRadius: 15, padding: 20, elevation: 5 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#FF8C00', marginBottom: 15, textAlign: 'center' },
  labelInput: { fontWeight: 'bold', marginTop: 10, color: '#333' },
  input: { borderBottomWidth: 1, borderColor: '#ccc', paddingVertical: 5, fontSize: 16 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 },
  btnModal: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 }
});