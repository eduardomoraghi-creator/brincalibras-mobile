// Aula2Screen.tsx

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
import { SafeAreaView } from "react-native-safe-area-context";
import useSlides from "@/hooks/useSlides";

const { width } = Dimensions.get("window");

const PURPLE = "#6A04D1";

export default function Aula2Screen() {
  const router = useRouter();

  const ROTAS = {
    familia: "/global/atividades/familia/familia" as const,
    atividade2: "/global/atividades/familia/atividade2" as const,
  };

  const slides = [
    { label: "Avô", videoId: "Les9uc10LdY" },
    { label: "Avó", videoId: "m0j6_6SG3F8" },
    { label: "Irmã", videoId: "2XK_ATK99Bg" },
    { label: "Irmão", videoId: "lAG2qvy04ok" },
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
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Aula 2 - Avôs e irmãos</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.introText}>
          Reproduza os sinais até se acostumar com eles
        </Text>

        {/* VÍDEO */}
        <View style={styles.mediaBox}>
          {slideAtual?.videoId ? (
            slideAtual.videoId.includes("http") ? (
              <Video
                source={{ uri: slideAtual.videoId }}
                style={styles.video}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                shouldPlay
                isLooping
              />
            ) : (
              <YoutubePlayer
                height={width * 0.6}
                play
                videoId={slideAtual.videoId}
              />
            )
          ) : (
            <Text style={styles.placeholder}>Carregando...</Text>
          )}
        </View>

        {/* CONTROLES */}
        <View style={styles.controls}>
          <TouchableOpacity
            onPress={prev}
            disabled={isFirst}
            style={[styles.navBtn, isFirst && styles.disabledNav]}
          >
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>

          <View style={styles.wordBox}>
            <Text style={styles.wordText}>{slideAtual?.label}</Text>
          </View>

          <TouchableOpacity
            onPress={next}
            disabled={isLast}
            style={[styles.navBtn, isLast && styles.disabledNav]}
          >
            <Ionicons name="chevron-forward" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* PROGRESSO */}
        <View style={styles.progressContainer}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>Progresso</Text>
            <Text style={styles.progressCount}>
              {maxVisited + 1}/{length}
            </Text>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[styles.progressFill, { width: `${progressPercent}%` }]}
            />
          </View>
        </View>

        {/* BOTÃO */}
        <TouchableOpacity
          style={[styles.actionBtn, !isFinished && styles.disabledBtn]}
          disabled={!isFinished}
          onPress={() => router.replace(ROTAS.atividade2)}
        >
          <Text style={styles.actionText}>
            {isFinished ? "Continuar" : "Assista tudo para liberar"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8F9FA" },

  header: {
    height: 70,
    backgroundColor: PURPLE,
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  introText: {
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
    fontSize: 16,
  },

  mediaBox: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: PURPLE,
    overflow: "hidden",
    backgroundColor: "#000",
  },

  video: {
    width: "100%",
    height: "100%",
  },

  placeholder: {
    color: "#fff",
    textAlign: "center",
  },

  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },

  navBtn: {
    backgroundColor: PURPLE,
    padding: 12,
    borderRadius: 50,
  },

  disabledNav: {
    opacity: 0.3,
  },

  wordBox: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: PURPLE,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },

  wordText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  progressContainer: {
    marginTop: 25,
  },

  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  progressText: {
    color: "#666",
  },

  progressCount: {
    color: PURPLE,
    fontWeight: "700",
  },

  progressTrack: {
    height: 10,
    borderRadius: 10,
    backgroundColor: "#E0E0E0",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: PURPLE,
  },

  actionBtn: {
    marginTop: 30,
    backgroundColor: PURPLE,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  disabledBtn: {
    backgroundColor: "#CCC",
  },

  actionText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});