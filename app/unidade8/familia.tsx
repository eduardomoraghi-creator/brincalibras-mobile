import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function FamiliaScreen() {
  const router = useRouter();

  const cards = [
    { id: 'intro', title: 'Introdução - Sinais Básicos', progress: 100, link: '/unidade8/introducao' },
    { id: 'a1', title: 'Atividade 1 - Associar Sinais', progress: 60, link: '/unidade8/atividade1' },
    { id: 'a2', title: 'Atividade 2 - Árvore Genealógica', progress: 30, link: '/unidade8/atividadeArvore' },
  ];

  return (
    <View style={styles.screen}>
        <View style={styles.header}>
            <TouchableOpacity 
                style={styles.back} 
                onPress={() => router.replace('/footer/atividades')}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                accessibilityLabel="Voltar"    
            >
                <Ionicons name="arrow-back" size={22} color="#fff" />
            </TouchableOpacity>

            <View style={styles.headerCenter}>
            <MaterialIcons name="family-restroom" size={28} color="#fff" />
            <Text style={styles.headerTitle}>Família</Text>
            </View>
        </View>

        <ScrollView style={styles.content}>
            {cards.map(card => (
                <View key={card.id} style={styles.card}>
                    <View style={styles.cardRow}>
                    <MaterialIcons name="people" size={28} color="#6A04D1" />
                    <Text style={styles.cardTitle}>{card.title}</Text>
                    </View>

                    <View style={styles.progressWrap}>
                    <View style={styles.progressTrack}>
                        <View style={[styles.progressFill, { width: `${card.progress}%` }]} />
                    </View>
                    <Text style={styles.progressLabel}>{card.progress}%</Text>
                    </View>

                    <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => router.replace(card.link as any)}
                    >
                    <Text style={styles.actionText}>Continuar</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    </View>
  );
}

const PURPLE = '#6A04D1';

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: 70,
        backgroundColor: PURPLE
    ,
        paddingHorizontal: 16,
        justifyContent: 'center',
    },
    back: {
        position: 'absolute',
        left: 12,
        zIndex: 10,
        padding: 8,
    },
    headerCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    content: {
        paddingHorizontal: 18,
        paddingTop: 18,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: PURPLE
    ,
        paddingVertical: 14,
        paddingHorizontal: 14,
        marginBottom: 14,
        elevation: 3,
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 12,
    },

    progressWrap: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    },
    progressTrack: {
    flex: 1,
    height: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    overflow: 'hidden',
    marginRight: 12,
    },
    progressFill: {
    height: '100%',
    backgroundColor: PURPLE
,
    },
    progressLabel: {
    width: 40,
    textAlign: 'right',
    color: '#444',
    fontWeight: '600',
    },
    actionBtn: {
    marginTop: 12,
    backgroundColor: PURPLE
,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    },
    actionText: {
    color: '#fff',
    fontWeight: '700',
    },
});