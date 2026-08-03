import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function CardsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Tarjetas</ThemedText>
      <ThemedText themeColor="textSecondary">tarjetas vinculadas a la cuenta</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});