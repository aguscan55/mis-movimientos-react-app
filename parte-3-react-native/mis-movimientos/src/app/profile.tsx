import { StyleSheet, View, ScrollView } from 'react-native'
import { User, Shield, HelpCircle, LogOut } from 'lucide-react-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import ProfileMenuItem from '@/components/profile-menu-item'
import { Spacing, GlobalStyles, Colors } from '@/constants/theme'

export default function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title" style={styles.pageTitle}>Mi Perfil</ThemedText>

      {/* COMBINAMOS LA CARD GLOBAL CON LOS ESTILOS LOCALES */}
      <ThemedView style={[GlobalStyles.card, styles.userCardLayout]}>
        <View style={styles.avatar}>
          <ThemedText style={styles.avatarText}>AC</ThemedText>
        </View>
        <View style={styles.userInfo}>
          <ThemedText type="smallBold" style={styles.userName}>Agustín Canteros</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">agustin.canteros@ejemplo.com</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">+54 11 1234-5678</ThemedText>
        </View>
      </ThemedView>

      {/* USAMOS LA CARD GLOBAL DIRECTAMENTE */}
      <ThemedView style={[GlobalStyles.card, { paddingHorizontal: Spacing.four, padding: 0 }]}>
        <ProfileMenuItem icon={<User size={20} color={Colors.primary} />} title="Datos personales" onPress={() => {}} />
        <ProfileMenuItem icon={<Shield size={20} color={Colors.primary} />} title="Seguridad y contraseña" onPress={() => {}} />
        <ProfileMenuItem icon={<HelpCircle size={20} color={Colors.primary} />} title="Centro de ayuda" onPress={() => {}} />
      </ThemedView>

      {/* USAMOS LA CARD GLOBAL DIRECTAMENTE */}
      <View style={[GlobalStyles.card, { paddingHorizontal: Spacing.four, padding: 0 }]}>
        <ProfileMenuItem icon={<LogOut size={20} color={Colors.danger} />} title="Cerrar sesión" onPress={() => {}} isDestructive />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { padding: Spacing.four, gap: Spacing.four, paddingBottom: Spacing.six },
  pageTitle: { marginBottom: Spacing.two },
  userCardLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.four,
  },
  avatar: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: Colors.primary, // Color centralizado
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: Colors.surface, fontSize: 20, fontWeight: '700' },
  userInfo: { flex: 1, gap: 2 },
  userName: { fontSize: 18 },
})