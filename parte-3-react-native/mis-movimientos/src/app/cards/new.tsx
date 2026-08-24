import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';
import MaskInput, { Masks } from 'react-native-mask-input';
import { ThemedText } from '@/components/themed-text';
import { useCards } from '@/components/cards-context';
import { Spacing, GlobalStyles, Colors } from '@/constants/theme';

export default function NewCardScreen() {
  const router = useRouter();
  const { addCard } = useCards();

  const [holder, setHolder] = useState('');
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const isValid = holder.trim().length > 3 && number.length === 16 && expiry.length === 4 && cvv.length >= 3;

  const handleSubmit = () => {
    if (!isValid) return;
    addCard({ holder: holder.trim(), number, expiry, cvv });
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
          placeholderTextColor={Colors.textSecondary}
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
          placeholderTextColor={Colors.textSecondary}
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
            placeholderTextColor={Colors.textSecondary}
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
            placeholderTextColor={Colors.textSecondary}
            keyboardType="number-pad"
            maxLength={4}
            secureTextEntry
          />
        </View>
      </View>

      <Pressable
        style={[GlobalStyles.primaryButton, styles.submitBtnLayout, !isValid && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={!isValid}
      >
        <ThemedText type="smallBold" style={styles.buttonText}>Vincular Tarjeta</ThemedText>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: Spacing.four, flexGrow: 1, backgroundColor: Colors.background },
  title: { marginBottom: Spacing.one },
  subtitle: { marginBottom: Spacing.four },
  row: { flexDirection: 'row', gap: Spacing.four, marginBottom: Spacing.four },
  field: { marginBottom: Spacing.four },
  label: { marginBottom: Spacing.one },
  input: {
    borderWidth: 1, borderColor: Colors.border, borderRadius: 12,
    paddingHorizontal: Spacing.four, paddingVertical: Spacing.three,
    backgroundColor: Colors.inputBg, color: Colors.text, fontSize: 16,
  },
  submitBtnLayout: { marginTop: 'auto' }, // Alineamos al fondo
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: Colors.surface, fontSize: 16 },
});