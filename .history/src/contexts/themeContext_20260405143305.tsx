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
  primary: string;
  button?: string;
  buttonText?: string;
};

const lightTheme: Theme = {
  background: "#FFFFFF",
  header: "#3A8FB7",
  logo: "#3A8FB7",
  curve: "#5DADE2",
  card: "#FFFFFF",
  border: "#3A8FB7",
  footer: "#FFFFFF",
  icon: "#3A8FB7",
  text: "#000000",
  banner: "#E91E63",
  primary: "#3A8FB7",
  button: "#3A8FB7",
  buttonText: "#FFFFFF",
};

const darkTheme: Theme = {
  background: "#2F2F2F",
  header: "#3A8FB7",
  logo: "#FFFFFF",
  curve: "#5DADE2",
  card: "#EAEAEA",
  border: "transparent",
  footer: "#3F3F3F",
  icon: "#FFFFFF",
  text: "#FFFFFF",
  banner: "#880E4F",
  primary: "#2D9CDB",
  button: "#EAEAEA",
  buttonText: "#2D9CDB",
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
      value={{
        darkMode,
        theme: darkMode ? darkTheme : lightTheme,
        toggleDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
\
export const useTheme = () => useContext(ThemeContext);