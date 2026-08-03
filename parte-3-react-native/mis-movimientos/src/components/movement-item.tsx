import { StyleSheet, View } from 'react-native';
import { ArrowDown, ArrowUp } from 'lucide-react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { Movement } from '@/data/movements';
import { Spacing } from '@/constants/theme';

type MovementItemProps = {
  movement: Movement;
};

export default function MovementItem({ movement }: MovementItemProps) {
  const isIncome = movement.type === 'income';
  const amountColor = isIncome ? '#16A34A' : '#DC2626';

  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      <View style={styles.left}>
        <View style={[styles.badge, { backgroundColor: isIncome ? '#DCFCE7' : '#FEE2E2' }]}> 
          {isIncome ? <ArrowUp size={18} color="#16A34A" /> : <ArrowDown size={18} color="#DC2626" />}
        </View>
        <View style={styles.info}>
          <ThemedText type="small" themeColor="textSecondary">
            {new Date(movement.date).toLocaleDateString('es-AR', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </ThemedText>
        </View>
      </View>
      <ThemedText type="smallBold" style={[styles.amount, { color: amountColor }]}> 
        {isIncome ? '+' : '-'}${movement.amount.toLocaleString('es-AR')}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 16,
    padding: Spacing.four,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    marginRight: Spacing.four,
  },
  title: {
    marginBottom: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: Spacing.four,
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.three,
  },
});
