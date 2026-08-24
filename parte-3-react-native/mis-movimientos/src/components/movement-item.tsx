import { StyleSheet, View } from 'react-native';
import { ArrowDown, ArrowUp } from 'lucide-react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { Movement } from '@/data/movements';
import { Spacing, GlobalStyles, Colors } from '@/constants/theme';

type MovementItemProps = { movement: Movement; };

export default function MovementItem({ movement }: MovementItemProps) {
  const isIncome = movement.type === 'income';
  const amountColor = isIncome ? Colors.success : Colors.danger;

  return (
    <ThemedView type="backgroundElement" style={[GlobalStyles.card, styles.cardLayout]}>
      <View style={styles.left}>
        <View style={[styles.badge, { backgroundColor: isIncome ? Colors.successBg : Colors.dangerBg }]}> 
          {isIncome ? <ArrowUp size={18} color={Colors.success} /> : <ArrowDown size={18} color={Colors.danger} />}
        </View>
        <View style={styles.info}>
          <ThemedText type="small" themeColor="textSecondary">
            {new Date(movement.date).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' })}
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
  cardLayout: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  info: { flex: 1, marginRight: Spacing.four },
  amount: { fontSize: 16, fontWeight: '700' },
  left: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: Spacing.four },
  badge: { width: 40, height: 40, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.three },
});