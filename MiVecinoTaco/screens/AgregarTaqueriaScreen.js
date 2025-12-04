import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  Alert, 
  ScrollView 
} from 'react-native';

import { registrarTaqueria } from '../controllers/TaqueriaController';

const USUARIO_ID_MOCK = 1;

const AgregarTaqueriaScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [horario, setHorario] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegistro = async () => {
    
    if (!nombre.trim() || !direccion.trim() || !telefono.trim()) {
      Alert.alert('Campos incompletos', 'Por favor, rellena el Nombre, Dirección y Teléfono.');
      return;
    }

    setLoading(true);

    try {
      const resultado = await registrarTaqueria(
        nombre.trim(),
        direccion.trim(),
        telefono.trim(),
        horario.trim(),
        USUARIO_ID_MOCK 
      );

      if (resultado.error) {
        Alert.alert('Error al registrar', resultado.mensaje || 'Ocurrió un error desconocido');
      } else {
        Alert.alert(
          '¡Registro Exitoso! 🥳', 
          resultado.mensaje,
          [{ text: "OK", onPress: () => navigation.goBack() }]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Falló la comunicación con la base de datos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} style={styles.container}>
      <Text style={styles.title}>Registrar Nueva Taquería</Text>
      <Text style={styles.subtitle}>¡Únete a la comunidad de MiVecinoTaco!</Text>

      <Text style={styles.label}>Nombre de la Taquería (*)</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Ej: Tacos El Padrino"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Dirección (*)</Text>
      <TextInput
        style={styles.input}
        value={direccion}
        onChangeText={setDireccion}
        placeholder="Ej: Av. Juárez #101, Col. Centro"
        placeholderTextColor="#999"
        multiline
      />

      <Text style={styles.label}>Teléfono de Contacto (*)</Text>
      <TextInput
        style={styles.input}
        value={telefono}
        onChangeText={setTelefono}
        placeholder="Ej: 5512345678"
        placeholderTextColor="#999"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Horario (Opcional)</Text>
      <TextInput
        style={styles.input}
        value={horario}
        onChangeText={setHorario}
        placeholder="Ej: Lunes a Sábado, 18:00 - 02:00"
        placeholderTextColor="#999"
      />

      <View style={styles.buttonContainer}>
        <Button 
          title={loading ? "Registrando..." : "Registrar Taquería"} 
          onPress={handleRegistro} 
          disabled={loading}
          color="#FF7F50"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 50, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    minHeight: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    color: '#000',
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 20,
  }
});

export default AgregarTaqueriaScreen;