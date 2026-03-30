// src/components/loginLayout.tsx
import React from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet } from 'react-native';

type LoginLayoutProps = { children: React.ReactNode };

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.innerContainer}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  innerContainer: { /* Não precisa de flex:1 */ },
});