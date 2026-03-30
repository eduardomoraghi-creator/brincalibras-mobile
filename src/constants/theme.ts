// src/constants/theme.ts
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
  banner: string; // ✅ adicione esta linha
};


export const Fonts = {
  regular: "System",
  bold: "System",
};
// Tema claro
export const lightTheme: Theme = {
  background: "#D9D9D9",
  header: "#EAEAEA",
  logo: "#3A8FB7",
  curve: "#5DADE2",
  card: "#FFFFFF",
  border: "#3A8FB7",
  footer: "#FFFFFF",
  icon: "#3A8FB7",
  text: "#000000",
  banner: "#E91E63", // cor do banner no tema claro
};

// Tema escuro
export const darkTheme: Theme = {
  background: "#2F2F2F",
  header: "#3F3F3F",
  logo: "#FFFFFF",
  curve: "#5DADE2",
  card: "#EAEAEA",
  border: "transparent",
  footer: "#3F3F3F",
  icon: "#FFFFFF",
  text: "#FFFFFF",
  banner: "#880E4F", // cor do banner no tema escuro
};