import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { unidadeStyles } from '@/styles/unidadeStyles';
import { UnidadeCard } from '@/components/unidadeCard'

export default function Atividades() {
  const router = useRouter();

  const unidades = [
    { // Siga esse padrão do JSON para criar novos cards de unidades
      id: 8,
      nome: 'Família',
      cor: '#6A04D1',
      icone: 'family-restroom',
      path: './unidades/familia/familia' as const,
    },
  ];

  return (
    <View style={styles.screen}>
      {/* 
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={TEXT_COLOR} />
        </TouchableOpacity>

        <View style={styles.headerSpacer} />
      </View>
      */}
      <Text style={styles.screenTitle}>Unidades</Text>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardsContainer}>
          {unidades.map((item) => (
            <UnidadeCard
              key={item.id}
              nome={item.nome}
              cor={item.cor}
              icone={item.icone}
              onPress={() => router.push(item.path)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  ...unidadeStyles(null),
  screenTitle: {
    marginTop: 30,
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 15,
    color: '#000000',
    fontWeight: 'bold',
  }
});