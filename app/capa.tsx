// app/capa.tsx
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter, Href } from 'expo-router';

const TEMPO_EXIBICAO_MS = 3000;

export default function CapaScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const destino = (params.destino as Href) || '/global/home';

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace(destino);
    }, TEMPO_EXIBICAO_MS);

    return () => clearTimeout(timer);
  }, [destino, router]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/inicial/capa.png')}
        style={styles.background}
        blurRadius={15}
      />

      <Image
        source={require('../assets/images/inicial/capa.png')}
        style={styles.imagem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagem: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});