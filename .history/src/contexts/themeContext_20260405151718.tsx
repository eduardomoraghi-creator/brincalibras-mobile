import React, { createContext, useContext, useMemo, useState, ReactNode } from "react";

export type Theme = {
  mode: "light" | "dark";
  background: string;
  surface: string;
  surfaceAlt: string;
  header: string;
  footer: string;
  curve: string;
  banner: string;
  card: string;
  cardBorder: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  textOnCard: string;
  textOnPrimary: string;
  icon: string;
  iconMuted: string;
  logo: string;
  primary: string;
  border: string;
  inputBackground: string;
  inputText: string;
  inputPlaceholder: string;
  inputBorder: string;
  button: string;
  buttonText: string;
  shadow: string;
};

const lightTheme: Theme = {
  mode: "light",
  background: "#FFFFFF",
  surface: "#FFFFFF",
  surfaceAlt: "#F5F7FA",
  header: "#2D9CDB",
  footer: "#FFFFFF",
  curve: "#5DADE2",
  banner: "#E91E63",
  card: "#FFFFFF",
  cardBorder: "#3A8FB7",
  text: "#000000",
  textSecondary: "#333333",
  textMuted: "#8E8E8E",
  textOnCard: "#000000",
  textOnPrimary: "#FFFFFF",
  icon: "#3A8FB7",
  iconMuted: "#8E8E8E",
  logo: "#3A8FB7",
  primary: "#3A8FB7",
  border: "#D9E2EC",
  inputBackground: "#FFFFFF",
  inputText: "#000000",
  inputPlaceholder: "#8E8E8E",
  inputBorder: "#D9E2EC",
  button: "#3A8FB7",
  buttonText: "#FFFFFF",
  shadow: "#000000",
};

const darkTheme: Theme = {
  mode: "dark",
  background: "#2F2F2F",
  surface: "#3A3A3A",
  surfaceAlt: "#454545",
  header: "#3A8FB7",
  footer: "#3F3F3F",
  curve: "#5DADE2",
  banner: "#880E4F",
  card: "#EAEAEA",
  cardBorder: "#3A8FB7",
  text: "#FFFFFF",
  textSecondary: "#E0E0E0",
  textMuted: "#BDBDBD",
  textOnCard: "#000000",
  textOnPrimary: "#FFFFFF",
  icon: "#FFFFFF",
  iconMuted: "#BDBDBD",
  logo: "#FFFFFF",
  primary: "#2D9CDB",
  border: "#5A5A5A",
  inputBackground: "#FFFFFF",
  inputText: "#000000",
  inputPlaceholder: "#8E8E8E",
  inputBorder: "#D9E2EC",
  button: "#EAEAEA",
  buttonText: "#2D9CDB",
  shadow: "#000000",
};

type ThemeContextType = {
  darkMode: boolean;
  theme: Theme;
  toggleDarkMode: () => void;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  theme: lightTheme,
  toggleDarkMode: () => {},
  setDarkMode: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const theme = useMemo(() => {
    return darkMode ? darkTheme : lightTheme;
  }, [darkMode]);

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        theme,
        toggleDarkMode,
        setDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);