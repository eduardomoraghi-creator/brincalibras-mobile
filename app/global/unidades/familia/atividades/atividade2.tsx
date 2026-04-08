import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { TreeSlot } from '@/components/treeSlot';
import { useTreeActivity } from '@/../hooks/useTreeActivity';
import { unidadeStyles } from '@/styles/unidadeStyles';
import { Colors } from '@/constants/theme';
import { s, vs, ms } from 'react-native-size-matters';

const COR_UNIDADE = '#6A04D1';

export default function Atividade2Screen() {
  const router = useRouter();

  const ROTAS = {
    familia: '../familia' as const
  };

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
      <SafeAreaProvider style={[styles.screen, { backgroundColor: COR_UNIDADE }]}>
        <View style={styles.alignResultContainer}>
          <View style={styles.resultContainer}>
            <MaterialIcons name="stars" size={100} color={Colors.gold} />
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
              onPress={() => router.replace('../familia')}
            >
              <Text style={styles.finishBtnText}>VOLTAR PARA A UNIDADE</Text>
              <Ionicons name="home" size={20} color="#fff" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaProvider>
    );
  }

  // QUIZ SCREEN
  const posicoes = currentFase?.posicoes ?? {};

  return (
    <SafeAreaProvider style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => router.push(ROTAS.familia)}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          accessibilityLabel="Voltar"
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Atividade 2 - Árvore Genealógica</Text>
        </View>
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

        {/* Opções */}
        <View style={styles.optionsWrapper}>
          <Text style={styles.hintText}>Selecione o sinal correto:</Text>
          <View style={styles.optionsRow}>
            {options.map((opt, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.optionCard,
                  isAnswered && opt.label === currentFase?.target && styles.correctOption,
                  isAnswered && opt.label !== currentFase?.target && styles.wrongOption
                ]}
                onPress={() => handleAnswer(opt.label)}
                disabled={isAnswered}
              >
                <MaterialCommunityIcons name="hand-front-right" size={30} color={COR_UNIDADE} />
                <Text style={styles.optionLabel}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      
        <View style={{flex: 1, minHeight: 10}}/>

        {/* Barra de progresso */}
        <View style={{ width: '100%', marginBottom: vs(10) }}>
          <View style={styles.progressContainer}>

            <View style={styles.progressInfo}>

              <Text style={styles.progressText}>
                Progresso da lição
              </Text>
              <Text style={styles.progressCount}>
                {`${step + 1} / ${total}`}
              </Text>

            </View>

            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${((step + 1) / total) * 100}%` }]} />
            </View>

          </View>
          <View 
            style={[
              styles.feedbackArea, 
              { opacity: isAnswered ? 1 : 0 }
            ]} 
            pointerEvents={isAnswered ? 'auto' : 'none'}
          >
            <View style={[styles.gabaritoBox, isCorrect ? styles.bgSuccess : styles.bgError]}>
              <Text style={styles.gabaritoText}>{isCorrect ? "Muito bem!" : "Não foi dessa vez..."}</Text>
              <Text style={styles.gabaritoSub}>{currentFase?.gabarito ?? ''}</Text>
            </View>

            <TouchableOpacity style={styles.nextBtn} onPress={nextStep}>
              <Text style={styles.nextBtnText}>CONTINUAR</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  ...unidadeStyles(COR_UNIDADE),

  // Árvore Genealógica
  treeContainer: { 
    marginVertical: vs(10), // vs para altura
    alignItems: 'center', 
    width: '100%' 
  },
  row: { 
    flexDirection: 'row', 
    gap: s(40), // s para espaçamento horizontal
    justifyContent: 'center' 
  },
  connectorContainer: { 
    alignItems: 'center', 
    height: vs(20), 
    width: '100%' 
  },
  horizontalLine: { 
    width: s(40), 
    height: 2, 
    backgroundColor: '#CCC', 
    top: vs(-40) 
  },
  verticalLine: { 
    width: 2, 
    height: vs(60), 
    backgroundColor: '#CCC', 
    top: vs(-40) 
  },

  optionsWrapper: { 
    width: '100%', 
    marginTop: 0
  },

  // Opções do Gabarito
  hintText: { 
    textAlign: 'center', 
    color: '#666', 
    marginBottom: vs(10), 
    fontWeight: '600',
    fontSize: ms(14) // ms para fontes
  },
  feedbackArea: { 
    width: '100%', 
    marginTop: vs(10),
    height: vs(120), // Altura fixa reservada para o feedback não empurrar nada
    justifyContent: 'flex-end'
  },
  gabaritoBox: { 
    padding: ms(12), 
    borderRadius: ms(12), 
    marginBottom: vs(5) 
  },
  gabaritoText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: ms(16) 
  },
  gabaritoSub: { 
    color: '#fff', 
    fontSize: ms(13), 
    marginTop: vs(2) 
  },
  bgSuccess: { backgroundColor: Colors.green },
  bgError: { backgroundColor: Colors.red },
});