import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function MovementsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Movimientos</ThemedText>
      <ThemedText themeColor="textSecondary"></ThemedText>
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