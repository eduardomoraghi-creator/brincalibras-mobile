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
import { useTheme } from "../../src/contexts/themeContext";
import { useSuporte } from "../../hooks/useSuporte";

export default function SuporteScreen() {
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

  const { theme, darkMode } = useTheme();

  const pageBackground = darkMode ? "#3A3A3A" : theme.background;

  const searchBackground = darkMode ? "#F2F2F2" : "#FFFFFF";
  const searchTextColor = darkMode ? "#2D9CDB" : theme.text;
  const searchPlaceholderColor = "#8E8E8E";

  const supportTextColor = darkMode ? "#FFFFFF" : theme.text;

  const contactBackground = darkMode ? "#F2F2F2" : "#000000";
  const contactTextColor = darkMode ? "#2D9CDB" : "#FFFFFF";
  const contactIconColor = darkMode ? "#2D9CDB" : "#FFFFFF";

  const faqBackground = darkMode ? "#EAEAEA" : "#595959";
  const faqTitleColor = darkMode ? "#2D9CDB" : "#FFFFFF";
  const faqItemColor = darkMode ? "#2D9CDB" : "#FFFFFF";
  const faqDividerColor = darkMode ? "#2D9CDB" : "#CCCCCC";

  const suggestionBackground = darkMode ? "#EAEAEA" : theme.card;
  const suggestionTextColor = darkMode ? "#2D9CDB" : theme.text;
  const suggestionBorderColor = darkMode ? "#D0D0D0" : "#E0E0E0";

  return (
    <View style={[styles.screen, { backgroundColor: pageBackground }]}>
      {/* HEADER COMPLEMENTAR */}
      <View style={styles.headerComplemento}>
        <View style={styles.searchWrapper}>
          <View
            style={[styles.searchBox, { backgroundColor: searchBackground }]}
          >
            <Ionicons name="search" size={20} color="#8E8E8E" />

            <TextInput
              style={[
                styles.searchInput,
                {
                  color: searchTextColor,
                  borderWidth: 0, // ✅ remove qualquer borda
                },
              ]}
              placeholder="Ex: conta, login, atividades..."
              placeholderTextColor={searchPlaceholderColor}
              value={busca}
              onChangeText={setBusca}
              onSubmitEditing={navegarPorBusca}
              underlineColorAndroid="transparent" 
            />
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* SUGESTÕES */}
        {busca.length > 0 && (
          <View
            style={[
              styles.sugestoesBox,
              { backgroundColor: suggestionBackground },
            ]}
          >
            {sugestoes.length > 0 ? (
              sugestoes.slice(0, 5).map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.sugestaoCard,
                    { borderColor: suggestionBorderColor },
                  ]}
                  activeOpacity={0.7}
                  onPress={() => navegarPara(item.rota)}
                >
                  <Ionicons name="search-outline" size={18} color="#2D9CDB" />

                  <Text
                    style={[
                      styles.sugestaoTexto,
                      { color: suggestionTextColor },
                    ]}
                  >
                    {item.palavra}
                  </Text>

                  <Ionicons name="chevron-forward" size={18} color="#999999" />
                </TouchableOpacity>
              ))
            ) : (
              <Text
                style={[styles.sugestaoVazia, { color: suggestionTextColor }]}
              >
                Nenhuma sugestão encontrada
              </Text>
            )}
          </View>
        )}

        {/* CONTEÚDO */}
        {perguntaSelecionada ? (
          <View style={[styles.card, { backgroundColor: faqBackground }]}>
            <Text style={[styles.cardTitle, { color: faqTitleColor }]}>
              {perguntaSelecionada.pergunta}
            </Text>

            <Text style={[styles.resposta, { color: faqItemColor }]}>
              {perguntaSelecionada.resposta}
            </Text>

            <TouchableOpacity onPress={voltarFAQ}>
              <Text style={[styles.verMais, { color: faqTitleColor }]}>
                Voltar
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={[styles.subTitle, { color: supportTextColor }]}>
              Fale com um dos nossos analistas:
            </Text>

            {/* WHATS + TELEFONE */}
            <View style={styles.row}>
              <TouchableOpacity
                style={[
                  styles.contatoBtn,
                  { backgroundColor: contactBackground },
                ]}
                onPress={abrirWhatsApp}
              >
                <FontAwesome
                  name="whatsapp"
                  size={20}
                  color={contactIconColor}
                />
                <Text style={[styles.contatoText, { color: contactTextColor }]}>
                  (11) 11111-1111
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.contatoBtn,
                  { backgroundColor: contactBackground },
                ]}
                onPress={ligar}
              >
                <MaterialIcons
                  name="local-phone"
                  size={20}
                  color={contactIconColor}
                />
                <Text style={[styles.contatoText, { color: contactTextColor }]}>
                  (11) 11111-1111
                </Text>
              </TouchableOpacity>
            </View>

            {/* EMAIL */}
            <TouchableOpacity
              style={[
                styles.contatoBtnEmail,
                { backgroundColor: contactBackground },
              ]}
              onPress={enviarEmail}
            >
              <MaterialIcons
                name="mail-outline"
                size={22}
                color={contactIconColor}
              />
              <Text style={[styles.contatoText, { color: contactTextColor }]}>
                {email}
              </Text>
            </TouchableOpacity>

            {/* FAQ */}
            <View
              style={[
                styles.card,
                styles.cardFAQ,
                { backgroundColor: faqBackground },
              ]}
            >
              <Text style={[styles.cardTitle, { color: faqTitleColor }]}>
                Perguntas frequentes
              </Text>

              {perguntasVisiveis.map((item, index) => (
                <View key={index}>
                  <TouchableOpacity onPress={() => abrirPergunta(item)}>
                    <Text style={[styles.item, { color: faqItemColor }]}>
                      {item.pergunta}
                    </Text>
                  </TouchableOpacity>

                  <View
                    style={[
                      styles.divider,
                      { backgroundColor: faqDividerColor },
                    ]}
                  />
                </View>
              ))}

              {!mostrarMais && (
                <TouchableOpacity onPress={() => setMostrarMais(true)}>
                  <Text style={[styles.verMais, { color: faqTitleColor }]}>
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
  screen: { flex: 1 },

  headerComplemento: {
    backgroundColor: "#2D9CDB",
    paddingTop: 10,
    paddingBottom: 20,
  },

  searchWrapper: {
    paddingHorizontal: 20,
  },

  searchBox: {
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
  },

  searchInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 14,
  },

  container: {
    paddingTop: 16,
    paddingBottom: 24,
  },

  sugestoesBox: {
    marginHorizontal: 20,
    borderRadius: 16,
    marginTop: -4,
    marginBottom: 12,
    paddingVertical: 4,
    elevation: 3,
  },

  sugestaoCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderBottomWidth: 0.5,
  },

  sugestaoTexto: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 10,
  },

  sugestaoVazia: {
    padding: 12,
    fontSize: 14,
  },

  subTitle: {
    textAlign: "center",
    marginBottom: 16,
    marginTop: 2,
    fontSize: 15,
    fontWeight: "700",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 12,
  },

  contatoBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 15,
    gap: 8,
  },

  contatoBtnEmail: {
    alignSelf: "center",
    width: "88%",
    paddingVertical: 14,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 18,
  },

  contatoText: {
    fontSize: 14,
    fontWeight: "600",
  },

  card: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 15,
    marginHorizontal: 20,
    elevation: 4,
  },

  cardFAQ: {
    paddingTop: 14,
  },

  cardTitle: {
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 16,
  },

  item: {
    textAlign: "center",
    paddingVertical: 14,
    fontSize: 15,
  },

  resposta: {
    textAlign: "center",
    marginVertical: 15,
    fontSize: 15,
  },

  divider: {
    height: 1,
    marginHorizontal: 8,
  },

  verMais: {
    textAlign: "center",
    marginTop: 14,
    fontWeight: "bold",
    fontSize: 15,
  },
});
