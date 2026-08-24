import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useCards } from '@/components/cards-context';
import { Spacing, GlobalStyles, Colors } from '@/constants/theme';

export default function CardsScreen() {
  const router = useRouter();
  const { cards } = useCards();

  const goToNewCard = () => {
    router.push('/cards/new');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title" style={styles.title}>Tarjetas</ThemedText>

      {cards.length === 0 ? (
        <ThemedView type="surfaceMuted" style={styles.emptyBox}>
          <ThemedText type="smallBold">No tienes tarjetas asignadas a tu cuenta.</ThemedText>
          <Pressable
            style={[GlobalStyles.primaryButton, { alignSelf: 'flex-start' }]}
            onPress={goToNewCard}
          >
            <ThemedText type="smallBold" themeColor="surface">Agregar tarjeta</ThemedText>
          </Pressable>
        </ThemedView>
      ) : (
        <View style={styles.cardList}>
          {cards.map((card) => (
            <ThemedView key={card.id} style={GlobalStyles.card}>
              <ThemedText type="smallBold" style={styles.cardHolder}>{card.holder}</ThemedText>
              <ThemedText type="small">**** **** **** {card.number.slice(-4)}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">Vence {card.expiry}</ThemedText>
            </ThemedView>
          ))}

          <Pressable style={GlobalStyles.primaryButton} onPress={goToNewCard}>
            <ThemedText type="smallBold" themeColor="surface">Agregar tarjeta</ThemedText>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: Spacing.four, gap: Spacing.four },
  title: { marginBottom: Spacing.four },
  cardList: { gap: Spacing.three },
  cardHolder: { marginBottom: Spacing.one },
  emptyBox: {
    padding: Spacing.four,
    borderRadius: 16,
    gap: Spacing.three,
  },
});
