import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

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
  textOnButton: string;
  textOnDanger: string;
  textOnImage: string;

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

  secondaryButton: string;
  secondaryButtonText: string;

  danger: string;
  dangerText: string;

  progressBackground: string;
  overlay: string;

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
  cardBorder: "#D9E2EC",

  text: "#000000",
  textSecondary: "#333333",
  textMuted: "#8E8E8E",

  textOnCard: "#000000",
  textOnPrimary: "#FFFFFF",
  textOnButton: "#FFFFFF",
  textOnDanger: "#FFFFFF",
  textOnImage: "#FFFFFF",

  icon: "#3A8FB7",
  iconMuted: "#8E8E8E",
  logo: "#3A8FB7",

  primary: "#3A8FB7",
  border: "#D9E2EC",

  inputBackground: "#FFFFFF",
  inputText: "#000000",
  inputPlaceholder: "#8E8E8E",
  inputBorder: "#D9E2EC",

  button: "#2D9CDB",
  buttonText: "#FFFFFF",

  secondaryButton: "#5C677D",
  secondaryButtonText: "#FFFFFF",

  danger: "#D32F2F",
  dangerText: "#FFFFFF",

  progressBackground: "#E9EEF3",
  overlay: "rgba(0,0,0,0.22)",

  shadow: "#000000",
};

const darkTheme: Theme = {
  mode: "dark",

  background: "#2F2F2F",
  surface: "#3A3A3A",
  surfaceAlt: "#454545",
  header: "#2D9CDB",
  footer: "#3F3F3F",
  curve: "#5DADE2",
  banner: "#880E4F",

  card: "#3A3A3A",
  cardBorder: "#5A5A5A",

  text: "#FFFFFF",
  textSecondary: "#E0E0E0",
  textMuted: "#BDBDBD",

  textOnCard: "#FFFFFF",
  textOnPrimary: "#FFFFFF",
  textOnButton: "#FFFFFF",
  textOnDanger: "#FFFFFF",
  textOnImage: "#FFFFFF",

  icon: "#FFFFFF",
  iconMuted: "#BDBDBD",
  logo: "#FFFFFF",

  primary: "#2D9CDB",
  border: "#5A5A5A",

  inputBackground: "#4A4A4A",
  inputText: "#FFFFFF",
  inputPlaceholder: "#BDBDBD",
  inputBorder: "#6A6A6A",

  button: "#2D9CDB",
  buttonText: "#FFFFFF",

  secondaryButton: "#5A5F66",
  secondaryButtonText: "#FFFFFF",

  danger: "#D81E1E",
  dangerText: "#FFFFFF",

  progressBackground: "#555B63",
  overlay: "rgba(0,0,0,0.35)",

  shadow: "#000000",
};

type ThemeContextType = {
  darkMode: boolean;
  theme: Theme;
  toggleDarkMode: () => void;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const theme = useMemo<Theme>(() => {
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

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};