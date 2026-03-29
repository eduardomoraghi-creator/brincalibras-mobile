// src/contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

export type Theme = {
  background: string;
  header: string;
  logo: string;
  curve: string;
  card: string;
  border: string;
  footer: string;
  icon: string;
  text: string;
  banner: string;
};

const lightTheme: Theme = {
  background: "#D9D9D9",
  header: "#EAEAEA",
  logo: "#3A8FB7",
  curve: "#5DADE2",
  card: "#FFFFFF",
  border: "#3A8FB7",
  footer: "#FFFFFF",
  icon: "#3A8FB7",
  text: "#000000",
  banner: "#E91E63",
};

const darkTheme: Theme = {
  background: "#2F2F2F",
  header: "#3F3F3F",
  logo: "#FFFFFF",
  curve: "#5DADE2",
  card: "#EAEAEA",
  border: "transparent",
  footer: "#3F3F3F",
  icon: "#FFFFFF",
  text: "#FFFFFF",
  banner: "#880E4F",
};

type ThemeContextType = {
  darkMode: boolean;
  theme: Theme;
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  theme: lightTheme,
  toggleDarkMode: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider
      value={{ darkMode, theme: darkMode ? darkTheme : lightTheme, toggleDarkMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);