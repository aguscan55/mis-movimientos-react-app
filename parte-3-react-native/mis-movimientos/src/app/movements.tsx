import { useState, useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export type MovementType = 'income' | 'expense';
export type FilterType = 'all' | 'income' | 'expense';

export type Movement = {
  id: number;
  title: string;
  date: number;
  amount: number;
  type: MovementType;
};

export const movements: Movement[] = [
  { id: 1, title: 'Transferencia recibida', date: 1781913600000, amount: 15000, type: 'income' },
  { id: 2, title: 'Pago en supermercado', date: 1782000000000, amount: 8500, type: 'expense' },
  { id: 3, title: 'Recarga celular', date: 1782086400000, amount: 2000, type: 'expense' },
  { id: 4, title: 'Devolución', date: 1782172800000, amount: 3200, type: 'income' },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export default function MovementsScreen() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');

  const filteredMovements = useMemo(() => {
    return movements.filter((item) => {
      if (selectedFilter === 'income') return item.type === 'income';
      if (selectedFilter === 'expense') return item.type === 'expense';
      return true;
    });
  }, [selectedFilter]);

  const summary = useMemo(() => {
    let total = 0;
    let label = 'Balance total';

    if (selectedFilter === 'all') {
      total = filteredMovements.reduce((acc, curr) => 
        curr.type === 'income' ? acc + curr.amount : acc - curr.amount
      , 0);
    } else {
      label = selectedFilter === 'income' ? 'Total de ingresos' : 'Total de egresos';
      total = filteredMovements.reduce((acc, curr) => acc + curr.amount, 0);
    }

    return { total, label };
  }, [filteredMovements, selectedFilter]);

  const renderItem = ({ item }: { item: Movement }) => {
    const isIncome = item.type === 'income';

    return (
      <View style={styles.movementItem}>
        <View style={styles.infoContainer}>
          <ThemedText style={styles.movementTitle}>{item.title}</ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.movementDate}>
            {formatDate(item.date)}
          </ThemedText>
        </View>

        <ThemedText
          style={[
            styles.amountText,
            isIncome ? styles.incomeText : styles.expenseText,
          ]}
        >
          {isIncome ? `+ ${formatCurrency(item.amount)}` : `- ${formatCurrency(item.amount)}`}
        </ThemedText>
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Movimientos</ThemedText>
        <ThemedText themeColor="textSecondary">
          Historial de tus ingresos y gastos
        </ThemedText>
      </View>

      {/* Selector de Filtros */}
      <View style={styles.filterContainer}>
        <Pressable
          style={[styles.filterChip, selectedFilter === 'all' && styles.filterChipActive]}
          onPress={() => setSelectedFilter('all')}
        >
          <ThemedText style={[styles.filterText, selectedFilter === 'all' && styles.filterTextActive]}>
            Todos
          </ThemedText>
        </Pressable>

        <Pressable
          style={[styles.filterChip, selectedFilter === 'income' && styles.filterChipActive]}
          onPress={() => setSelectedFilter('income')}
        >
          <ThemedText style={[styles.filterText, selectedFilter === 'income' && styles.filterTextActive]}>
            Ingresos
          </ThemedText>
        </Pressable>

        <Pressable
          style={[styles.filterChip, selectedFilter === 'expense' && styles.filterChipActive]}
          onPress={() => setSelectedFilter('expense')}
        >
          <ThemedText style={[styles.filterText, selectedFilter === 'expense' && styles.filterTextActive]}>
            Egresos
          </ThemedText>
        </Pressable>
      </View>

      {/* Tarjeta de Resumen */}
      <View style={styles.summaryCard}>
        <ThemedText themeColor="textSecondary" style={styles.summaryLabel}>
          {summary.label}
        </ThemedText>
        <ThemedText 
          style={[
            styles.summaryTotal, 
            selectedFilter === 'all' && summary.total < 0 && styles.expenseText
          ]}
        >
          {formatCurrency(summary.total)}
        </ThemedText>
      </View>

      {/* Lista de Movimientos */}
      <FlatList
        data={filteredMovements}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ThemedText themeColor="textSecondary">
              No hay movimientos para este filtro.
            </ThemedText>
          </View>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 16,
    gap: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.3)',
  },
  filterChipActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  summaryCard: {
    backgroundColor: 'rgba(150, 150, 150, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    gap: 4,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  summaryTotal: {
    fontSize: 28,
    fontWeight: '700',
  },
  listContent: {
    paddingBottom: 20,
  },
  movementItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  infoContainer: {
    gap: 4,
  },
  movementTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  movementDate: {
    fontSize: 13,
  },
  amountText: {
    fontSize: 16,
    fontWeight: '700',
  },
  incomeText: {
    color: '#2e7d32',
  },
  expenseText: {
    color: '#d32f2f',
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(150, 150, 150, 0.15)',
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
});