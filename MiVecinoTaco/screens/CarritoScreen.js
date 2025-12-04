import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import { CarritoController } from "../controllers/CarritoController";
import { PedidoController } from "../controllers/PedidoController";
import { UsuarioController } from "../controllers/UsuarioController";

export default function CarritoScreen({ navigation }) {
  const cartCtrl = new CarritoController();
  const pedidoCtrl = new PedidoController();
  const userCtrl = new UsuarioController();

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setItems([...cartCtrl.obtenerCarrito()]);
      setTotal(cartCtrl.obtenerTotal());
    }, [])
  );

  const eliminarDelCarrito = (cartId) => {
    cartCtrl.eliminarProducto(cartId);
    setItems([...cartCtrl.obtenerCarrito()]);
    setTotal(cartCtrl.obtenerTotal());
  };

  const confirmarPedido = async () => {
    const usuario = userCtrl.getUsuarioActivo();
    if (!usuario) return Alert.alert("Error", "Debes iniciar sesión.");
    
    if (items.length === 0) return;

    Alert.alert(
      "Confirmar Orden",
      `Total a pagar: $${total}. ¿Enviar pedido a cocina?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          onPress: async () => {
            for (let item of items) {
               await pedidoCtrl.realizarPedido(usuario.id, item.nombre);
            }
            cartCtrl.limpiarCarrito();
            setItems([]);
            setTotal(0);
            Alert.alert("¡Pedido Enviado!", "Tu comida se está preparando. Revisa tus notificaciones.");
            navigation.navigate("Tabs", { screen: "INICIO" });
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#1F1F1F" />
        </TouchableOpacity>
        <Text style={styles.title}>Mi Carrito</Text>
        <View style={{width: 28}}/>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {items.length === 0 ? (
          <View style={styles.emptyContainer}>
             <Ionicons name="cart-outline" size={80} color="#ccc" />
             <Text style={styles.emptyText}>Tu carrito está vacío.</Text>
          </View>
        ) : (
          items.map((item, index) => (
            <View key={index} style={styles.card}>
              <View>
                  <Text style={styles.prodName}>{item.nombre}</Text>
                  <Text style={styles.prodPrice}>{item.precio}</Text>
              </View>
              <TouchableOpacity onPress={() => eliminarDelCarrito(item.cartId)}>
                  <Ionicons name="trash-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {items.length > 0 && (
          <View style={styles.footer}>
              <Text style={styles.totalText}>Total: ${total}</Text>
              <TouchableOpacity style={styles.btnPay} onPress={confirmarPedido}>
                  <Text style={styles.btnPayText}>Realizar Pedido</Text>
              </TouchableOpacity>
          </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: { flexDirection: "row", justifyContent: "space-between", padding: 20, alignItems: "center", backgroundColor: "#FF8C00" },
  title: { fontSize: 20, fontWeight: "bold" },
  scroll: { padding: 20 },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  emptyText: { marginTop: 20, color: '#999', fontSize: 16 },
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderWidth: 1, borderColor: '#eee', borderRadius: 10, marginBottom: 10 },
  prodName: { fontWeight: 'bold', fontSize: 16 },
  prodPrice: { color: '#FF8C00', fontWeight: 'bold' },
  footer: { padding: 20, borderTopWidth: 1, borderColor: '#eee', backgroundColor: '#FFF8F0' },
  totalText: { fontSize: 20, fontWeight: 'bold', textAlign: 'right', marginBottom: 15 },
  btnPay: { backgroundColor: '#FF8C00', padding: 15, borderRadius: 12, alignItems: 'center' },
  btnPayText: { color: 'white', fontWeight: 'bold', fontSize: 18 }
});