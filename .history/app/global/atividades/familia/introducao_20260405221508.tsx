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

const PURPLE = "#6A04D1";
const PURPLE_DARK = "#4E02A0";
const PURPLE_LIGHT = "#F4ECFF";
const GREEN = "#1F9D55";
const GREEN_BG = "#E9F9F0";
const TEXT_DARK = "#1F1F28";
const TEXT_MEDIUM = "#616173";
const BORDER = "#E8DEF8";
const BACKGROUND = "#F7F7FB";
const WHITE = "#FFFFFF";

export default function IntroducaoScreen() {
  const router = useRouter();

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
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace(ROTAS.familia)}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="arrow-back" size={22} color={WHITE} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <View style={styles.headerIconWrap}>
            <MaterialIcons name="play-circle-outline" size={20} color={WHITE} />
          </View>
          <Text style={styles.headerTitle}>Introdução</Text>
        </View>

        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Lição inicial</Text>
            </View>

            <View style={styles.counterBadge}>
              <Text style={styles.counterBadgeText}>
                {maxVisited + 1}/{length}
              </Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>Pais e Filhos</Text>
          <Text style={styles.heroSubtitle}>
            Assista aos sinais, navegue entre eles e complete a lição para
            liberar a próxima atividade.
          </Text>
        </View>

        <View style={styles.videoCard}>
          <View style={styles.videoHeader}>
            <View style={styles.videoHeaderLeft}>
              <MaterialIcons name="sign-language" size={20} color={PURPLE} />
              <Text style={styles.videoHeaderTitle}>Sinal atual</Text>
            </View>

            <View style={styles.wordPill}>
              <Text style={styles.wordPillText}>{slideAtual?.label}</Text>
            </View>
          </View>

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
                    height={width * 0.56}
                    play={true}
                    videoId={slideAtual.videoId}
                  />
                </View>
              )
            ) : (
              <View style={styles.placeholderBox}>
                <MaterialIcons name="hourglass-empty" size={28} color="#999" />
                <Text style={styles.mediaPlaceholder}>Carregando sinal...</Text>
              </View>
            )}
          </View>

          <View style={styles.navigationArea}>
            <TouchableOpacity
              style={[
                styles.navButton,
                styles.navButtonLeft,
                isFirst && styles.navButtonDisabled,
              ]}
              onPress={prev}
              disabled={isFirst}
            >
              <Ionicons name="chevron-back" size={22} color={WHITE} />
              <Text style={styles.navButtonText}>Anterior</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.navButton,
                styles.navButtonRight,
                isLast && styles.navButtonDisabled,
              ]}
              onPress={next}
              disabled={isLast}
            >
              <Text style={styles.navButtonText}>Próximo</Text>
              <Ionicons name="chevron-forward" size={22} color={WHITE} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View>
              <Text style={styles.progressTitle}>Progresso da lição</Text>
              <Text style={styles.progressSubtitle}>
                Avance por todos os sinais para liberar a próxima etapa.
              </Text>
            </View>

            <Text style={styles.progressPercent}>{Math.round(progressPercent)}%</Text>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[styles.progressFill, { width: `${progressPercent}%` }]}
            />
          </View>
        </View>

        {isFinished ? (
          <View style={styles.successBox}>
            <View style={styles.successIconWrap}>
              <Ionicons name="checkmark-circle" size={22} color={GREEN} />
            </View>
            <View style={styles.successTextWrap}>
              <Text style={styles.successTitle}>Lição concluída</Text>
              <Text style={styles.successText}>
                Muito bem! Agora você já pode seguir para a próxima atividade.
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.infoBox}>
            <Ionicons name="information-circle-outline" size={20} color={PURPLE} />
            <Text style={styles.infoText}>
              Continue assistindo até o último sinal para desbloquear a próxima
              tela.
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.actionBtn, !isFinished && styles.disabledBtn]}
          onPress={() => router.replace(ROTAS.atividade1)}
          disabled={!isFinished}
          activeOpacity={0.85}
        >
          <View style={styles.actionBtnContent}>
            <MaterialIcons
              name={isFinished ? "arrow-forward" : "lock-outline"}
              size={20}
              color={WHITE}
            />
            <Text style={styles.actionText}>
              {isFinished ? "Continuar para a atividade" : "Assista tudo para liberar"}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },

  header: {
    height: 74,
    backgroundColor: PURPLE,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.16)",
    alignItems: "center",
    justifyContent: "center",
  },

  headerCenter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  headerIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.16)",
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    color: WHITE,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.2,
  },

  headerPlaceholder: {
    width: 42,
  },

  contentContainer: {
    padding: 18,
    paddingBottom: 40,
  },

  heroCard: {
    backgroundColor: WHITE,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: BORDER,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  badge: {
    backgroundColor: PURPLE_LIGHT,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },

  badgeText: {
    color: PURPLE_DARK,
    fontWeight: "700",
    fontSize: 12,
  },

  counterBadge: {
    backgroundColor: "#F2F3F8",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },

  counterBadgeText: {
    color: TEXT_DARK,
    fontWeight: "700",
    fontSize: 12,
  },

  heroTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: TEXT_DARK,
    marginBottom: 8,
  },

  heroSubtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: TEXT_MEDIUM,
  },

  videoCard: {
    backgroundColor: WHITE,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: BORDER,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  videoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    gap: 10,
  },

  videoHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  videoHeaderTitle: {
    color: TEXT_DARK,
    fontWeight: "700",
    fontSize: 15,
  },

  wordPill: {
    backgroundColor: PURPLE,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },

  wordPillText: {
    color: WHITE,
    fontWeight: "800",
    fontSize: 13,
    textTransform: "uppercase",
  },

  mediaBox: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: PURPLE,
    backgroundColor: "#111",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },

  youtubeWrap: {
    width: "100%",
    aspectRatio: 16 / 9,
  },

  placeholderBox: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  mediaPlaceholder: {
    color: "#DDD",
    fontSize: 14,
    fontWeight: "500",
  },

  video: {
    width: "100%",
    height: "100%",
  },

  navigationArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 16,
  },

  navButton: {
    flex: 1,
    height: 50,
    borderRadius: 16,
    backgroundColor: PURPLE,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  navButtonLeft: {},

  navButtonRight: {},

  navButtonDisabled: {
    backgroundColor: "#C8C8D3",
  },

  navButtonText: {
    color: WHITE,
    fontSize: 15,
    fontWeight: "700",
  },

  progressCard: {
    backgroundColor: WHITE,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: BORDER,
    marginBottom: 16,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 12,
  },

  progressTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: TEXT_DARK,
    marginBottom: 4,
  },

  progressSubtitle: {
    color: TEXT_MEDIUM,
    fontSize: 13,
    lineHeight: 18,
    maxWidth: 240,
  },

  progressPercent: {
    color: PURPLE,
    fontWeight: "800",
    fontSize: 18,
  },

  progressTrack: {
    width: "100%",
    height: 12,
    borderRadius: 999,
    backgroundColor: "#ECECF4",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: PURPLE,
    borderRadius: 999,
  },

  successBox: {
    backgroundColor: GREEN_BG,
    borderWidth: 1,
    borderColor: "#C8EFD8",
    borderRadius: 20,
    padding: 14,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 18,
  },

  successIconWrap: {
    marginTop: 1,
  },

  successTextWrap: {
    flex: 1,
  },

  successTitle: {
    color: GREEN,
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 4,
  },

  successText: {
    color: "#2D6A4F",
    fontSize: 13,
    lineHeight: 19,
  },

  infoBox: {
    backgroundColor: "#F5F1FF",
    borderWidth: 1,
    borderColor: "#E2D4FF",
    borderRadius: 20,
    padding: 14,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 18,
  },

  infoText: {
    flex: 1,
    color: PURPLE_DARK,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "500",
  },

  actionBtn: {
    height: 56,
    borderRadius: 18,
    backgroundColor: PURPLE,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: PURPLE,
    shadowOpacity: 0.22,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },

  disabledBtn: {
    backgroundColor: "#BDBDCA",
    shadowOpacity: 0,
    elevation: 0,
  },

  actionBtnContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  actionText: {
    color: WHITE,
    fontWeight: "800",
    fontSize: 15,
    letterSpacing: 0.2,
  },
});