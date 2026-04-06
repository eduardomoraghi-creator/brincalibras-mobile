import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../src/contexts/themeContext";

export default function AtividadesScreen() {
  const router = useRouter();
  const { theme, darkMode } = useTheme();

  const atividades = [
    {
      id: 8,
      title: "Família",
      subtitle: "Lições e atividades temáticas",
      imagem: require("../../src/assets/images/atividades/familia.png"),
      path: "/global/atividades/familia/familia" as const,
      lessons: "4 etapas",
      level: "Iniciante",
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.background,
            borderBottomColor: theme.border || "#E7E7EF",
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={[
            styles.backButton,
            {
              backgroundColor: darkMode
                ? "rgba(255,255,255,0.06)"
                : "rgba(106,4,209,0.08)",
            },
          ]}
          activeOpacity={0.85}
        >
          <MaterialIcons
            name="arrow-back-ios-new"
            size={18}
            color={theme.text}
          />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Atividades
        </Text>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.heroCard,
            {
              backgroundColor: darkMode ? theme.card : "#6A04D1",
              borderColor: theme.border || "#E7E7EF",
              shadowColor: "#000",
            },
          ]}
        >
          <View style={styles.heroTopRow}>
            <View
              style={[
                styles.heroBadge,
                {
                  backgroundColor: darkMode
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(255,255,255,0.16)",
                },
              ]}
            >
              <MaterialIcons
                name="auto-awesome"
                size={16}
                color={darkMode ? theme.text : "#FFFFFF"}
              />
              <Text
                style={[
                  styles.heroBadgeText,
                  { color: darkMode ? theme.text : "#FFFFFF" },
                ]}
              >
                Aprendizado
              </Text>
            </View>
          </View>

          <Text
            style={[
              styles.heroTitle,
              { color: darkMode ? theme.text : "#FFFFFF" },
            ]}
          >
            Escolha uma unidade para praticar
          </Text>

          <Text
            style={[
              styles.heroSubtitle,
              {
                color: darkMode
                  ? theme.textSecondary || theme.text
                  : "rgba(255,255,255,0.82)",
              },
            ]}
          >
            Estude por temas, avance nas lições e fortaleça seu vocabulário com
            atividades interativas.
          </Text>

          <View style={styles.heroStatsRow}>
            <View
              style={[
                styles.heroStat,
                {
                  backgroundColor: darkMode
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(255,255,255,0.14)",
                },
              ]}
            >
              <MaterialIcons
                name="menu-book"
                size={18}
                color={darkMode ? theme.text : "#FFFFFF"}
              />
              <Text
                style={[
                  styles.heroStatText,
                  { color: darkMode ? theme.text : "#FFFFFF" },
                ]}
              >
                Lições
              </Text>
            </View>

            <View
              style={[
                styles.heroStat,
                {
                  backgroundColor: darkMode
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(255,255,255,0.14)",
                },
              ]}
            >
              <MaterialIcons
                name="sports-esports"
                size={18}
                color={darkMode ? theme.text : "#FFFFFF"}
              />
              <Text
                style={[
                  styles.heroStatText,
                  { color: darkMode ? theme.text : "#FFFFFF" },
                ]}
              >
                Desafios
              </Text>
            </View>

            <View
              style={[
                styles.heroStat,
                {
                  backgroundColor: darkMode
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(255,255,255,0.14)",
                },
              ]}
            >
              <MaterialIcons
                name="trending-up"
                size={18}
                color={darkMode ? theme.text : "#FFFFFF"}
              />
              <Text
                style={[
                  styles.heroStatText,
                  { color: darkMode ? theme.text : "#FFFFFF" },
                ]}
              >
                Evolução
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Unidades disponíveis
          </Text>
          <Text
            style={[
              styles.sectionSubtitle,
              { color: theme.textSecondary || theme.text },
            ]}
          >
            Toque em uma unidade para abrir
          </Text>
        </View>

        <View style={styles.cardsContainer}>
          {atividades.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.card,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border || "#E7E7EF",
                  shadowColor: "#000",
                },
              ]}
              activeOpacity={0.9}
              onPress={() => router.push(item.path)}
            >
              <View style={styles.cardTop}>
                <View
                  style={[
                    styles.imageWrap,
                    {
                      backgroundColor: darkMode
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(106,4,209,0.08)",
                    },
                  ]}
                >
                  <Image
                    source={item.imagem}
                    style={styles.iconImage}
                    resizeMode="contain"
                  />
                </View>

                <View style={styles.tagsRow}>
                  <View
                    style={[
                      styles.tag,
                      {
                        backgroundColor: darkMode
                          ? "rgba(255,255,255,0.06)"
                          : "#F4ECFF",
                      },
                    ]}
                  >
                    <Text style={[styles.tagText, { color: "#6A04D1" }]}>
                      {item.level}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.tag,
                      {
                        backgroundColor: darkMode
                          ? "rgba(255,255,255,0.06)"
                          : "#EEF6FF",
                      },
                    ]}
                  >
                    <Text style={[styles.tagText, { color: "#246BCE" }]}>
                      {item.lessons}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.cardBody}>
                <Text style={[styles.cardTitle, { color: theme.text }]}>
                  {item.title}
                </Text>

                <Text
                  style={[
                    styles.cardSubtitle,
                    { color: theme.textSecondary || theme.text },
                  ]}
                >
                  {item.subtitle}
                </Text>
              </View>

              <View
                style={[
                  styles.cardFooter,
                  {
                    borderTopColor: theme.border || "#E7E7EF",
                  },
                ]}
              >
                <View style={styles.cardFooterLeft}>
                  <MaterialIcons
                    name="play-circle-outline"
                    size={18}
                    color={theme.text}
                  />
                  <Text style={[styles.cardFooterText, { color: theme.text }]}>
                    Abrir unidade
                  </Text>
                </View>

                <View
                  style={[
                    styles.arrowWrap,
                    {
                      backgroundColor: darkMode
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(106,4,209,0.08)",
                    },
                  ]}
                >
                  <MaterialIcons
                    name="arrow-forward-ios"
                    size={14}
                    color={theme.text}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const CARD_IMAGE_SIZE = 112;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    paddingTop: 46,
    paddingBottom: 14,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 0.2,
  },

  headerSpacer: {
    width: 40,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 42,
  },

  heroCard: {
    borderRadius: 28,
    padding: 20,
    marginBottom: 22,
    borderWidth: 1,
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },

  heroTopRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 14,
  },

  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },

  heroBadgeText: {
    fontSize: 12,
    fontWeight: "800",
  },

  heroTitle: {
    fontSize: 24,
    fontWeight: "900",
    lineHeight: 30,
    marginBottom: 8,
  },

  heroSubtitle: {
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 18,
  },

  heroStatsRow: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },

  heroStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 14,
  },

  heroStatText: {
    fontSize: 13,
    fontWeight: "700",
  },

  sectionHeader: {
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 4,
  },

  sectionSubtitle: {
    fontSize: 13,
    lineHeight: 18,
  },

  cardsContainer: {
    gap: 16,
  },

  card: {
    borderRadius: 26,
    borderWidth: 1,
    padding: 16,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  cardTop: {
    alignItems: "center",
  },

  imageWrap: {
    width: "100%",
    minHeight: 150,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    paddingVertical: 12,
  },

  iconImage: {
    width: CARD_IMAGE_SIZE,
    height: CARD_IMAGE_SIZE,
  },

  tagsRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 14,
    flexWrap: "wrap",
  },

  tag: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },

  tagText: {
    fontSize: 12,
    fontWeight: "800",
  },

  cardBody: {
    alignItems: "center",
    paddingHorizontal: 8,
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 6,
  },

  cardSubtitle: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 16,
  },

  cardFooter: {
    borderTopWidth: 1,
    paddingTop: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardFooterLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  cardFooterText: {
    fontSize: 14,
    fontWeight: "800",
  },

  arrowWrap: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});