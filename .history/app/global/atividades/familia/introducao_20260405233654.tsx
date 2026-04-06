import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import YoutubePlayer from "react-native-youtube-iframe";
import { Video, ResizeMode } from "expo-av";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useSlides from "../../../../hooks/useSlides";

const { width } = Dimensions.get("window");

export default function IntroducaoScreen() {
  const router = useRouter();

  // ROTAS TIPADAS
  const ROTAS = {
    familia: "../global/atividades/familia/familia" as const,
    atividade1: "../global/atividades/familia/atividade1" as const,
  };

  const slides = [
    { label: "Filha", videoId: "FrJLTByoeiM" },
    { label: "Filho", videoId: "8DVD6FkRU7s" },
    { label: "Pai", videoId: "94hJU7keujI" },
    { label: "Mãe", videoId: "IljftNTMgqU" },
  ];

  const {
    item: slideAtual,
    next,
    prev,
    length,
    maxVisited,
    isFinished,
    isFirst,
    isLast,
  } = useSlides(slides, { circular: false });

  const progressPercent = ((maxVisited + 1) / length) * 100;

  return (
    <SafeAreaProvider style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => router.replace(ROTAS.familia)}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Introdução - Pais e Filhos</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.introText}>
          Reproduza os sinais até se acostumar com eles
        </Text>

        <View style={styles.mediaArea}>
          <View style={styles.mediaBox}>
            {slideAtual?.videoId ? (
              slideAtual.videoId.includes("http") ? (
                <Video
                  key={`native-${slideAtual.videoId}`}
                  source={{ uri: slideAtual.videoId }}
                  style={styles.video}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  shouldPlay
                  isLooping
                />
              ) : (
                <View style={{ width: "100%", aspectRatio: 16 / 9 }}>
                  <YoutubePlayer
                    key={`yt-${slideAtual.videoId}`}
                    height={width * 0.6}
                    play={true}
                    videoId={slideAtual.videoId}
                  />
                </View>
              )
            ) : (
              <Text style={styles.mediaPlaceholder}>Carregando sinal...</Text>
            )}
          </View>

          <View style={styles.mediaControls}>
            <TouchableOpacity
              style={[styles.iconBtn, isFirst && { opacity: 0.3 }]}
              onPress={prev}
              disabled={isFirst}
            >
              <Ionicons name="chevron-back-circle" size={48} color={PURPLE} />
            </TouchableOpacity>

            <View style={styles.wordBox}>
              <Text style={styles.wordText}>{slideAtual?.label}</Text>
            </View>

            <TouchableOpacity
              style={[styles.iconBtn, isLast && { opacity: 0.3 }]}
              onPress={next}
              disabled={isLast}
            >
              <Ionicons
                name="chevron-forward-circle"
                size={48}
                color={PURPLE}
              />
            </TouchableOpacity>
          </View>
        </View>

        {isFinished ? (
          <Text style={styles.completedMessage}>
            ✨ Concluído! Você pode progredir para a próxima lição.
          </Text>
        ) : (
          <Text style={[styles.introText, { marginTop: 20, marginBottom: 0 }]}>
            Assista a todos os sinais para liberar a próxima lição.
          </Text>
        )}

        <View style={styles.progressContainer}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>Progresso da lição</Text>
            <Text style={styles.progressCount}>{`${maxVisited + 1} / ${length}`}</Text>
          </View>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.actionBtn, !isFinished && styles.disabledBtn]}
          onPress={() => router.replace(ROTAS.atividade1)}
          disabled={!isFinished}
        >
          <Text style={styles.actionText}>
            {isFinished ? "Continuar" : "Assista tudo para liberar"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const PURPLE = "#6A04D1";

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  header: {
    height: 70,
    backgroundColor: PURPLE,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  back: { position: "absolute", left: 12, zIndex: 10, padding: 8 },
  headerCenter: { flexDirection: "row", alignItems: "center" },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "bold", marginLeft: 10 },
  contentContainer: { paddingHorizontal: 18, paddingTop: 18, paddingBottom: 40 },
  introText: { textAlign: "center", marginBottom: 20, fontSize: 16, color: "#444" },
  mediaArea: { alignItems: "center" },
  mediaBox: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: PURPLE,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    elevation: 5,
  },
  mediaPlaceholder: { color: "#fff", fontSize: 14 },
  mediaControls: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: 20, paddingHorizontal: 10 },
  iconBtn: { padding: 5 },
  wordBox: {
    flex: 1,
    marginHorizontal: 15,
    height: 60,
    borderRadius: 12,
    backgroundColor: PURPLE,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  wordText: { color: "#fff", fontSize: 22, fontWeight: "800", textAlign: "center", textTransform: "uppercase" },
  actionBtn: { marginTop: 30, backgroundColor: PURPLE, paddingVertical: 15, borderRadius: 12, alignItems: "center", elevation: 5 },
  actionText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  video: { width: "100%", height: "100%" },
  progressContainer: { marginTop: 25, paddingHorizontal: 10 },
  progressTrack: { width: "100%", height: 10, borderRadius: 10, backgroundColor: "#E0E0E0", overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: PURPLE, borderRadius: 10 },
  completedMessage: { textAlign: "center", color: "#2E7D32", fontWeight: "700", fontSize: 15, marginTop: 15, backgroundColor: "#E8F5E9", padding: 10, borderRadius: 8, borderWidth: 1, borderColor: "#C8E6C9" },
  disabledBtn: { backgroundColor: "#BDBDBD", elevation: 0 },
  progressInfo: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  progressText: { color: "#666", fontSize: 14, fontWeight: "500" },
  progressCount: { color: PURPLE, fontWeight: "700" },
});