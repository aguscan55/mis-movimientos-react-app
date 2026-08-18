import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';
import MaskInput, { Masks } from 'react-native-mask-input';
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
  const [cvv, setCvv] = useState('');

  const isValid =
    holder.trim().length > 3 &&
    number.length === 16 &&
    expiry.length === 4 &&
    cvv.length >= 3;

  const handleSubmit = () => {
    if (!isValid) return;

    addCard({
      holder: holder.trim(),
      number: number,
      expiry: expiry,
      cvv: cvv
    });

    router.push('/cards');
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <ThemedText type="title" style={styles.title}>Agregar tarjeta</ThemedText>
      <ThemedText type="small" themeColor="textSecondary" style={styles.subtitle}>
        Ingresá los datos de tu tarjeta para vincularla a tu cuenta.
      </ThemedText>

      <View style={styles.field}>
        <ThemedText type="smallBold" style={styles.label}>Titular de la tarjeta</ThemedText>
        <TextInput
          style={styles.input}
          value={holder}
          onChangeText={setHolder}
          placeholder="Ej: Juan Perez"
          placeholderTextColor="#9CA3AF"
          autoCapitalize="words"
        />
      </View>

      <View style={styles.field}>
        <ThemedText type="smallBold" style={styles.label}>Número de tarjeta</ThemedText>
        <MaskInput
          style={styles.input}
          value={number}
          onChangeText={(masked, unmasked) => setNumber(unmasked)}
          mask={Masks.CREDIT_CARD}
          placeholder="0000 0000 0000 0000"
          placeholderTextColor="#9CA3AF"
          keyboardType="number-pad"
        />
      </View>

      <View style={styles.row}>
        <View style={[styles.field, { flex: 1 }]}>
          <ThemedText type="smallBold" style={styles.label}>Vencimiento</ThemedText>
          <MaskInput
            style={styles.input}
            value={expiry}
            onChangeText={(masked, unmasked) => setExpiry(unmasked)}
            mask={[/\d/, /\d/, '/', /\d/, /\d/]}
            placeholder="MM/AA"
            placeholderTextColor="#9CA3AF"
            keyboardType="number-pad"
          />
        </View>

        <View style={[styles.field, { flex: 1 }]}>
          <ThemedText type="smallBold" style={styles.label}>CVV</ThemedText>
          <TextInput
            style={styles.input}
            value={cvv}
            onChangeText={(value) => setCvv(value.replace(/[^0-9]/g, ''))}
            placeholder="123"
            placeholderTextColor="#9CA3AF"
            keyboardType="number-pad"
            maxLength={4}
            secureTextEntry
          />
        </View>
      </View>

      <Pressable
        style={[styles.button, !isValid && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={!isValid}
      >
        <ThemedText type="smallBold" style={styles.buttonText}>Vincular Tarjeta</ThemedText>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.four,
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  title: {
    marginBottom: Spacing.one,
  },
  subtitle: {
    marginBottom: Spacing.four,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.four,
    marginBottom: Spacing.four,
  },
  field: {
    marginBottom: Spacing.four,
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
    fontSize: 16,
  },
  button: {
    marginTop: 'auto',
    paddingVertical: 16,
    borderRadius: 999,
    backgroundColor: '#6C4DF6',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});