import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface TreeSlotProps {
  label?: string; // O nome do membro da família (ex: "Pai", "Mãe", "Filho")
  image?: any; // A imagem do sinal correspondente (pode ser um require ou URI)
  isTarget?: boolean; // Indica se este slot é o alvo para arrastar o sinal
  isFilled?: boolean; // Indica se o slot já foi preenchido com o sinal correto
}

export const TreeSlot = ({ label, image, isTarget, isFilled }: TreeSlotProps) => {
  return (
    <View style={[styles.slot, isTarget && !isFilled && styles.targetSlot, isFilled && styles.filledSlot]}>
      {isFilled || (!isTarget && image) ? (
        <View style={styles.imageContainer}>
             {/* Placeholder da imagem do sinal */}
            <View style={styles.placeholderImg}>
                <MaterialCommunityIcons name="hands-pray" size={30} color={isFilled ? "#fff" : "#6A04D1"} />
            </View>
            <Text style={[styles.label, isFilled && { color: '#fff' }]}>{label}</Text>
        </View>
      ) : (
        <Text style={styles.questionMark}>???</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  slot: { width: 90, height: 100, backgroundColor: '#fff', borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#E0E0E0' },
  targetSlot: { borderStyle: 'dashed', borderColor: '#6A04D1', backgroundColor: '#F0E6FF' },
  filledSlot: { backgroundColor: '#6A04D1', borderColor: '#FFD700' },
  placeholderImg: { width: 50, height: 50, backgroundColor: '#eee', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  label: { fontSize: 12, fontWeight: 'bold', color: '#444', marginTop: 4 },
  questionMark: { fontSize: 24, fontWeight: 'bold', color: '#6A04D1' },
  imageContainer: { alignItems: 'center' }
});