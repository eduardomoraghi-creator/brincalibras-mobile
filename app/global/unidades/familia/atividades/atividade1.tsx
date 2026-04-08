import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import YoutubePlayer from 'react-native-youtube-iframe';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useQuiz } from '@/../hooks/useQuiz';

import { unidadeStyles } from '@/styles/unidadeStyles';
import { Colors } from '@/constants/theme';

const SINAIS_BASE = [
  { label: 'Filha', videoId: 'FrJLTByoeiM' },
  { label: 'Filho', videoId: '8DVD6FkRU7s' },
  { label: 'Pai', videoId: '94hJU7keujI' },
  { label: 'Mãe', videoId: 'IljftNTMgqU' }
];

const COR_UNIDADE = '#6A04D1';
const styles = unidadeStyles(COR_UNIDADE);

const { width } = Dimensions.get("window");

export default function Atividade1Screen() {
  const router = useRouter();

  const ROTAS = {
    familia: "../familia" as const
  };

  const {
    currentItem,
    currentStep,
    options,
    selectedOption,
    isAnswered,
    isFinished,
    score,
    totalQuestions,
    progress,
    checkAnswer,
    nextStep,
    isCorrect
  } = useQuiz(SINAIS_BASE);

  const percent = totalQuestions ? (score / totalQuestions) * 100 : 0;

  // Tela de resultado final
  if (isFinished) {
    return (
      <SafeAreaView style={[styles.screen, { backgroundColor: COR_UNIDADE }]}>
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
      </SafeAreaView>
    );
  }

  // Tela de quiz
  return (
    <SafeAreaProvider style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => router.replace(ROTAS.familia)}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          accessibilityLabel="Voltar"
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Atividade 1 - Associar Sinais</Text>
        </View>
      </View>
      {/* Conteúdo */}
      <View style={styles.content}>
        <Text style={{...styles.pergunta, marginBottom: 10}}>Qual é este sinal?</Text>

        <View style={styles.mediaBox}>
          <View style={{ width: '100%', aspectRatio: 16 / 9 }}>
            <YoutubePlayer
              key={`yt-${currentItem?.videoId ?? SINAIS_BASE[0].videoId}`}
              play={true}
              videoId={currentItem?.videoId ?? SINAIS_BASE[0].videoId}
              height={width * 0.6}
            />
          </View>
        </View>

        <View style={styles.optionsContainer}>
          {options.map((opcao, index) => {
            const isThisCorrect = isAnswered && opcao === currentItem?.label;
            const isThisWrong = isAnswered && selectedOption === opcao && opcao !== currentItem?.label;

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionBtn,
                  isThisCorrect && styles.correctOption,
                  isThisWrong && styles.wrongOption,
                  selectedOption === opcao && !isAnswered && styles.selectedOption
                ]}
                onPress={() => checkAnswer(opcao)}
                disabled={isAnswered}
              >
                <Text style={[styles.optionText]}>
                  {opcao}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        
        {/* Barra de progresso */}
        <View style={styles.progressContainer}>

          <View style={styles.progressInfo}>

            <Text style={styles.progressText}>
              Progresso da lição
            </Text>
            <Text style={styles.progressCount}>
              {`${currentStep + 1} / ${SINAIS_BASE.length}`}
            </Text>

          </View>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>

        </View>

        <View 
          style={{ 
            width: '100%', 
            opacity: isAnswered ? 1 : 0, // Invisível se não respondido
            marginTop: 10 
          }}
          pointerEvents={isAnswered ? 'auto' : 'none'} // Impede cliques quando invisível
        >
          <TouchableOpacity style={styles.nextBtn} onPress={nextStep}>
            <Text style={styles.nextBtnText}>
              {isCorrect ? "ACERTOU! PRÓXIMO" : "OPS! PRÓXIMO"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaProvider>
  );
}