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

  const { theme } = useTheme();

  const colors = {
    pageBackground: theme.background || "#FFFFFF",
    headerBackground: theme.footer || "#2D9CDB",

    inputBackground: theme.card || "#FFFFFF",
    inputText: theme.text || "#111111",
    inputPlaceholder: theme.textSecondary || "#8E8E8E",
    inputIcon: theme.icon || "#8E8E8E",

    sectionText: theme.text || "#111111",

    contactBackground: theme.footer || "#2D9CDB",
    contactText: "#FFFFFF",
    contactIcon: "#FFFFFF",

    faqBackground: theme.card || "#FFFFFF",
    faqTitle: theme.text || "#111111",
    faqItem: theme.text || "#111111",
    faqDivider: theme.border || "#D9D9D9",

    suggestionBackground: theme.card || "#FFFFFF",
    suggestionText: theme.text || "#111111",
    suggestionBorder: theme.border || "#E0E0E0",
    suggestionIcon: theme.footer || "#2D9CDB",
    suggestionArrow: theme.icon || "#999999",
  };

  return (
    <View
      style={[styles.screen, { backgroundColor: colors.pageBackground }]}
    >
      <View
        style={[
          styles.headerComplemento,
          { backgroundColor: colors.headerBackground },
        ]}
      >
        <View style={styles.searchWrapper}>
          <View
            style={[
              styles.searchBox,
              { backgroundColor: colors.inputBackground },
            ]}
          >
            <Ionicons
              name="search"
              size={20}
              color={colors.inputIcon}
            />

            <TextInput
              style={[
                styles.searchInput,
                {
                  color: colors.inputText,
                  borderWidth: 0,
                },
              ]}
              placeholder="Ex: conta, login, atividades..."
              placeholderTextColor={colors.inputPlaceholder}
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
        {busca.length > 0 && (
          <View
            style={[
              styles.sugestoesBox,
              { backgroundColor: colors.suggestionBackground },
            ]}
          >
            {sugestoes.length > 0 ? (
              sugestoes.slice(0, 5).map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.sugestaoCard,
                    { borderColor: colors.suggestionBorder },
                  ]}
                  activeOpacity={0.7}
                  onPress={() => navegarPara(item.rota)}
                >
                  <Ionicons
                    name="search-outline"
                    size={18}
                    color={colors.suggestionIcon}
                  />

                  <Text
                    style={[
                      styles.sugestaoTexto,
                      { color: colors.suggestionText },
                    ]}
                  >
                    {item.palavra}
                  </Text>

                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={colors.suggestionArrow}
                  />
                </TouchableOpacity>
              ))
            ) : (
              <Text
                style={[
                  styles.sugestaoVazia,
                  { color: colors.suggestionText },
                ]}
              >
                Nenhuma sugestão encontrada
              </Text>
            )}
          </View>
        )}

        {perguntaSelecionada ? (
          <View
            style={[
              styles.card,
              { backgroundColor: colors.faqBackground },
            ]}
          >
            <Text
              style={[
                styles.cardTitle,
                { color: colors.faqTitle },
              ]}
            >
              {perguntaSelecionada.pergunta}
            </Text>

            <Text
              style={[
                styles.resposta,
                { color: colors.faqItem },
              ]}
            >
              {perguntaSelecionada.resposta}
            </Text>

            <TouchableOpacity onPress={voltarFAQ}>
              <Text
                style={[
                  styles.verMais,
                  { color: colors.faqTitle },
                ]}
              >
                Voltar
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text
              style={[
                styles.subTitle,
                { color: colors.sectionText },
              ]}
            >
              Fale com um dos nossos analistas:
            </Text>

            <View style={styles.row}>
              <TouchableOpacity
                style={[
                  styles.contatoBtn,
                  { backgroundColor: colors.contactBackground },
                ]}
                onPress={abrirWhatsApp}
                activeOpacity={0.85}
              >
                <FontAwesome
                  name="whatsapp"
                  size={20}
                  color={colors.contactIcon}
                />
                <Text
                  style={[
                    styles.contatoText,
                    { color: colors.contactText },
                  ]}
                >
                  (11) 11111-1111
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.contatoBtn,
                  { backgroundColor: colors.contactBackground },
                ]}
                onPress={ligar}
                activeOpacity={0.85}
              >
                <MaterialIcons
                  name="local-phone"
                  size={20}
                  color={colors.contactIcon}
                />
                <Text
                  style={[
                    styles.contatoText,
                    { color: colors.contactText },
                  ]}
                >
                  (11) 11111-1111
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.contatoBtnEmail,
                { backgroundColor: colors.contactBackground },
              ]}
              onPress={enviarEmail}
              activeOpacity={0.85}
            >
              <MaterialIcons
                name="mail-outline"
                size={22}
                color={colors.contactIcon}
              />
              <Text
                style={[
                  styles.contatoText,
                  { color: colors.contactText },
                ]}
              >
                {email}
              </Text>
            </TouchableOpacity>

            <View
              style={[
                styles.card,
                styles.cardFAQ,
                { backgroundColor: colors.faqBackground },
              ]}
            >
              <Text
                style={[
                  styles.cardTitle,
                  { color: colors.faqTitle },
                ]}
              >
                Perguntas frequentes
              </Text>

              {perguntasVisiveis.map((item, index) => (
                <View key={index}>
                  <TouchableOpacity
                    onPress={() => abrirPergunta(item)}
                    activeOpacity={0.75}
                  >
                    <Text
                      style={[
                        styles.item,
                        { color: colors.faqItem },
                      ]}
                    >
                      {item.pergunta}
                    </Text>
                  </TouchableOpacity>

                  <View
                    style={[
                      styles.divider,
                      { backgroundColor: colors.faqDivider },
                    ]}
                  />
                </View>
              ))}

              {!mostrarMais && (
                <TouchableOpacity onPress={() => setMostrarMais(true)}>
                  <Text
                    style={[
                      styles.verMais,
                      { color: colors.faqTitle },
                    ]}
                  >
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
  screen: {
    flex: 1,
  },

  headerComplemento: {
    paddingTop: 10,
    paddingBottom: 20,
  },

  searchWrapper: {
    paddingHorizontal: 20,
  },

  searchBox: {
    borderRadius: 30,
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
    textAlign: "center",
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
    borderRadius: 999,
    gap: 8,
  },

  contatoBtnEmail: {
    alignSelf: "center",
    width: "88%",
    paddingVertical: 14,
    borderRadius: 999,
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
    lineHeight: 22,
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