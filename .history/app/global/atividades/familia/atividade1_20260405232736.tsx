import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { TreeSlot } from '../../../../src/components/treeSlot';
import { useTreeActivity } from '/hooks/useTreeActivity';

// Cores principais
const PURPLE = '#6A04D1';
const GREEN = '#2E7D32';
const RED = '#D32F2F';
const GOLD = '#FFD700';
const BACKGROUND = '#F8F9FA';
const BORDER_LIGHT = '#E0E0E0';

export default function Atividade2Screen() {
  const router = useRouter();

  const {
    step,
    currentFase,
    options,
    isAnswered,
    isCorrect,
    handleAnswer,
    nextStep,
    total,
    totalQuestions,
    score,
    isFinished
  } = useTreeActivity();

  const percent = totalQuestions ? (score / totalQuestions) * 100 : 0;

  // RESULT SCREEN
  if (isFinished) {
    return (
      <SafeAreaView style={[styles.screen, { backgroundColor: PURPLE }]}>
        <View style={styles.resultContainer}>
          <MaterialIcons name="stars" size={100} color={GOLD} />
          <Text style={styles.resultTitle}>Atividade Concluída!</Text>

          <View style={styles.scoreBox}>
            <Text style={styles.scoreText}>Sua pontuação:</Text>
            <Text style={styles.scoreNumber}>
              {score} / {totalQuestions}
            </Text>
          </View>

          <Text style={styles.resultMessage}>
            {score === totalQuestions
              ? "Incrível! Você dominou todos os sinais! 🏆"
              : percent <= 50
              ? "Não desanime! Revise os sinais e tente novamente!"
              : "Muito bem! Continue praticando para alcançar a nota máxima! 💪"}
          </Text>

          <TouchableOpacity
            style={styles.finishBtn}
            onPress={() => router.replace('../global/atividades/familia/familia')}
          >
            <Text style={styles.finishBtnText}>VOLTAR PARA A UNIDADE</Text>
            <Ionicons name="home" size={20} color="#fff" style={{ marginLeft: 10 }} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // QUIZ SCREEN
  const posicoes = currentFase?.posicoes ?? {};

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: BACKGROUND }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push('../global/atividades/familia')}
          style={styles.back}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Atividade 2 - Árvore Genealógica</Text>

        <Text style={styles.stepText}>
          {step + 1} / {total}
        </Text>
      </View>

      {/* Progress */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${((step + 1) / total) * 100}%` }]} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.pergunta}>Quem falta na árvore?</Text>

        {/* TREE */}
        <View style={styles.treeContainer}>
          <View style={styles.row}>
            <TreeSlot
              label={posicoes.top1?.label ?? ''}
              isFilled={!posicoes.top1?.hidden || (isAnswered && isCorrect && currentFase?.target === posicoes.top1?.label)}
              isTarget={posicoes.top1?.hidden}
            />
            <TreeSlot
              label={posicoes.top2?.label ?? ''}
              isFilled={!posicoes.top2?.hidden || (isAnswered && isCorrect && currentFase?.target === posicoes.top2?.label)}
              isTarget={posicoes.top2?.hidden}
            />
          </View>

          <View style={styles.connectorContainer}>
            <View style={styles.horizontalLine} />
            <View style={styles.verticalLine} />
          </View>

          <View style={styles.row}>
            <TreeSlot
              label={posicoes.bottom?.label ?? ''}
              isFilled={!posicoes.bottom?.hidden || (isAnswered && isCorrect && currentFase?.target === posicoes.bottom?.label)}
              isTarget={posicoes.bottom?.hidden}
            />
          </View>
        </View>

        {/* Options */}
        <View style={styles.optionsWrapper}>
          <Text style={styles.hintText}>Selecione o sinal correto:</Text>
          <View style={styles.optionsRow}>
            {options.map((opt, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.optionCard,
                  isAnswered && opt.label === currentFase?.target && styles.correctCard,
                  isAnswered && opt.label !== currentFase?.target && styles.wrongCard
                ]}
                onPress={() => handleAnswer(opt.label)}
                disabled={isAnswered}
              >
                <MaterialCommunityIcons name="hand-front-right" size={30} color={PURPLE} />
                <Text style={styles.optionLabel}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {isAnswered && (
          <View style={styles.feedbackArea}>
            <View style={[styles.gabaritoBox, isCorrect ? styles.bgSuccess : styles.bgError]}>
              <Text style={styles.gabaritoText}>{isCorrect ? "Muito bem!" : "Não foi dessa vez..."}</Text>
              <Text style={styles.gabaritoSub}>{currentFase?.gabarito ?? ''}</Text>
            </View>

            <TouchableOpacity style={styles.nextBtn} onPress={nextStep}>
              <Text style={styles.nextBtnText}>CONTINUAR</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    height: 70,
    backgroundColor: PURPLE,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between'
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  stepText: { color: '#fff', fontWeight: '600' },
  back: { padding: 4 },
  progressTrack: { height: 6, backgroundColor: BORDER_LIGHT, width: '100%' },
  progressFill: { height: '100%', backgroundColor: GOLD },
  content: { flex: 1, padding: 20, alignItems: 'center' },
  pergunta: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  treeContainer: { marginVertical: 30, alignItems: 'center', width: '100%' },
  row: { flexDirection: 'row', gap: 50, justifyContent: 'center' },
  connectorContainer: { alignItems: 'center', height: 40, width: '100%' },
  horizontalLine: { width: 50, height: 2, backgroundColor: '#CCC', top: -40 },
  verticalLine: { width: 2, height: 80, backgroundColor: '#CCC', top: -40 },
  optionsWrapper: { width: '100%', marginTop: 20 },
  hintText: { textAlign: 'center', color: '#666', marginBottom: 15, fontWeight: '600' },
  optionsRow: { flexDirection: 'row', justifyContent: 'center', gap: 10 },
  optionCard: {
    width: 90,
    height: 90,
    backgroundColor: '#fff',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: BORDER_LIGHT,
    elevation: 3
  },
  correctCard: { borderColor: GREEN, backgroundColor: '#E8F5E9' },
  wrongCard: { borderColor: RED, opacity: 0.6 },
  optionLabel: { fontSize: 12, fontWeight: 'bold', marginTop: 5, color: PURPLE },
  feedbackArea: { width: '100%', marginTop: 20 },
  gabaritoBox: { padding: 15, borderRadius: 12, marginBottom: 15 },
  bgSuccess: { backgroundColor: GREEN },
  bgError: { backgroundColor: RED },
  gabaritoText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  gabaritoSub: { color: '#fff', fontSize: 14, marginTop: 4 },
  nextBtn: { backgroundColor: PURPLE, padding: 16, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  nextBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginRight: 8 },
  resultContainer: { width: '85%', backgroundColor: '#fff', borderRadius: 25, padding: 30, alignItems: 'center', elevation: 10 },
  resultTitle: { fontSize: 24, fontWeight: 'bold', color: '#333', marginTop: 15 },
  scoreBox: { marginVertical: 20, alignItems: 'center' },
  scoreText: { fontSize: 16, color: '#666' },
  scoreNumber: { fontSize: 48, fontWeight: '900', color: PURPLE },
  resultMessage: { textAlign: 'center', fontSize: 16, color: '#444', marginBottom: 30, lineHeight: 22 },
  finishBtn: { backgroundColor: PURPLE, flexDirection: 'row', paddingVertical: 15, paddingHorizontal: 25, borderRadius: 15, alignItems: 'center', width: '100%', justifyContent: 'center' },
  finishBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});