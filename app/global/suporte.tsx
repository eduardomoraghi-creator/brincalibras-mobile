// app/global/suporte.tsx
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../src/contexts/themeContext";
import { useSuporte } from "../../hooks/useSuporte";

export default function SuporteScreen() {
  const router = useRouter();

  const {
    email,
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
    sugestoes,
    navegarPara,
    navegarPorBusca,
  } = useSuporte();

  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      
      {/* 🔵 FUNDO AZUL CONTÍNUO DO HEADER */}
      <View style={styles.headerComplemento}>
        <View style={styles.searchWrapper}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color="#8E8E8E" />
            <TextInput
              style={styles.searchInput}
              placeholder="Ex: perfil, jogos, atividades, dicionário..."
              placeholderTextColor="#8E8E8E"
              value={busca}
              onChangeText={setBusca}
              onSubmitEditing={navegarPorBusca}
            />
          </View>
        </View>
      </View>

      {/* 🔽 CONTEÚDO */}
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* 🔥 SUGESTÕES */}
        {busca.length > 0 && (
          <View style={[styles.sugestoesBox, { backgroundColor: theme.card }]}>
            {sugestoes.length > 0 ? (
              sugestoes.slice(0, 5).map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => navegarPara(item.rota)}
                >
                  <Text style={[styles.sugestaoItem, { color: theme.text }]}>
                    {item.palavra}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={{ padding: 10, color: theme.text }}>
                Nenhuma sugestão encontrada
              </Text>
            )}
          </View>
        )}

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
                <Text style={styles.contatoText}>(11) 11111-1111</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.contatoBtn, styles.linkBtn]}
                onPress={ligar}
              >
                <MaterialIcons name="phone" size={18} color="#FFF" />
                <Text style={styles.contatoText}>(11) 11111-1111</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.contatoBtn, styles.linkBtn, styles.emailBtn]}
              onPress={enviarEmail}
            >
              <MaterialIcons name="email" size={18} color="#FFF" />
              <Text style={styles.contatoText}>{email}</Text>
            </TouchableOpacity>

<View style={[styles.card, styles.cardFAQ]}>
                <Text style={[styles.cardTitle, { color: theme.primary }]}>
                Perguntas frequentes
              </Text>

              {perguntasVisiveis.map((item, index) => (
                <View key={index}>
                  <TouchableOpacity onPress={() => abrirPergunta(item)}>
                    <Text style={[styles.item, { color: "#FFFFFF" }]}>
                      {item.pergunta}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.divider} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  
cardFAQ: {
  backgroundColor: "#595959", 
},

  headerComplemento: {
    backgroundColor: "#2D9CDB",
    paddingBottom: 25,
  },

  searchWrapper: {
    paddingHorizontal: 20,
    marginTop: -15,
  },

  searchBox: {
    backgroundColor: "#FFF",
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
  },

  searchInput: {
    marginLeft: 10,
    flex: 1,
  },

  sugestoesBox: {
    marginHorizontal: 20,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 10,
  },

  sugestaoItem: {
    padding: 12,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },

  subTitle: {
    textAlign: "center",
    marginBottom: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },

  contatoBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 25,
    gap: 8,
    marginHorizontal: 25,
    marginVertical: 10,
  },

  contatoText: {
    color: "#FFFFFF",
    fontSize: 13,
  },

  linkBtn: {
    backgroundColor: "#000",
  },

  emailBtn: {
    alignSelf: "center",
    marginBottom: 20,
  },

  card: {
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    marginHorizontal: 20,
  },

  cardTitle: {
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },

  item: {
    textAlign: "center",
    paddingVertical: 10,
  },

  resposta: {
    textAlign: "center",
    marginVertical: 15,
  },

  divider: {
    height: 1,
    backgroundColor: "#ccc",
  },

  verMais: {
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
});