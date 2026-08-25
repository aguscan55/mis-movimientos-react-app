import React from 'react'
import { StyleSheet, Pressable, View } from 'react-native'
import { ChevronRight } from 'lucide-react-native'
import { ThemedText } from './themed-text'
import { Spacing, Colors } from '@/constants/theme'

type Props = {
  icon: React.ReactNode,
  title: string,
  onPress: () => void,
  isDestructive?: boolean
}

export default function ProfileMenuItem({ icon, title, onPress, isDestructive }: Props) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.leftContent}>
        <View style={[styles.iconBox, isDestructive && styles.iconBoxDestructive]}>
          {icon}
        </View>
        <ThemedText type="smallBold" style={[styles.title, isDestructive && styles.titleDestructive]}>
          {title}
        </ThemedText>
      </View>
      {!isDestructive && <ChevronRight size={20} color={Colors.textSecondary} />}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: Colors.border },
  leftContent: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  iconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: Colors.surfaceMuted, alignItems: 'center', justifyContent: 'center' },
  iconBoxDestructive: { backgroundColor: Colors.dangerBg },
  title: { color: Colors.text },
  titleDestructive: { color: Colors.danger },
})