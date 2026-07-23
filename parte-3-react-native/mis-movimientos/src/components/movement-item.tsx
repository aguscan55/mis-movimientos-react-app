import { StyleSheet, Text, View } from 'react-native'
import type { Movement } from '@/data/movements'

type Props = {
  movement: Movement
}

const formatDate = (timestamp: number) =>
  new Date(timestamp).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

export default function MovementItem({ movement }: Props) {
  const isIncome = movement.type === 'income'

  return (
    <View style={styles.container}>
      <View style={[styles.iconBox, isIncome ? styles.iconIncome : styles.iconExpense]}>
        <Text style={styles.iconText}>{isIncome ? '↓' : '↑'}</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.title}>{movement.title}</Text>
        <Text style={styles.date}>{formatDate(movement.date)}</Text>
      </View>

      <Text style={[styles.amount, isIncome ? styles.amountIncome : styles.amountExpense]}>
        {isIncome ? '+' : '-'} ${movement.amount.toLocaleString('es-AR')}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconIncome: {
    backgroundColor: '#22C55E',
  },
  iconExpense: {
    backgroundColor: '#EF4444',
  },
  iconText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  details: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  date: {
    marginTop: 4,
    fontSize: 13,
    color: '#6B7280',
  },
  amount: {
    fontSize: 15,
    fontWeight: '700',
  },
  amountIncome: {
    color: '#22C55E',
  },
  amountExpense: {
    color: '#EF4444',
  },
})
