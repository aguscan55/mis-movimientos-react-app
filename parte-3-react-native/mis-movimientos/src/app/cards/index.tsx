import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useCards } from '@/components/cards-context';
import { Spacing } from '@/constants/theme';

export default function CardsScreen() {
  const router = useRouter();
  const { cards } = useCards();

  const goToNewCard = () => {
    router.push('/cards/new');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Tarjetas
      </ThemedText>

      {cards.length === 0 ? (
        <ThemedView style={styles.emptyBox}>
          <ThemedText type="smallBold">No tienes tarjetas asignadas a tu cuenta.</ThemedText>
          <Pressable style={styles.button} onPress={goToNewCard}>
            <ThemedText type="smallBold" style={styles.buttonText}>
              Agregar tarjeta
            </ThemedText>
          </Pressable>
        </ThemedView>
      ) : (
        <View style={styles.cardList}>
          {cards.map((card) => (
            <ThemedView key={card.id} style={styles.cardItem}>
              <ThemedText type="smallBold" style={styles.cardHolder}>
                {card.holder}
              </ThemedText>
              <ThemedText type="small">**** **** **** {card.number.slice(-4)}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Vence {card.expiry}
              </ThemedText>
            </ThemedView>
          ))}

          <Pressable style={styles.addButton} onPress={goToNewCard}>
            <ThemedText type="smallBold" style={styles.buttonText}>
              Agregar tarjeta
            </ThemedText>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    marginBottom: Spacing.four,
  },
  emptyBox: {
    padding: Spacing.four,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    gap: Spacing.three,
  },
  cardList: {
    gap: Spacing.three,
  },
  cardItem: {
    padding: Spacing.four,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardHolder: {
    marginBottom: Spacing.one,
  },
  button: {
    marginTop: Spacing.four,
    paddingVertical: 12,
    paddingHorizontal: Spacing.four,
    borderRadius: 999,
    backgroundColor: '#6C4DF6',
    alignSelf: 'flex-start',
  },
  addButton: {
    marginTop: Spacing.four,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: '#6C4DF6',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
  },
});
