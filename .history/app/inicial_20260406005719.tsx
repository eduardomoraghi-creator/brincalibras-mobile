// app/inicial.tsx
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
import { useLocalSearchParams, useRouter, Href } from "expo-router";

const TEMPO_CAPA_MS = 1000;
const TEMPO_LIMITE_CONCORDANCIA_MS = 5000;
const LOGIN_ROUTE = "/login" as Href;

export default function InicialScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const destino = ((params.destino as Href) || LOGIN_ROUTE) as Href;

  const [mostrarLgpd, setMostrarLgpd] = useState(false);
  const [concordou, setConcordou] = useState(false);

  const timerCapaRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timerFecharRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerCapaRef.current = setTimeout(() => {
      setMostrarLgpd(true);
    }, TEMPO_CAPA_MS);

    return () => {
      if (timerCapaRef.current) clearTimeout(timerCapaRef.current);
      if (timerFecharRef.current) clearTimeout(timerFecharRef.current);
    };
  }, []);

  useEffect(() => {
    if (!mostrarLgpd || concordou) return;

    timerFecharRef.current = setTimeout(() => {
      if (Platform.OS === "android") {
        BackHandler.exitApp();
      } else {
        Alert.alert(
          "Encerramento",
          "O app será encerrado por falta de concordância com a política."
        );
      }
    }, TEMPO_LIMITE_CONCORDANCIA_MS);

    return () => {
      if (timerFecharRef.current) clearTimeout(timerFecharRef.current);
    };
  }, [mostrarLgpd, concordou]);

  const onConcordar = () => {
    setConcordou(true);

    if (timerFecharRef.current) {
      clearTimeout(timerFecharRef.current);
    }

    router.replace(destino);
  };

  if (!mostrarLgpd) {
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
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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