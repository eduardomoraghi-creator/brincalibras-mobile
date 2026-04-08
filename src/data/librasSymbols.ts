import { ImageSourcePropType } from "react-native";

export type LibrasCategoria = "palavra" | "alfabeto";
export type LibrasMidiaTipo = "imagem" | "youtube";

export type LibrasSymbol = {
  id: string;
  palavra: string;

  categoria: LibrasCategoria;
  tipo: LibrasMidiaTipo;
  imagem?: ImageSourcePropType;
  videoId?: string;
};

export const LIBRAS_SYMBOLS: LibrasSymbol[] = [
  // PALAVRAS DO DICIONÁRIO
  {
    id: "casa",
    palavra: "Casa",
    categoria: "palavra",
    tipo: "youtube",
    videoId: "utIm6zbAg38",
  },

]