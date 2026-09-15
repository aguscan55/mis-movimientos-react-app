import { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Pressable, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing, GlobalStyles, Colors } from '@/constants/theme';
import { useAuth } from '@/context/auth-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3000/api';

const TestInversorView = ({ onCompleteTest }: { onCompleteTest: () => void }) => (
  <View style={styles.centerContainer}>
    <ThemedText type="title" style={{ textAlign: 'center', marginBottom: 20 }}>
      Perfil de Inversor
    </ThemedText>
    <ThemedText style={{ textAlign: 'center', marginBottom: 30, color: Colors.textSecondary }}>
      Aún no conocemos tu perfil de riesgo. Realizá el test de inversor para empezar a multiplicar tu dinero.
    </ThemedText>
    <Pressable style={GlobalStyles.primaryButton} onPress={onCompleteTest}>
      <ThemedText type="smallBold" themeColor="surface">Hacer test ahora</ThemedText>
    </Pressable>
  </View>
);

const InversionesActivasView = ({ 
  onInvest, 
  totalInvested, 
  isInvesting 
}: { 
  onInvest: (amount: string) => void, 
  totalInvested: number, 
  isInvesting: boolean 
}) => {
  const [amount, setAmount] = useState('');

  return (
    <View style={styles.centerContainer}>
      <ThemedText type="title" style={{ marginBottom: 10 }}>Fondo Común</ThemedText>
      <ThemedText style={{ color: Colors.textSecondary, marginBottom: 20 }}>
        Rendimiento anual estimado: 85%
      </ThemedText>
      
      {/* Tarjeta con el total invertido */}
      <ThemedView style={styles.balanceCard}>
        <ThemedText style={{ color: Colors.textSecondary, marginBottom: 5 }}>Total Invertido</ThemedText>
        <ThemedText type="title" style={{ color: Colors.primary }}>
          $ {totalInvested.toLocaleString('es-AR')}
        </ThemedText>
      </ThemedView>

      <TextInput
        style={styles.input}
        placeholder="$ 0.00"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        placeholderTextColor={Colors.textSecondary}
      />
      
      <Pressable 
        style={[GlobalStyles.primaryButton, { width: '100%', opacity: isInvesting ? 0.7 : 1 }]} 
        onPress={() => {
          onInvest(amount);
          setAmount('');
        }}
        disabled={isInvesting}
      >
        <ThemedText type="smallBold" themeColor="surface">
          {isInvesting ? 'Procesando...' : 'Invertir dinero'}
        </ThemedText>
      </Pressable>
    </View>
  );
};

export default function InversionesScreen() {
  const { user, completeTest } = useAuth();
  const [totalInvested, setTotalInvested] = useState(0);
  const [isInvesting, setIsInvesting] = useState(false);

  // Trae los movimientos, filtra las inversiones y suma el total
  const fetchTotalInvested = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/movements`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const movements = await response.json();
        const total = movements
          .filter((m: any) => m.title === 'Inversion fondo comun' && m.type === 'expense')
          .reduce((acc: number, curr: any) => acc + Number(curr.amount), 0);
        setTotalInvested(total);
      }
    } catch (error) {
      console.error("Error al cargar inversiones:", error);
    }
  };

  // Se ejecuta cuando carga la pantalla si el usuario ya tiene el perfil de inversor
  useEffect(() => {
    if (user?.has_investor_profile) {
      fetchTotalInvested();
    }
  }, [user?.has_investor_profile]);

  // Maneja la creación del movimiento de egreso
  const handleInvest = async (amount: string) => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return Alert.alert("Error", "Ingresá un monto válido mayor a 0");
    }

    setIsInvesting(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/movements`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: "Inversion fondo comun",
          amount: Number(amount),
          type: "expense" // Guarda el registro como egreso
        })
      });

      if (response.ok) {
        Alert.alert("¡Éxito!", `Invertiste $${amount} exitosamente.`);
        fetchTotalInvested(); // Actualiza el total visible al instante
      } else {
        Alert.alert("Error", "No se pudo registrar la inversión.");
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema de conexión.");
    } finally {
      setIsInvesting(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      {user?.has_investor_profile 
        ? <InversionesActivasView onInvest={handleInvest} totalInvested={totalInvested} isInvesting={isInvesting} />
        : <TestInversorView onCompleteTest={completeTest} />
      }
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.four, backgroundColor: Colors.background },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  balanceCard: {
    backgroundColor: Colors.surface,
    padding: 20,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  input: {
    backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border,
    borderRadius: 12, padding: 16, fontSize: 24, textAlign: 'center',
    width: '100%', marginBottom: 20, color: Colors.text,
  },
});