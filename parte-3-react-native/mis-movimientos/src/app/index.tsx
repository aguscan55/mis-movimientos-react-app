import { useState, useMemo } from 'react'
import { Pressable, StyleSheet, Text, FlatList, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Eye, EyeOff } from 'lucide-react-native'

import MovementItem from '@/components/movement-item'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import Header from '@/components/Header'
import { BottomTabInset, MaxContentWidth, Spacing, GlobalStyles, Colors } from '@/constants/theme'
import { movements } from '@/data/movements'

export default function HomeScreen() {
  const [showBalance, setShowBalance] = useState(true)
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all')

  const filteredMovements = useMemo(() =>
    filter === 'all' ? movements : movements.filter((m) => m.type === filter),
    [filter]
  )

  const balance = useMemo(() =>
    movements.reduce((sum, m) => sum + (m.type === 'income' ? m.amount : -m.amount), 0),
    []
  )

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header />

        <ThemedView style={[GlobalStyles.card, styles.balanceCardLayout]}>
          <ThemedView>
            <ThemedText type="small" style={styles.caption}>Saldo disponible</ThemedText>
            <ThemedText style={styles.balanceText}>
              {showBalance
                ? `$ ${balance.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`
                : '••••••'}
            </ThemedText>
            <ThemedText type="small" style={styles.subtitle}>
              Última actualización: Hoy 09:40
            </ThemedText>
          </ThemedView>
          
          <Pressable
            style={[GlobalStyles.secondaryButton, styles.balanceButtonLayout]}
            onPress={() => setShowBalance((prev) => !prev)}
          >
            {showBalance ? <EyeOff size={18} color={Colors.text} /> : <Eye size={18} color={Colors.text} />}
            <Text style={styles.balanceButtonText}>{showBalance ? 'Ocultar saldo' : 'Mostrar saldo'}</Text>
          </Pressable>
        </ThemedView>

        <ThemedView style={styles.sectionHeader}>
          <ThemedText type="smallBold" style={styles.sectionTitle}>Movimientos recientes</ThemedText>
          <ThemedText type="link" style={styles.link}>Ver todos</ThemedText>
        </ThemedView>

        <ThemedView style={styles.filterRow}>
          {(['all', 'income', 'expense'] as const).map((f) => (
            <Pressable
              key={f}
              style={[
                GlobalStyles.secondaryButton,
                styles.filterBtnLayout,
                filter === f && styles.filterButtonActive
              ]}
              onPress={() => setFilter(f)}
            >
              <ThemedText
                type="smallBold"
                style={[styles.filterText, filter === f && styles.filterTextActive]}
              >
                {f === 'all' ? 'Todos' : f === 'income' ? 'Ingresos' : 'Egresos'}
              </ThemedText>
            </Pressable>
          ))}
        </ThemedView>

        <ThemedView style={styles.movementsList}>
          <FlatList
            style={styles.movementsScroll}
            data={filteredMovements}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <MovementItem movement={item} />}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            contentContainerStyle={{ paddingBottom: BottomTabInset + Spacing.four }}
          />
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', flexDirection: 'row' },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four, paddingTop: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  balanceCardLayout: { marginBottom: Spacing.four },
  caption: { color: Colors.textSecondary, marginBottom: 6 },
  balanceText: { fontSize: 28, fontWeight: '700', color: Colors.text, marginBottom: 8 },
  subtitle: { color: Colors.textSecondary },
  balanceButtonLayout: {
    marginTop: Spacing.three,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    gap: 8,
  },
  balanceButtonText: { color: Colors.text, fontWeight: '600' },
  sectionHeader: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.three },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.text },
  link: { color: Colors.primary, fontWeight: '600' },
  filterRow: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginBottom: Spacing.four },
  filterBtnLayout: { flex: 1 },
  filterButtonActive: { backgroundColor: Colors.primary },
  filterText: { color: Colors.text, fontWeight: '600' },
  filterTextActive: { color: Colors.surface },
  movementsList: { width: '100%', flex: 1 },
  movementsScroll: { flex: 1 },
});