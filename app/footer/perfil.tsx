import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// 🔥 HOOK
import { usePerfil } from '../../hooks/usePerfil';

export default function PerfilScreen() {
  const router = useRouter();
  const { usuario, nome, setNome, email, setEmail, loading, erro, salvar } = usePerfil();

  const darkMode = false; // pode integrar com tema global
  const theme = darkMode ? stylesDark : stylesLight;

  if (loading && !usuario) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
      {/* HEADER */}
      <View style={[styles.header, { backgroundColor: theme.header }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color={theme.text} />
        </TouchableOpacity>

        <Text style={[styles.title, { color: theme.text }]}>Meu Perfil</Text>

        <View style={{ width: 26 }} /> {/* espaço */}
      </View>

      <View style={styles.content}>
        {erro ? <Text style={{ color: 'red', marginBottom: 10 }}>{erro}</Text> : null}

        <Text style={[styles.label, { color: theme.text }]}>Nome</Text>
        <TextInput
          value={nome}
          onChangeText={setNome}
          style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text }]}
        />

        <Text style={[styles.label, { color: theme.text }]}>E-mail</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text }]}
        />

        <TouchableOpacity onPress={salvar} style={[styles.button, { backgroundColor: theme.button }]}>
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>Salvar alterações</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

/* ESTILOS */
const styles = StyleSheet.create({
  container: { flexGrow: 1 },
  header: {
    paddingTop: 55,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: { fontSize: 22, fontWeight: 'bold' },
  content: { padding: 20 },
  label: { marginBottom: 5, fontWeight: '600' },
  input: { borderRadius: 15, padding: 14, marginBottom: 15 },
  button: { paddingVertical: 14, borderRadius: 15, alignItems: 'center', marginTop: 10 },
  buttonText: { fontSize: 16, fontWeight: 'bold' }
});

/* TEMAS */
const stylesLight = {
  background: '#FFFFFF',
  header: '#3A8FB7',
  text: '#000000',
  inputBackground: '#EEE',
  button: '#000000',
  buttonText: '#FFFFFF',
  primary: '#6200ee'
};

const stylesDark = {
  background: '#2C2C2C',
  header: '#3A8FB7',
  text: '#FFFFFF',
  inputBackground: '#555555',
  button: '#BB86FC',
  buttonText: '#000000',
  primary: '#BB86FC'
};