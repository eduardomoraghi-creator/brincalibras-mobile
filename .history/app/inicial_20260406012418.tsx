import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

const TEMPO_LIMITE_LGPD_MS = 10000;
const TEMPO_CAPA_FINAL_MS = 2000;

type Etapa = "lgpd" | "capaFinal";

export default function InicialScreen() {
  const router = useRouter();

  const [etapa, setEtapa] = useState<Etapa>("lgpd");

  const timerAbortarRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timerFinalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ⛔ aborta se não concordar
  useEffect(() => {
    if (etapa !== "lgpd") return;

    timerAbortarRef.current = setTimeout(() => {
      if (Platform.OS === "android") {
        BackHandler.exitApp();
      } else {
        Alert.alert(
          "Aplicativo encerrado",
          "É necessário concordar com a política para continuar."
        );
      }
    }, TEMPO_LIMITE_LGPD_MS);

    return () => {
      if (timerAbortarRef.current) clearTimeout(timerAbortarRef.current);
    };
  }, [etapa]);

  // ⏳ capa final → home
  useEffect(() => {
    if (etapa !== "capaFinal") return;

    timerFinalRef.current = setTimeout(() => {
      router.replace("/global/home");
    }, TEMPO_CAPA_FINAL_MS);

    return () => {
      if (timerFinalRef.current) clearTimeout(timerFinalRef.current);
    };
  }, [etapa]);

  const onConcordar = () => {
    if (timerAbortarRef.current) {
      clearTimeout(timerAbortarRef.current);
    }

    setEtapa("capaFinal");
  };

  // 🔴 LGPD (clicável inteiro)
  if (etapa === "lgpd") {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={onConcordar}
        activeOpacity={1}
      >
        <Image
          source={require("../src/assets/images/inicial/LGPD.png")}
          style={styles.background}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  }

  // 🟢 CAPA FINAL (EXATAMENTE COMO ERA ANTES)
  return (
    <View style={styles.container}>
      <Image
        source={require("../src/assets/images/inicial/capa.png")}
        style={styles.background}
        blurRadius={15}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  // 🔥 ESSE É O PADRÃO ORIGINAL QUE FUNCIONAVA
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});