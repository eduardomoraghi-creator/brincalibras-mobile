import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import YoutubePlayer from 'react-native-youtube-iframe';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useSlides from '@/../hooks/useSlides';
import { unidadeStyles } from '@/styles/unidadeStyles';

const { width } = Dimensions.get('window');

const COR_UNIDADE = '#6A04D1';
const styles = unidadeStyles(COR_UNIDADE);

export default function Aula2Screen() {
  const router = useRouter();

  // ROTAS AJUSTADAS (ABSOLUTAS)
  const ROTAS = {
    familia: '../familia' as const,
    atividade2: '../atividades/atividade2' as const,
  };

  const slides = [
    { label: 'Avô', videoId: 'Les9uc10LdY' },
    { label: 'Avó', videoId: 'm0j6_6SG3F8' },
    { label: 'Irmã', videoId: '2XK_ATK99Bg' },
    { label: 'Irmão', videoId: 'lAG2qvy04ok' }
  ];

  const {
    item: slideAtual,
    next,
    prev,
    length,
    maxVisited,
    isFinished,
    isFirst,
    isLast
  } = useSlides(slides, { circular: false });

  const progressPercent = ((maxVisited + 1) / length) * 100;

  return (
    <SafeAreaProvider style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.back}
          onPress={() =>
            router.replace(ROTAS.familia)
          }
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color="#fff"
          />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>
            Aula 2 - Avôs e irmãos
          </Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        <Text style={styles.introText}>
          Reproduza os sinais até se acostumar com eles
        </Text>

        <View style={styles.mediaBox}>
          <View style={{ width: '100%', aspectRatio: 16 / 9 }}>
            <YoutubePlayer
              key={`yt-${slideAtual.videoId}`}
              height={width * 0.6}
              play={true}
              videoId={slideAtual.videoId}
            />
          </View>
        </View>

        <View style={styles.mediaControls}>

          <TouchableOpacity
            style={[
              styles.iconBtn,
              isFirst && { opacity: 0.3 }
            ]}
            onPress={prev}
            disabled={isFirst}
          >
            <Ionicons name="chevron-back-circle" size={48} color={COR_UNIDADE} />
          </TouchableOpacity>

          <View style={styles.wordBox}>
            <Text style={styles.wordText}>
              {slideAtual?.label}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.iconBtn,
              isLast && { opacity: 0.3 }
            ]}
            onPress={next}
            disabled={isLast}
          >
            <Ionicons name="chevron-forward-circle" size={48} color={COR_UNIDADE} />
          </TouchableOpacity>

        </View>

        {isFinished ? (
          <Text style={styles.completedMessage}>
            ✨ Concluído! Você pode seguir para a próxima lição.
          </Text>
        ) : (
          <Text style={[styles.introText, { marginTop: 20, marginBottom: 0 }]}>
            Assista a todos os sinais para liberar a próxima lição.
          </Text>
        )}

        <View style={styles.progressContainer}>

          <View style={styles.progressInfo}>

            <Text style={styles.progressText}>
              Progresso da lição
            </Text>

            <Text style={styles.progressCount}>
              {`${maxVisited + 1} / ${length}`}
            </Text>

          </View>

          <View style={styles.progressTrack}>

            <View
              style={[
                styles.progressFill,
                { width: `${progressPercent}%` }
              ]}
            />

          </View>

        </View>

        <TouchableOpacity
          style={[
            styles.actionBtn,
            !isFinished && styles.disabledBtn
          ]}
          onPress={() =>
            router.replace(ROTAS.atividade2)
          }
          disabled={!isFinished}
        >
          <Text style={styles.actionText}>
            {isFinished
              ? "Continuar"
              : "Assista tudo para liberar"}
          </Text>
        </TouchableOpacity>

      </ScrollView>

    </SafeAreaProvider>
  );
}