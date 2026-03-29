import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // ✅ uso correto
import { Slot } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '../../src/contexts/themeContext';

const FOOTER_HEIGHT = 70;

export default function Layout() {
  const { theme, darkMode, toggleDarkMode } = useTheme();
  const router = require('expo-router').useRouter();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={['top', 'bottom']}
    >
      <View style={[styles.content, { marginBottom: FOOTER_HEIGHT }]}>
        <Slot />
      </View>

      <View
        style={[
          styles.footer,
          { backgroundColor: theme.footer, borderTopColor: theme.border || '#ccc' },
        ]}
      >
        <TouchableOpacity onPress={() => router.replace('/footer/perfil')}>
          <Ionicons name="person" size={26} color={theme.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/footer/dicionario')}>
          <MaterialIcons name="sort-by-alpha" size={26} color={theme.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/footer/home')}>
          <Ionicons name="home" size={26} color={theme.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/footer/suporte')}>
          <Ionicons name="help-circle" size={26} color={theme.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleDarkMode}>
          <FontAwesome5 name={darkMode ? 'sun' : 'moon'} size={22} color={theme.icon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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