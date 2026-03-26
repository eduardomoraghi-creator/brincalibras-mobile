/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors['light'] & keyof typeof Colors['dark']
) {
  // Garante que o theme nunca seja undefined
  const theme = useColorScheme() ?? 'light';

  // Prioridade para cores passadas via props
  const colorFromProps = props[theme];
  if (colorFromProps) return colorFromProps;

  // Fallback seguro caso Colors ou theme sejam undefined
  const safeColors = Colors?.[theme] ?? { [colorName]: '#6200ee' };

  return safeColors[colorName];
}