import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useCards } from '@/components/cards-context';
import { Spacing } from '@/constants/theme';

export default function NewCardScreen() {
  const router = useRouter();
  const { addCard } = useCards();
  const [holder, setHolder] = useState('');
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');

  const isValid = holder.trim().length > 0 && number.trim().length >= 16 && expiry.trim().length > 0;

  const handleSubmit = () => {
    if (!isValid) return;
    addCard({ holder: holder.trim(), number: number.trim(), expiry: expiry.trim() });
    router.push('/cards');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title" style={styles.title}>Agregar tarjeta</ThemedText>
      <ThemedText type="small" themeColor="textSecondary" style={styles.subtitle}>
        Ingresa los datos de tu tarjeta para agregarla a la cuenta.
      </ThemedText>

      <View style={styles.field}>
        <ThemedText type="smallBold" style={styles.label}>Titular</ThemedText>
        <TextInput
          style={styles.input}
          value={holder}
          onChangeText={setHolder}
          placeholder="Nombre del titular"
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <View style={styles.field}>
        <ThemedText type="smallBold" style={styles.label}>Número</ThemedText>
        <TextInput
          style={styles.input}
          value={number}
          onChangeText={(value) => setNumber(value.replace(/[^0-9]/g, ''))}
          placeholder="0000 0000 0000 0000"
          placeholderTextColor="#9CA3AF"
          keyboardType="number-pad"
          maxLength={16}
        />
      </View>

      <View style={styles.field}>
        <ThemedText type="smallBold" style={styles.label}>Vencimiento</ThemedText>
        <TextInput
          style={styles.input}
          value={expiry}
          onChangeText={setExpiry}
          placeholder="MM/AA"
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <Pressable
        style={[styles.button, !isValid && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={!isValid}
      >
        <ThemedText type="smallBold" style={styles.buttonText}>Guardar</ThemedText>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.four,
    flexGrow: 1,
    gap: Spacing.four,
    backgroundColor: '#ffffff',
  },
  title: {
    marginBottom: Spacing.one,
  },
  subtitle: {
    marginBottom: Spacing.four,
  },
  field: {
    gap: Spacing.two,
  },
  label: {
    marginBottom: Spacing.one,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    backgroundColor: '#F9FAFB',
    color: '#111827',
  },
  button: {
    marginTop: Spacing.four,
    paddingVertical: 14,
    borderRadius: 999,
    backgroundColor: '#6C4DF6',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#ffffff',
  },
});
