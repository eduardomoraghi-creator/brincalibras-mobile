import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAdmin } from '../../hooks/useAdmin';
import Footer from '../../src/components/Footer';

export default function AdminScreen() {
  const { router, carregando, logout, adminName } = useAdmin();

  if (carregando) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#3A8FB7" />
        <Text>Carregando dados do administrador...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo, {adminName || 'Admin'}</Text>

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  button: {
    backgroundColor: '#3A8FB7',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
});