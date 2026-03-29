// app/footer/suporte.tsx
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../src/contexts/themeContext";
import { useSuporte } from "../../hooks/useSuporte";

export default function SuporteScreen() {
  const router = useRouter();
  const {
    email,
    darkMode,
    abrirWhatsApp,
    ligar,
    enviarEmail,
    perguntasVisiveis,
    mostrarMais,
    setMostrarMais,
    perguntaSelecionada,
    abrirPergunta,
    voltarFAQ,
    busca,
    setBusca,
  } = useSuporte();

  const { theme } = useTheme();

  const handleVoltar = () => {
    try {
      router.back();
    } catch {
      router.push("/footer/home");
    }
  };

  // 🔹 mapa de palavras-chave → telas
const palavrasPorRota = {
  "/footer/jogos": ["game", "games", "jogos"],
  "/footer/atividades": ["atividade", "atividades"],
  "/footer/perfil": ["perfil"],
  "/footer/suporte": ["suporte"],
  "/footer/dicionario": ["dicionario", "letra", "palavra", "abecedario"],
} as const;

type RotaValida = keyof typeof palavrasPorRota; // tipos literais das rotas

// 🔹 construindo mapa de palavras → rota
const rotas: Record<string, RotaValida> = {};
Object.entries(palavrasPorRota).forEach(([rota, palavras]) => {
  palavras.forEach((palavra) => {
    rotas[palavra.toLowerCase()] = rota as RotaValida; // ✅ garante que é literal
  });
});

// 🔹 função de navegação
const navegarPorBusca = () => {
  if (!busca) return;
  const termo = busca.toLowerCase();
  const rotaEncontrada = rotas[termo];
  if (rotaEncontrada) {
    router.push(rotaEncontrada); // ✅ TypeScript agora aceita
  } else {
    alert("Nenhuma tela encontrada para esta busca.");
  }
};
  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      {/* HEADER */}
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <TouchableOpacity onPress={handleVoltar}>
        </TouchableOpacity>

        <View style={{ width: 26 }} />
      </View>

      {/* BUSCA */}
      <View
        style={[
          styles.searchBox,
          {
            backgroundColor: theme.background,
            borderColor: theme.text,
            borderWidth: 1,
          },
        ]}
      >
        <Ionicons name="search" size={20} color="#8E8E8E" />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Ex: perfil, jogos, atividades, dicionário..."
          placeholderTextColor="#8E8E8E"
          value={busca}
          onChangeText={setBusca}
          onSubmitEditing={navegarPorBusca}
          returnKeyType="search"
        />
      </View>

      {/* CONTEÚDO */}
      {perguntaSelecionada ? (
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.primary }]}>
            {perguntaSelecionada.pergunta}
          </Text>
          <Text style={[styles.resposta, { color: theme.primary }]}>
            {perguntaSelecionada.resposta}
          </Text>
          <TouchableOpacity onPress={voltarFAQ}>
            <Text style={[styles.verMais, { color: theme.primary }]}>
              Voltar
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={[styles.subTitle, { color: theme.text }]}>
            Fale com um dos nossos analistas:
          </Text>

          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.contatoBtn, styles.linkBtn]}
              onPress={abrirWhatsApp}
            >
              <FontAwesome name="whatsapp" size={18} color="#FFF" />
              <Text style={[styles.contatoText, { color: "#FFF" }]}>
                (11) 11111-1111
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.contatoBtn, styles.linkBtn]}
              onPress={ligar}
            >
              <MaterialIcons name="phone" size={18} color="#FFF" />
              <Text style={[styles.contatoText, { color: "#FFF" }]}>
                (11) 11111-1111
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.contatoBtn, styles.linkBtn, styles.emailBtn]}
            onPress={enviarEmail}
          >
            <MaterialIcons name="email" size={18} color="#FFF" />
            <Text style={[styles.contatoText, { color: "#FFF" }]}>{email}</Text>
          </TouchableOpacity>

          <View style={[styles.card, { backgroundColor: theme.card }]}>
            <Text style={[styles.cardTitle, { color: theme.primary }]}>
              Perguntas frequentes
            </Text>

            {perguntasVisiveis.map((item, index) => (
              <View key={index}>
                <TouchableOpacity onPress={() => abrirPergunta(item)}>
                  <Text style={[styles.item, { color: theme.primary }]}>
                    {item.pergunta}
                  </Text>
                </TouchableOpacity>
                <View
                  style={[styles.divider, { backgroundColor: theme.primary }]}
                />
              </View>
            ))}

            {!mostrarMais && (
              <TouchableOpacity onPress={() => setMostrarMais(true)}>
                <Text style={[styles.verMais, { color: theme.primary }]}>
                  Ver mais...
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
}

/* ESTILOS */
const styles = StyleSheet.create({
  container: { flexGrow: 1 },
  header: {
    paddingTop: 45,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  searchBox: {
    margin: 20,
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
  },
  searchInput: { marginLeft: 10, flex: 1 },
  subTitle: { textAlign: "center", marginBottom: 15, fontWeight: "600" },
  row: { flexDirection: "row", justifyContent: "center", gap: 10, marginBottom: 10 },
  contatoBtn: { flexDirection: "row", alignItems: "center", padding: 10, borderRadius: 25, gap: 8 },
  contatoText: { fontSize: 13 },
  linkBtn: { backgroundColor: "#000", borderRadius: 50, paddingHorizontal: 15, paddingVertical: 8 },
  emailBtn: { alignSelf: "center", marginBottom: 20 },
  card: { borderRadius: 20, padding: 15, marginBottom: 15 },
  cardTitle: { textAlign: "center", marginBottom: 10, fontWeight: "bold" },
  item: { textAlign: "center", paddingVertical: 10 },
  resposta: { textAlign: "center", marginVertical: 15 },
  divider: { height: 1, marginHorizontal: 10 },
  verMais: { textAlign: "center", marginTop: 10, fontWeight: "bold" },
});