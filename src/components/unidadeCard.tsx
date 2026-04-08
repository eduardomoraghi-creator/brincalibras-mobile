import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { unidadeStyles } from '@/styles/unidadeStyles';

interface UnidadeCardProps {
  nome: string;
  cor: string;
  icone: any; // Nome do ícone do MaterialIcons
  onPress: () => void;
}

const ICON_SIZE = 80;
const styles = unidadeStyles('#6A04D1');

export const UnidadeCard = ({ nome, cor, icone, onPress }: UnidadeCardProps) => (
  <TouchableOpacity
    style={styles.card}
    activeOpacity={0.8}
    onPress={onPress}
  >
    <View style={[styles.bgIconContainer, { backgroundColor: cor }]}>
      <MaterialIcons name={icone} size={ICON_SIZE} color="#fff" />
      <Text style={styles.cardText}>{nome}</Text>
    </View>
  </TouchableOpacity>
);