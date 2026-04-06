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

const CARD_SIZE = 170;
const ICON_SIZE = 108;

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
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.background,
            borderBottomColor: theme.border || "#E5E7EB",
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.8}
        >
          <MaterialIcons name="arrow-back-ios-new" size={20} color={theme.text} />
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
              backgroundColor: theme.card,
              borderColor: theme.border || "#E5E7EB",
              shadowColor: darkMode ? "#000" : "#000",
            },
          ]}
        >
          <View style={styles.heroIcon}>
            <MaterialIcons name="auto-awesome" size={24} color={theme.text} />
          </View>

          <Text style={[styles.heroTitle, { color: theme.text }]}>
            Aprenda praticando
          </Text>
          <Text
            style={[
              styles.heroSubtitle,
              { color: theme.textSecondary || theme.text },
            ]}
          >
            Escolha uma unidade para estudar com lições e desafios interativos.
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
                  borderColor: theme.border || "#E5E7EB",
                  shadowColor: darkMode ? "#000" : "#000",
                },
              ]}
              activeOpacity={0.88}
              onPress={() => router.push(item.path)}
            >
              <View style={styles.imageWrap}>
                <Image
                  source={item.imagem}
                  style={styles.iconImage}
                  resizeMode="contain"
                />
              </View>

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

              <View style={styles.cardFooter}>
                <Text style={[styles.cardFooterText, { color: theme.text }]}>
                  Abrir unidade
                </Text>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={16}
                  color={theme.text}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 44,
    paddingBottom: 14,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
  },
  headerSpacer: {
    width: 38,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 40,
  },
  heroCard: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 18,
    marginBottom: 20,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  heroIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "rgba(106,4,209,0.10)",
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 16,
  },
  card: {
    width: CARD_SIZE,
    minHeight: 235,
    borderRadius: 24,
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    padding: 16,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  imageWrap: {
    width: 120,
    height: 120,
    borderRadius: 20,
    backgroundColor: "rgba(106,4,209,0.08)",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  iconImage: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  cardTitle: {
    marginTop: 14,
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
  },
  cardSubtitle: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
    marginTop: 6,
  },
  cardFooter: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  cardFooterText: {
    fontSize: 13,
    fontWeight: "700",
  },
});