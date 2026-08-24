import '@/global.css';

import { Platform, StyleSheet } from 'react-native';

// 1. Fusionamos los colores de Expo (light/dark) con nuestra paleta global plana
export const Colors = {
  // --- Mantenemos light y dark para que funcionen ThemedText y ThemedView ---
  light: {
    primary: '#6C4DF6',
    text: '#111827',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#6B7280',
    surface: '#ffffff',
    surfaceMuted: '#F3F4F6',
  },
  dark: {
    primary: '#8C7BFF',
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
    surface: '#212225',
    surfaceMuted: '#2E3135',
  },

  // --- Agregamos la paleta plana para los nuevos componentes refactorizados ---
  primary: '#6C4DF6',
  background: '#ffffff',
  surface: '#ffffff',
  surfaceMuted: '#F3F4F6',
  text: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  inputBg: '#F9FAFB',
  success: '#16A34A',
  successBg: '#DCFCE7',
  danger: '#DC2626',
  dangerBg: '#FEE2E2',
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

// 2. Unificamos Spacing, BottomTabInset y MaxContentWidth (sin duplicados)
export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 12,
  four: 16,
  five: 20,
  six: 24,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

// 3. Estilos Globales Reutilizables
export const GlobalStyles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: Spacing.four,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  primaryButton: {
    paddingVertical: 14,
    paddingHorizontal: Spacing.four,
    borderRadius: 999,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: Colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
});