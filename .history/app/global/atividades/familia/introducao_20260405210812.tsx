import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import YoutubePlayer from "react-native-youtube-iframe";
import { Video, ResizeMode } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";
import useSlides from "@/hooks/useSlides";

const { width } = Dimensions.get("window");

const COLORS = {
  primary: "#6A04D1",
  primaryDark: "#4C02A8",
  background: "#F8F7FC",
  white: "#FFFFFF",
  text: "#1F172A",
  textMuted: "#6B7280",
  border: "#E9D5FF",
  successBg: "#E8F5E9",
  successBorder: "#C8E6C9",
  successText: "#2E7D32",
  progressBg: "#E5E7EB",
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
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.replace(ROTAS.familia)}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Introdução - Pais e Filhos</Text>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <MaterialIcons name="play-circle-filled" size={28} color="#fff" />
          </View>
          <Text style={styles.heroTitle}>Observe e repita</Text>
          <Text style={styles.heroSubtitle}>
            Reproduza os sinais até se acostumar com eles.
          </Text>
        </View>

        <View style={styles.mediaCard}>
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
            >
              <Ionicons
                name="chevron-back-circle"
                size={48}
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
            >
              <Ionicons
                name="chevron-forward-circle"
                size={48}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {isFinished ? (
          <View style={styles.completedMessage}>
            <Text style={styles.completedTitle}>✨ Concluído!</Text>
            <Text style={styles.completedText}>
              Você pode progredir para a próxima atividade.
            </Text>
          </View>
        ) : (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              Assista a todos os sinais para liberar a próxima lição.
            </Text>
          </View>
        )}

        <View style={styles.progressCard}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>Progresso da lição</Text>
            <Text style={styles.progressCount}>{`${maxVisited + 1} / ${length}`}</Text>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[styles.progressFill, { width: `${progressPercent}%` }]}
            />
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
          {isFinished && (
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    minHeight: 68,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
  },
  contentContainer: {
    padding: 18,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
  },
  heroIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.14)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  heroTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 6,
  },
  heroSubtitle: {
    color: "#F3E8FF",
    fontSize: 14,
    lineHeight: 20,
  },
  mediaCard: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 14,
    borderWidth: 1,
    borderColor: "#EFE7FF",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  mediaBox: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  youtubeWrap: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  mediaPlaceholder: {
    color: "#fff",
    fontSize: 14,
  },
  mediaControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
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
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  wordLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 4,
  },
  wordText: {
    color: COLORS.primaryDark,
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
    textTransform: "uppercase",
  },
  completedMessage: {
    marginTop: 18,
    backgroundColor: COLORS.successBg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.successBorder,
    padding: 14,
  },
  completedTitle: {
    color: COLORS.successText,
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
  },
  completedText: {
    color: COLORS.successText,
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
  },
  infoBox: {
    marginTop: 18,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#EEEAF7",
  },
  infoText: {
    textAlign: "center",
    fontSize: 14,
    color: COLORS.textMuted,
    lineHeight: 20,
  },
  progressCard: {
    marginTop: 18,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EEEAF7",
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
    backgroundColor: COLORS.progressBg,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 999,
  },
  actionBtn: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    minHeight: 54,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  disabledBtn: {
    backgroundColor: "#BDBDBD",
  },
  actionText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },
});