import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  BackHandler,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

const TEMPO_CAPA_MS = 1000;
const TEMPO_LIMITE_LGPD_MS = 5000;

type Etapa = "capa" | "lgpd";

export default function InicialScreen() {
  const router = useRouter();

  const [etapa, setEtapa] = useState<Etapa>("capa");
  const [concordou, setConcordou] = useState(false);

  const timerCapaRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timerAbortarRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerCapaRef.current = setTimeout(() => {
      setEtapa("lgpd");
    }, TEMPO_CAPA_MS);

    return () => {
      if (timerCapaRef.current) clearTimeout(timerCapaRef.current);
      if (timerAbortarRef.current) clearTimeout(timerAbortarRef.current);
    };
  }, []);

  useEffect(() => {
    if (etapa !== "lgpd" || concordou) return;

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
  }, [etapa, concordou]);

  const onConcordar = () => {
    setConcordou(true);

    if (timerAbortarRef.current) {
      clearTimeout(timerAbortarRef.current);
    }

    router.replace("/global/home");
  };

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

  return (
    <View style={styles.containerLgpd}>
      <Image
        source={require("../src/assets/images/inicial/LGPD.png")}
        style={styles.lgpdImage}
        resizeMode="contain"
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={onConcordar}
        activeOpacity={0.85}
      >
        <Text style={styles.botaoTexto}>Concordo com a política</Text>
      </TouchableOpacity>
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
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  lgpdImage: {
    width: "100%",
    height: "100%",
  },
  botao: {
    position: "absolute",
    bottom: 62,
    width: "78%",
    minHeight: 48,
    backgroundColor: "#000",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  botaoTexto: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "800",
    textAlign: "center",
  },
});