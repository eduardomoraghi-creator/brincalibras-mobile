import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/themeContext';

interface CadastroLayoutProps {
  children: React.ReactNode;
}

export default function CadastroLayout({ children }: CadastroLayoutProps) {
  const { theme } = useTheme();

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.innerContainer}>
        {children}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  innerContainer: {
    flex: 1,
    width: '100%',
  },
});