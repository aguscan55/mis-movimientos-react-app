import { useState } from 'react'
import { StyleSheet, TextInput, Pressable, View, Alert, ActivityIndicator } from 'react-native'
import { router } from 'expo-router'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { Spacing, Colors } from '@/constants/theme'
import { useAuth } from '@/context/auth-context'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { login } = useAuth()

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Atención', 'Por favor completá todos los campos')
      return
    }

    setIsSubmitting(true)
    try {
      await login(email, password)
    } catch (error: any) {
      Alert.alert('Error al ingresar', error.message || 'Credenciales inválidas')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Iniciar sesión</ThemedText>
      <ThemedText style={styles.subtitle}>Qué bueno verte de nuevo</ThemedText>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor={Colors.textSecondary}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor={Colors.textSecondary}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Pressable 
          style={[styles.primaryButton, isSubmitting && styles.buttonDisabled]} 
          onPress={handleLogin}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <ThemedText style={styles.primaryButtonText}>Ingresar</ThemedText>
          )}
        </Pressable>
      </View>

      <Pressable style={styles.footer} onPress={() => router.push('/register')}>
        <ThemedText type="small">
          ¿No tenés cuenta? <ThemedText type="link" style={styles.link}>Registrate</ThemedText>
        </ThemedText>
      </Pressable>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.four, justifyContent: 'center' },
  title: { marginBottom: Spacing.one },
  subtitle: { color: Colors.textSecondary, marginBottom: Spacing.six },
  form: { gap: Spacing.four },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    color: Colors.text,
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  buttonDisabled: { opacity: 0.7 },
  primaryButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
  footer: { marginTop: Spacing.six, alignItems: 'center' },
  link: { color: Colors.primary, fontWeight: '700' },
})