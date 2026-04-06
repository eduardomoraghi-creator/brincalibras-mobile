import { Image } from "expo-image";
import { Platform, StyleSheet, Text, View } from "react-native";

import { Collapsible } from "@/components/ui/collapsible";
import { ExternalLink } from "@/components/external-link";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useTheme } from "@/contexts/ThemeContext";

export default function ExploreScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: theme.surfaceAlt,
        dark: theme.surfaceAlt,
      }}
      headerImage={
        <IconSymbol
          size={310}
          color={theme.iconMuted}
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Explore</Text>
      </View>

      <Text style={styles.text}>
        This app includes example code to help you get started.
      </Text>

      <Collapsible title="File-based routing">
        <Text style={styles.text}>
          This app has two screens:{" "}
          <Text style={styles.bold}>app/(tabs)/index.tsx</Text> and{" "}
          <Text style={styles.bold}>app/(tabs)/explore.tsx</Text>
        </Text>

        <Text style={styles.text}>
          The layout file in <Text style={styles.bold}>app/(tabs)/_layout.tsx</Text>{" "}
          sets up the tab navigator.
        </Text>

        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <Text style={styles.link}>Learn more</Text>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Android, iOS, and web support">
        <Text style={styles.text}>
          You can open this project on Android, iOS, and the web. To open the
          web version, press <Text style={styles.bold}>w</Text> in the terminal
          running this project.
        </Text>
      </Collapsible>

      <Collapsible title="Images">
        <Text style={styles.text}>
          For static images, you can use the <Text style={styles.bold}>@2x</Text>{" "}
          and <Text style={styles.bold}>@3x</Text> suffixes to provide files for
          different screen densities.
        </Text>

        <Image
          source={require("@/assets/images/react-logo.png")}
          style={styles.image}
        />

        <ExternalLink href="https://reactnative.dev/docs/images">
          <Text style={styles.link}>Learn more</Text>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Light and dark mode components">
        <Text style={styles.text}>
          This template has light and dark mode support. The{" "}
          <Text style={styles.bold}>useColorScheme()</Text> hook lets you inspect
          what the user&apos;s current color scheme is, and so you can adjust UI
          colors accordingly.
        </Text>

        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <Text style={styles.link}>Learn more</Text>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Animations">
        <Text style={styles.text}>
          This template includes an example of an animated component. The{" "}
          <Text style={styles.bold}>components/HelloWave.tsx</Text> component uses
          the powerful <Text style={styles.bold}>react-native-reanimated</Text>{" "}
          library to create a waving hand animation.
        </Text>

        {Platform.select({
          ios: (
            <Text style={styles.text}>
              The <Text style={styles.bold}>components/ParallaxScrollView.tsx</Text>{" "}
              component provides a parallax effect for the header image.
            </Text>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    headerImage: {
      color: theme.iconMuted,
      bottom: -90,
      left: -35,
      position: "absolute",
    },
    titleContainer: {
      flexDirection: "row",
      gap: 8,
    },
    title: {
      fontSize: 32,
      fontWeight: "700",
      color: theme.text,
    },
    text: {
      fontSize: 16,
      lineHeight: 24,
      color: theme.text,
      marginBottom: 12,
    },
    bold: {
      fontWeight: "600",
      color: theme.text,
    },
    link: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.primary,
    },
    image: {
      width: 100,
      height: 100,
      alignSelf: "center",
      marginVertical: 12,
    },
  });