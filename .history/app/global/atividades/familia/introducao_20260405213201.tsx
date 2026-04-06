import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import YoutubePlayer from "react-native-youtube-iframe";
import { Video, ResizeMode } from "expo-av";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useSlides from "@/hooks/useSlides";

const { width } = Dimensions.get("window");

const COLORS = {
  primary: "#6A04D1",
  primaryLight: "#F4ECFF",
  background: "#F7F8FC",
  white: "#FFFFFF",
  text: "#1F2430",
  textMuted: "#667085",
  border: "#E6E8F0",
  success: "#2E7D32",
  successBg: "#E8F5E9",
  successBorder: "#C8E6C9",
  disabled: "#BDBDBD",
  mediaBg: "#000000",
};

export default function IntroducaoScreen() {
  const router = useRouter();

  const ROTAS = {
    familia: "/global/atividades/familia/familia" as const,
    atividade1: "/global/atividades/familia/atividade1" as const,
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
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => router.replace(ROTAS.familia)}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="arrow-back" size={22} color={COLORS.white} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Introdução - Pais e Filhos</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <MaterialIcons name="play-circle-filled" size={24} color={COLORS.primary} />
          </View>
          <Text style={styles.introText}>
            Reproduza os sinais até se acostumar com eles.
          </Text>
        </View>

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
                <View style={styles.youtubeWrap}>
                  <YoutubePlayer
                    key={`yt-${slideAtual.videoId}`}
                    height={width * 0.58}
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
              style={[styles.iconBtn, isFirst && styles.iconBtnDisabled]}
              onPress={prev}
              disabled={isFirst}
              activeOpacity={0.8}
            >
              <Ionicons
                name="chevron-back-circle"
                size={50}
                color={COLORS.primary}
              />
            </TouchableOpacity>

            <View style={styles.wordBox}>
              <Text style={styles.wordLabel}>Sinal atual</Text>
              <Text style={styles.wordText}>{slideAtual?.label}</Text>
            </View>

            <TouchableOpacity
              style={[styles.iconBtn, isLast && styles.iconBtnDisabled]}
              onPress={next}
              disabled={isLast}
              activeOpacity={0.8}
            >
              <Ionicons
                name="chevron-forward-circle"
                size={50}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {isFinished ? (
          <Text style={styles.completedMessage}>
            ✨ Concluído! Você pode progredir para a próxima lição.
          </Text>
        ) : (
          <Text style={styles.helperText}>
            Assista a todos os sinais para liberar a próxima lição.
          </Text>
        )}

        <View style={styles.progressCard}>
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
          activeOpacity={0.9}
        >
          <Text style={styles.actionText}>
            {isFinished ? "Continuar" : "Assista tudo para liberar"}
          </Text>
          <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    minHeight: 72,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  back: {
    position: "absolute",
    left: 14,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  headerCenter: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 40,
  },

  headerTitle: {
    color: COLORS.white,
    fontSize: 19,
    fontWeight: "800",
    textAlign: "center",
  },

  contentContainer: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 40,
  },

  heroCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  heroIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  introText: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 22,
    fontWeight: "600",
  },

  mediaArea: {
    alignItems: "center",
  },

  mediaBox: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.mediaBg,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    elevation: 4,
  },

  youtubeWrap: {
    width: "100%",
    aspectRatio: 16 / 9,
  },

  mediaPlaceholder: {
    color: COLORS.white,
    fontSize: 14,
  },

  mediaControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 18,
  },

  iconBtn: {
    padding: 4,
  },

  iconBtnDisabled: {
    opacity: 0.35,
  },

  wordBox: {
    flex: 1,
    marginHorizontal: 12,
    minHeight: 72,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  wordLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  wordText: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
    textTransform: "uppercase",
  },

  helperText: {
    textAlign: "center",
    marginTop: 18,
    fontSize: 14,
    color: COLORS.textMuted,
    lineHeight: 20,
  },

  progressCard: {
    marginTop: 20,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  progressText: {
    color: COLORS.textMuted,
    fontSize: 14,
    fontWeight: "600",
  },

  progressCount: {
    color: COLORS.primary,
    fontWeight: "800",
    fontSize: 14,
  },

  progressTrack: {
    width: "100%",
    height: 10,
    borderRadius: 999,
    backgroundColor: "#E9D8FD",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 999,
  },

  completedMessage: {
    textAlign: "center",
    color: COLORS.success,
    fontWeight: "700",
    fontSize: 15,
    marginTop: 18,
    backgroundColor: COLORS.successBg,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.successBorder,
  },

  actionBtn: {
    marginTop: 22,
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    elevation: 4,
  },

  disabledBtn: {
    backgroundColor: COLORS.disabled,
    elevation: 0,
  },

  actionText: {
    color: COLORS.white,
    fontWeight: "800",
    fontSize: 16,
  },

  video: {
    width: "100%",
    height: "100%",
  },
});