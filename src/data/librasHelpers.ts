import { LIBRAS_SYMBOLS, LibrasSymbol } from "./librasSymbols";

export function shuffleArray<T>(items: T[]): T[] {
  const array = [...items];

  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

export function getAllLibrasSymbols(): LibrasSymbol[] {
  return LIBRAS_SYMBOLS;
}

export function getDictionaryItems(): LibrasSymbol[] {
  return LIBRAS_SYMBOLS.filter((item) => item.estatico);
}

export function getRandomLibrasSymbols(quantity: number): LibrasSymbol[] {
  return shuffleArray(LIBRAS_SYMBOLS).slice(0, quantity);
}