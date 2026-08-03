import { useState } from 'react'
import { Pressable, StyleSheet, Text, FlatList, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Eye, EyeOff } from 'lucide-react-native'

import MovementItem from '@/components/movement-item'
import { movements } from '@/data/movements'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import Header from '@/components/Header'
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme'

export default function HomeScreen() {
  const [showBalance, setShowBalance] = useState(true)
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all')

  const filteredMovements =
    filter === 'all' ? movements : movements.filter((movement) => movement.type === filter)

  const balance = movements.reduce(
    (sum, movement) => sum + (movement.type === 'income' ? movement.amount : -movement.amount),
    0
  )

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header />

        <ThemedView style={styles.balanceCard}>
          <ThemedView>
            <ThemedText type="small" themeColor="textSecondary" style={styles.caption}>
              Saldo disponible
            </ThemedText>
            <ThemedText style={styles.balanceText}>
              {showBalance
                ? `$ ${balance.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`
                : '••••••'}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary" style={styles.subtitle}>
              Última actualización: Hoy 09:40
            </ThemedText>
          </ThemedView>
          <Pressable style={styles.balanceButton} onPress={() => setShowBalance((prev) => !prev)}>
            {showBalance ? (
              <EyeOff size={18} color="#111827" />
            ) : (
              <Eye size={18} color="#111827" />
            )}
            <Text style={styles.balanceButtonText}>
              {showBalance ? 'Ocultar saldo' : 'Mostrar saldo'}
            </Text>
          </Pressable>
        </ThemedView>

        <ThemedView style={styles.sectionHeader}>
          <ThemedText type="smallBold" style={styles.sectionTitle}>
            Movimientos recientes
          </ThemedText>
          <ThemedText type="link" themeColor="primary" style={styles.link}>
            Ver todos
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.filterRow}>
          <Pressable
            style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
            onPress={() => setFilter('all')}
          >
            <ThemedText type="smallBold" style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
              Todos
            </ThemedText>
          </Pressable>
          <Pressable
            style={[styles.filterButton, filter === 'income' && styles.filterButtonActive]}
            onPress={() => setFilter('income')}
          >
            <ThemedText type="smallBold" style={[styles.filterText, filter === 'income' && styles.filterTextActive]}>
              Ingresos
            </ThemedText>
          </Pressable>
          <Pressable
            style={[styles.filterButton, filter === 'expense' && styles.filterButtonActive]}
            onPress={() => setFilter('expense')}
          >
            <ThemedText type="smallBold" style={[styles.filterText, filter === 'expense' && styles.filterTextActive]}>
              Egresos
            </ThemedText>
          </Pressable>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: Spacing.four,
    textAlign: 'center',
  },
  balanceCard: {
    width: '100%',
    padding: Spacing.four,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: Spacing.four,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  caption: {
    color: '#6B7280',
    marginBottom: 6,
  },
  balanceText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    color: '#6B7280',
  },
  balanceButton: {
    marginTop: Spacing.three,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#F3F4F6',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  balanceButtonText: {
    color: '#111827',
    fontWeight: '600',
  },
  sectionHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.three,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  link: {
    color: '#6C4DF6',
    fontWeight: '600',
  },
  filterRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: Spacing.four,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#6C4DF6',
  },
  filterText: {
    color: '#111827',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  movementsList: {
    width: '100%',
    flex: 1,
  },
  movementsScroll: {
    flex: 1,
  },
});
