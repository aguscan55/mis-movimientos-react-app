import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { ThemedText } from './themed-text'
import { ThemedView } from './themed-view'
import { Spacing, Colors } from '@/constants/theme'

export default function Header() {
  return (
    <ThemedView type="primary" style={styles.header}>
      <Pressable style={styles.iconBtn} accessibilityLabel="Abrir menú">
        <Text style={styles.icon}>☰</Text>
      </Pressable>
      <ThemedText type="title" style={styles.title}>Mis movimientos</ThemedText>
      <Pressable style={styles.iconBtn} accessibilityLabel="Ver notificaciones">
        <Text style={styles.icon}>🔔</Text>
      </Pressable>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  header: { width: '100%', paddingVertical: Spacing.five, paddingHorizontal: Spacing.three, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  iconBtn: { padding: 8 },
  icon: { color: Colors.surface, fontSize: 20 },
  title: { color: Colors.surface, fontSize: 18, textAlign: 'center' },
})