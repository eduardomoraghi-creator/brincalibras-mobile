import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  FlatList,
  Alert,
  Animated,
  Easing,
  Image,
  ImageSourcePropType,
  Modal,
} from "react-native";

import { useTheme } from "../../../../src/contexts/themeContext";
import {
  getRandomLibrasSymbols,
  shuffleArray,
} from "../../../../src/data/librasHelpers";
import { LibrasSymbol } from "../../../../src/data/librasSymbols";

type BaseItem = LibrasSymbol;
type CardType = "name" | "sign";

type CardData = {
  id: string;
  pairId: string;
  word: string;
  type: CardType;
  display: string;
  signalAsset?: ImageSourcePropType;
  matched: boolean;
};

type Level = "easy" | "medium" | "hard";

const SCREEN_WIDTH = Dimensions.get("window").width;
const HORIZONTAL_PADDING = 16;
const GRID_GAP = 2;
const PREVIEW_DURATION_MS = 3000;

const LEVEL_CONFIG: Record<
  Level,
  { columns: number; pairs: number; label: string }
> = {
  easy: { columns: 3, pairs: 3, label: "Fácil" },
  medium: { columns: 3, pairs: 5, label: "Médio" },
  hard: { columns: 3, pairs: 8, label: "Difícil" },
};

function buildDeck(level: Level): CardData[] {
  const { pairs } = LEVEL_CONFIG[level];
  const allItems = getRandomLibrasSymbols(999);

  const safeItems = allItems.filter((item) => !!item.imagem);
  const selectedPairs = safeItems.slice(0, Math.min(pairs, safeItems.length));

  const deck = selectedPairs.flatMap((item) => {
    const wordCard: CardData = {
      id: `${item.id}-name`,
      pairId: item.id,
      word: item.palavra,
      type: "name",
      display: item.palavra,
      matched: false,
    };

    const signCard: CardData = {
      id: `${item.id}-sign`,
      pairId: item.id,
      word: item.palavra,
      type: "sign",
      display: item.palavra,
      signalAsset: item.imagem,
      matched: false,
    };

    return [wordCard, signCard];
  });

  return shuffleArray(deck);
}

function getCardSize(columns: number): number {
  const totalHorizontalPadding = HORIZONTAL_PADDING * 2;
  const totalGap = GRID_GAP * (columns - 1);
  const availableWidth = SCREEN_WIDTH - totalHorizontalPadding - totalGap;
  return Math.floor(availableWidth / columns);
}

type MemoryCardProps = {
  card: CardData;
  isFlipped: boolean;
  isLocked: boolean;
  size: number;
  onPress: (card: CardData) => void;
  colors: {
    cardFront: string;
    cardFrontBorder: string;
    cardMatched: string;
    cardMatchedBorder: string;
    signBadge: string;
    signMissing: string;
    wordHint: string;
    wordLabel: string;
    shadow: string;
  };
};

function MemoryCard({
  card,
  isFlipped,
  isLocked,
  size,
  onPress,
  colors,
}: MemoryCardProps) {
  const rotateAnim = useRef(new Animated.Value(isFlipped ? 180 : 0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isFlipped ? 180 : 0,
      duration: 240,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [isFlipped, rotateAnim]);

  useEffect(() => {
    if (card.matched) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.06,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 120,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [card.matched, scaleAnim]);

  const frontInterpolate = rotateAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = rotateAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const isSign = card.type === "sign";

  return (
    <Pressable
      onPress={() => onPress(card)}
      disabled={isLocked || isFlipped || card.matched}
      style={{ width: size, height: size, marginBottom: GRID_GAP }}
    >
      <Animated.View style={[styles.cardWrap, { transform: [{ scale: scaleAnim }] }]}>
        <Animated.View
          style={[
            styles.cardBase,
            isSign ? styles.cardBackSign : styles.cardBackImage,
            {
              width: size,
              height: size,
              transform: [{ rotateY: frontInterpolate }],
              shadowColor: colors.shadow,
            },
          ]}
        >
          <Text style={styles.cardBackIcon}>{isSign ? "🤟" : "🔤"}</Text>
          <Text style={styles.cardBackLabel}>{isSign ? "LIBRAS" : "PALAVRA"}</Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.cardBase,
            {
              width: size,
              height: size,
              transform: [{ rotateY: backInterpolate }],
              backgroundColor: colors.cardFront,
              borderColor: card.matched
                ? colors.cardMatchedBorder
                : colors.cardFrontBorder,
              shadowColor: colors.shadow,
            },
            card.matched && {
              backgroundColor: colors.cardMatched,
            },
          ]}
        >
          {isSign ? (
            <View style={styles.signContent}>
              <Text style={[styles.signBadge, { color: colors.signBadge }]}>
                LIBRAS
              </Text>

              {card.signalAsset ? (
                <Image
                  source={card.signalAsset}
                  style={styles.signImage}
                  resizeMode="contain"
                />
              ) : (
                <Text style={[styles.signMissing, { color: colors.signMissing }]}>
                  Imagem não encontrada
                </Text>
              )}

              <Text style={[styles.wordHint, { color: colors.wordHint }]}>
                {card.word}
              </Text>
            </View>
          ) : (
            <View style={styles.imageContent}>
              <Text style={[styles.wordLabel, { color: colors.wordLabel }]}>
                {card.word}
              </Text>
            </View>
          )}
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

export default function MemoriaJogo() {
  const { theme, darkMode } = useTheme();

  const colors = useMemo(
    () => ({
      background: theme.background,
      surface: theme.card,
      surfaceSoft: darkMode ? "#2A2A2A" : "#E9EEF6",
      text: theme.text || (darkMode ? "#F5F5F5" : "#1D3557"),
      textSecondary: darkMode ? "#B0B0B0" : "#5C677D",
      textMuted: darkMode ? "#9CA3AF" : "#6B7280",
      primary: "#4C7DFF",
      success: "#47C27A",
      successSoft: darkMode ? "#163828" : "#F3FFF8",
      border: darkMode ? "#333333" : "#E6ECF5",
      cardFront: theme.card,
      cardFrontBorder: darkMode ? "#3A3A3A" : "#E6ECF5",
      matched: darkMode ? "#1D3327" : "#F3FFF8",
      matchedBorder: "#47C27A",
      previewOverlay: "rgba(0,0,0,0.78)",
      previewBox: theme.card,
      shadow: "#000000",
      danger: darkMode ? "#FF8A80" : "#B00020",
    }),
    [theme, darkMode]
  );

  const [level, setLevel] = useState<Level>("easy");
  const [deck, setDeck] = useState<CardData[]>(() => buildDeck("easy"));
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(
    "Encontre os pares entre a palavra e o símbolo em Libras."
  );
  const [isBoardLocked, setIsBoardLocked] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewCard, setPreviewCard] = useState<CardData | null>(null);

  const previewTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const config = LEVEL_CONFIG[level];
  const cardSize = useMemo(() => getCardSize(config.columns), [config.columns]);

  const visibleMap = useMemo(() => {
    const map = new Set(flippedIds);

    deck.forEach((card) => {
      if (card.matched) {
        map.add(card.id);
      }
    });

    return map;
  }, [deck, flippedIds]);

  const totalPairsInDeck = useMemo(() => {
    const uniquePairIds = new Set(deck.map((card) => card.pairId));
    return uniquePairIds.size;
  }, [deck]);

  useEffect(() => {
    return () => {
      if (previewTimeoutRef.current) {
        clearTimeout(previewTimeoutRef.current);
      }
    };
  }, []);

  const closePreview = () => {
    if (previewTimeoutRef.current) {
      clearTimeout(previewTimeoutRef.current);
      previewTimeoutRef.current = null;
    }

    setPreviewVisible(false);
    setPreviewCard(null);
  };

  const openPreview = (card: CardData) => {
    if (card.type !== "sign" || !card.signalAsset) return;

    if (previewTimeoutRef.current) {
      clearTimeout(previewTimeoutRef.current);
    }

    setPreviewCard(card);
    setPreviewVisible(true);

    previewTimeoutRef.current = setTimeout(() => {
      setPreviewVisible(false);
      setPreviewCard(null);
      previewTimeoutRef.current = null;
    }, PREVIEW_DURATION_MS);
  };

  const resetGame = (nextLevel: Level = level) => {
    const nextDeck = buildDeck(nextLevel);

    setDeck(nextDeck);
    setFlippedIds([]);
    setMatchedCount(0);
    setMoves(0);
    setScore(0);
    setFeedback("Encontre os pares entre a palavra e o símbolo em Libras.");
    setIsBoardLocked(false);
    setLevel(nextLevel);
    setGameFinished(false);
    closePreview();
  };

  const startGame = () => {
    resetGame(level);
    setGameStarted(true);
  };

  const backToStart = (nextLevel?: Level) => {
    if (nextLevel) {
      setLevel(nextLevel);
      resetGame(nextLevel);
    } else {
      resetGame(level);
    }

    setGameStarted(false);
    setGameFinished(false);
  };

  const finishLevel = () => {
    setGameFinished(true);

    Alert.alert(
      "Parabéns! 🎉",
      `Você terminou o nível ${LEVEL_CONFIG[level].label} com ${score} pontos em ${moves} jogadas.`,
      [{ text: "OK" }]
    );
  };

  useEffect(() => {
    if (matchedCount > 0 && matchedCount === totalPairsInDeck) {
      finishLevel();
    }
  }, [matchedCount, totalPairsInDeck, score, moves, level]);

  useEffect(() => {
    if (deck.length === 0) {
      setFeedback("Nenhuma imagem disponível para montar o jogo.");
    }
  }, [deck]);

  const handleCardPress = (card: CardData) => {
    if (isBoardLocked || gameFinished || previewVisible) return;
    if (flippedIds.includes(card.id)) return;

    const nextFlipped = [...flippedIds, card.id];
    setFlippedIds(nextFlipped);

    if (card.type === "sign" && card.signalAsset) {
      openPreview(card);
    }

    if (nextFlipped.length < 2) {
      return;
    }

    setIsBoardLocked(true);
    setMoves((prev) => prev + 1);

    const [firstId, secondId] = nextFlipped;
    const firstCard = deck.find((item) => item.id === firstId);
    const secondCard = deck.find((item) => item.id === secondId);

    if (!firstCard || !secondCard) {
      setFlippedIds([]);
      setIsBoardLocked(false);
      return;
    }

    const isMatch =
      firstCard.pairId === secondCard.pairId && firstCard.type !== secondCard.type;

    if (isMatch) {
      setTimeout(() => {
        setDeck((prev) =>
          prev.map((item) =>
            item.id === firstId || item.id === secondId
              ? { ...item, matched: true }
              : item
          )
        );
        setMatchedCount((prev) => prev + 1);
        setScore((prev) => prev + 10);
        setFeedback(`Muito bem! Você encontrou o par de ${firstCard.word}.`);
        setFlippedIds([]);
        setIsBoardLocked(false);
      }, 450);
    } else {
      setScore((prev) => Math.max(0, prev - 1));
      setFeedback("Não foi dessa vez. Tente novamente.");

      setTimeout(() => {
        setFlippedIds([]);
        setIsBoardLocked(false);
      }, 850);
    }
  };

  const progress = `${matchedCount}/${totalPairsInDeck}`;

  const nextLevel: Level =
    level === "easy" ? "medium" : level === "medium" ? "hard" : "easy";

  if (!gameStarted) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <View style={styles.container}>
          <View style={styles.startContainer}>
            <Text style={[styles.title, { color: colors.text }]}>Memória Libras</Text>

            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Escolha o nível e toque em iniciar.
            </Text>

            <View style={[styles.startCard, { backgroundColor: colors.surface }]}>
              <Text style={[styles.startTitle, { color: colors.text }]}>
                Pronto para jogar?
              </Text>

              <Text style={[styles.startText, { color: colors.textSecondary }]}>
                O tabuleiro será montado com cartas aleatórias.
              </Text>

              <View style={styles.levelRow}>
                {(["easy", "medium", "hard"] as Level[]).map((item) => {
                  const selected = item === level;

                  return (
                    <Pressable
                      key={item}
                      onPress={() => setLevel(item)}
                      style={[
                        styles.levelButton,
                        {
                          backgroundColor: selected
                            ? colors.primary
                            : colors.surfaceSoft,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.levelButtonText,
                          { color: selected ? "#FFFFFF" : colors.text },
                        ]}
                      >
                        {LEVEL_CONFIG[item].label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              <Pressable style={styles.startButton} onPress={startGame}>
                <Text style={styles.startButtonText}>Iniciar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        {gameFinished && (
          <>
            <Text style={[styles.title, { color: colors.text }]}>Memória Libras</Text>

            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Combine a palavra com o símbolo correto em Libras.
            </Text>

            <View style={[styles.headerCard, { backgroundColor: colors.surface }]}>
              <View style={styles.headerItem}>
                <Text style={[styles.headerLabel, { color: colors.textMuted }]}>
                  Pontos
                </Text>
                <Text style={[styles.headerValue, { color: colors.text }]}>
                  {score}
                </Text>
              </View>

              <View style={styles.headerItem}>
                <Text style={[styles.headerLabel, { color: colors.textMuted }]}>
                  Jogadas
                </Text>
                <Text style={[styles.headerValue, { color: colors.text }]}>
                  {moves}
                </Text>
              </View>

              <View style={styles.headerItem}>
                <Text style={[styles.headerLabel, { color: colors.textMuted }]}>
                  Pares
                </Text>
                <Text style={[styles.headerValue, { color: colors.text }]}>
                  {progress}
                </Text>
              </View>
            </View>

            <View style={styles.finishedLevelRow}>
              <View
                style={[
                  styles.levelButton,
                  styles.finishedLevelBadge,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Text style={[styles.levelButtonText, { color: "#FFFFFF" }]}>
                  Nível: {LEVEL_CONFIG[level].label}
                </Text>
              </View>
            </View>
          </>
        )}

        {!gameFinished && (
          <View
            style={[
              styles.feedbackCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.feedbackText, { color: colors.textSecondary }]}>
              {feedback}
            </Text>
          </View>
        )}

        <FlatList
          data={deck}
          key={config.columns}
          numColumns={config.columns}
          keyExtractor={(item) => item.id}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          style={styles.list}
          contentContainerStyle={[styles.grid, !gameFinished && styles.gridFullscreen]}
          columnWrapperStyle={config.columns > 1 ? styles.columnWrapper : undefined}
          renderItem={({ item }) => (
            <MemoryCard
              card={item}
              size={cardSize}
              isLocked={isBoardLocked}
              isFlipped={visibleMap.has(item.id)}
              onPress={handleCardPress}
              colors={{
                cardFront: colors.cardFront,
                cardFrontBorder: colors.cardFrontBorder,
                cardMatched: colors.matched,
                cardMatchedBorder: colors.matchedBorder,
                signBadge: colors.primary,
                signMissing: colors.danger,
                wordHint: colors.textSecondary,
                wordLabel: colors.text,
                shadow: colors.shadow,
              }}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>
                Ainda não há imagens suficientes para montar o jogo.
              </Text>
            </View>
          }
        />

        {gameFinished && (
          <View style={styles.bottomRow}>
            <Pressable
              style={[styles.secondaryButton, { backgroundColor: colors.surfaceSoft }]}
              onPress={() => backToStart(level)}
            >
              <Text style={[styles.secondaryButtonText, { color: colors.text }]}>
                Reiniciar
              </Text>
            </Pressable>

            <Pressable
              style={[styles.primaryButton, { backgroundColor: colors.success }]}
              onPress={() => backToStart(nextLevel)}
            >
              <Text style={styles.primaryButtonText}>Próximo nível</Text>
            </Pressable>
          </View>
        )}
      </View>

      <Modal
        visible={previewVisible}
        transparent
        animationType="fade"
        onRequestClose={closePreview}
      >
        <View style={[styles.previewOverlay, { backgroundColor: colors.previewOverlay }]}>
          <View style={[styles.previewBox, { backgroundColor: colors.previewBox }]}>
            <Text style={[styles.previewTitle, { color: colors.text }]}>
              {previewCard?.word}
            </Text>

            {previewCard?.signalAsset ? (
              <Image
                source={previewCard.signalAsset}
                style={styles.previewImage}
                resizeMode="contain"
              />
            ) : null}

            <Text style={[styles.previewHint, { color: colors.textSecondary }]}>
              A imagem será fechada automaticamente
            </Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 12,
    paddingBottom: 16,
  },

  startContainer: {
    flex: 1,
    justifyContent: "center",
  },

  startCard: {
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 20,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    marginTop: 18,
  },

  startTitle: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 10,
  },

  startText: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 18,
  },

  startButton: {
    backgroundColor: "#47C27A",
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },

  startButtonText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 18,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 15,
    marginBottom: 12,
  },

  headerCard: {
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  headerItem: {
    alignItems: "center",
    flex: 1,
  },

  headerLabel: {
    fontSize: 13,
    marginBottom: 4,
  },

  headerValue: {
    fontSize: 22,
    fontWeight: "800",
  },

  feedbackCard: {
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 12,
  },

  feedbackText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 20,
  },

  levelRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },

  finishedLevelRow: {
    flexDirection: "row",
    marginBottom: 12,
  },

  finishedLevelBadge: {
    flex: 1,
  },

  levelButton: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: "center",
  },

  levelButtonText: {
    fontWeight: "700",
    fontSize: 14,
  },

  list: {
    flex: 1,
  },

  grid: {
    paddingBottom: 100,
  },

  gridFullscreen: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 12,
  },

  columnWrapper: {
    justifyContent: "space-between",
  },

  cardWrap: {
    flex: 1,
  },

  cardBase: {
    position: "absolute",
    backfaceVisibility: "hidden",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    borderWidth: 2,
  },

  cardBackImage: {
    backgroundColor: "#FFB703",
    borderWidth: 3,
    borderColor: "#FFD166",
  },

  cardBackSign: {
    backgroundColor: "#6C8CFF",
    borderWidth: 3,
    borderColor: "#88A0FF",
  },

  cardBackIcon: {
    fontSize: 42,
  },

  cardBackLabel: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },

  signContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    width: "100%",
    height: "100%",
  },

  signBadge: {
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 6,
  },

  signImage: {
    width: "130%",
    height: "130%",
    marginBottom: 6,
  },

  signMissing: {
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
    paddingHorizontal: 8,
  },

  wordHint: {
    marginTop: 2,
    fontSize: 14,
    textAlign: "center",
    fontWeight: "700",
  },

  imageContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    width: "100%",
    height: "100%",
  },

  wordLabel: {
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
  },

  bottomRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },

  secondaryButton: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },

  secondaryButtonText: {
    fontWeight: "800",
    fontSize: 15,
  },

  primaryButton: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 15,
  },

  emptyState: {
    paddingVertical: 32,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyStateText: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "600",
  },

  previewOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  previewBox: {
    width: "96%",
    maxWidth: 520,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 18,
    alignItems: "center",
  },

  previewTitle: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 12,
    textAlign: "center",
  },

  previewImage: {
    width: "100%",
    height: 420,
  },

  previewHint: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});