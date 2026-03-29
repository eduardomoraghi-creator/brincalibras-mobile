// app/footer/_layout.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Slot, useRouter, useSegments } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useTheme, ThemeProvider } from '../../src/contexts/themeContext';

const FOOTER_HEIGHT = 70;

function LayoutContent() {
  const { theme, darkMode, toggleDarkMode } = useTheme();
  const router = useRouter();
  const segments = useSegments() as string[];
  const isSuporte = segments.includes('suporte'); // controle de tela suporte

  const handleVoltar = () => {
    try {
      router.back();
    } catch {
      router.push('/footer/home');
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={['top', 'bottom']}
    >
      {/* 🔹 HEADER COM MAO + BRINCA LIBRAS */}
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <TouchableOpacity onPress={handleVoltar} style={{ width: 26 }}>
          <Ionicons name="arrow-back" size={26} color={theme.text} />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/homeLight/mao.png')}
            style={styles.logoMao}
          />
          <Image
            source={require('../../assets/images/homeLight/BrincaLibras.png')}
            style={styles.logoTexto}
          />
        </View>

        <View style={{ width: 26 }} />
      </View>

      {/* 🔹 CONTEÚDO DAS TELAS */}
      <View style={[styles.content, { marginBottom: FOOTER_HEIGHT }]}>
        <Slot />
      </View>

      {/* 🔹 FOOTER */}
      <View
        style={[
          styles.footer,
          { backgroundColor: theme.footer, borderTopColor: theme.border || '#ccc' },
        ]}
      >
        <TouchableOpacity onPress={() => router.push('/footer/perfil')}>
          <Ionicons name="person" size={26} color={theme.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/footer/dicionario')}>
          <MaterialIcons name="sort-by-alpha" size={26} color={theme.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/footer/home')}>
          <Ionicons name="home" size={26} color={theme.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/footer/suporte')}>
          <Ionicons name="help-circle" size={26} color={theme.icon} />
        </TouchableOpacity>

        {isSuporte && (
          <TouchableOpacity onPress={toggleDarkMode}>
            <FontAwesome5
              name={darkMode ? 'sun' : 'moon'}
              size={22}
              color={theme.icon}
              solid
            />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <LayoutContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    paddingTop: 45,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoMao: { width: 60, height: 60, resizeMode: 'contain', marginRight: 10 },
  logoTexto: { width: 180, height: 60, resizeMode: 'contain' },

  content: { flex: 1 },

  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: FOOTER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 0.5,
  },
});