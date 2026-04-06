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

const TEMPO_CAPA_MS = 1000;
const TEMPO_LIMITE_LGPD_MS = 10000;
const TEMPO_CAPA_FINAL_MS = 2000;

type Etapa = "capa" | "lgpd" | "final";

export default function InicialScreen() {
  const router = useRouter();

  const [etapa, setEtapa] = useState<Etapa>("capa");

  const timerCapaRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timerAbortarRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timerFinalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // CAPA INICIAL → LGPD
  useEffect(() => {
    timerCapaRef.current = setTimeout(() => {
      setEtapa("lgpd");
    }, TEMPO_CAPA_MS);

    return () => {
      if (timerCapaRef.current) clearTimeout(timerCapaRef.current);
    };
  }, []);

  // TIMER PARA ABORTAR SE NÃO CONCORDAR
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

  // CAPA FINAL → HOME
  useEffect(() => {
    if (etapa !== "final") return;

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

    setEtapa("final");
  };

  // CAPA INICIAL
  if (etapa === "capa") {
    return (
      <View style={styles.container}>
        <Image
          source={require("../src/assets/images/inicial/capa.png")}
          style={styles.background}
          resizeMode="cover"
          blurRadius={15}
        />
      </View>
    );
  }

  // LGPD (clicável inteiro)
  if (etapa === "lgpd") {
    return (
      <TouchableOpacity
        style={styles.containerLgpd}
        onPress={onConcordar}
        activeOpacity={1}
      >
        <Image
          source={require("../src/assets/images/inicial/LGPD.png")}
          style={styles.lgpdImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  }

  // CAPA FINAL (2s)
  return (
    <View style={styles.container}>
      <Image
        source={require("../src/assets/images/inicial/capa.png")}
        style={styles.background}
        resizeMode="cover"
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

  background: {
    width: "100%",
    height: "100%",
  },

  containerLgpd: {
    flex: 1,
    backgroundColor: "#EDEDED",
  },

  lgpdImage: {
    width: "100%",
    height: "100%",
  },
});