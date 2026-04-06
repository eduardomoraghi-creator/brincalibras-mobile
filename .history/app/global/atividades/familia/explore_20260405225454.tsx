import { Image } from "expo-image";
import { Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";

export default function ExploreScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Explore</Text>

      <Text style={styles.text}>
        This app includes example code to help you get started.
      </Text>

      <Text style={styles.subtitle}>File-based routing</Text>
      <Text style={styles.text}>
        This app has two screens:{" "}
        <Text style={styles.bold}>app/(tabs)/index.tsx</Text> and{" "}
        <Text style={styles.bold}>app/(tabs)/explore.tsx</Text>
      </Text>

      <TouchableOpacity onPress={() => openLink("https://docs.expo.dev/router/introduction")}>
        <Text style={styles.link}>Learn more</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Images</Text>
      <Image
        source={require("@/assets/images/react-logo.png")}
        style={styles.image}
      />

      <TouchableOpacity onPress={() => openLink("https://reactnative.dev/docs/images")}>
        <Text style={styles.link}>Learn more</Text>
      </TouchableOpacity>

      {Platform.OS === "ios" && (
        <>
          <Text style={styles.subtitle}>iOS Feature</Text>
          <Text style={styles.text}>
            This example includes platform-specific content.
          </Text>
        </>
      )}
    </ScrollView>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "700",
      color: theme.text,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 20,
      fontWeight: "600",
      color: theme.text,
      marginTop: 20,
    },
    text: {
      fontSize: 16,
      color: theme.text,
      marginTop: 8,
    },
    bold: {
      fontWeight: "700",
      color: theme.text,
    },
    link: {
      color: theme.primary,
      marginTop: 10,
      fontWeight: "600",
    },
    image: {
      width: 100,
      height: 100,
      alignSelf: "center",
      marginVertical: 20,
    },
  });