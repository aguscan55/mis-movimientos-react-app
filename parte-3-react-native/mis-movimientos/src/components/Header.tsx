import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { ThemedText } from './themed-text'
import { ThemedView } from './themed-view'
import { Spacing } from '@/constants/theme'

export default function Header() {
  return (
    <ThemedView type="primary" style={styles.header}>
      <Pressable style={styles.iconBtn} accessibilityLabel="Abrir menú">
        <Text style={styles.icon}>☰</Text>
      </Pressable>

      <ThemedText type="title" style={styles.title}>
        Mis movimientos
      </ThemedText>

      <Pressable style={styles.iconBtn} accessibilityLabel="Ver notificaciones">
        <Text style={styles.icon}>🔔</Text>
      </Pressable>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingVertical: Spacing.five,
    paddingHorizontal: Spacing.three,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconBtn: {
    padding: 8,
  },
  icon: {
    color: '#fff',
    fontSize: 20,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
})