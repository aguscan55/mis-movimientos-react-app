import { StyleSheet, View, ScrollView } from 'react-native'
import { User, Shield, HelpCircle, LogOut } from 'lucide-react-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import ProfileMenuItem from '@/components/profile-menu-item'
import { Spacing } from '@/constants/theme'

export default function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title" style={styles.pageTitle}>
        Mi Perfil
      </ThemedText>

      <ThemedView style={styles.userCard}>
        <View style={styles.avatar}>
          <ThemedText style={styles.avatarText}>AC</ThemedText>
        </View>
        <View style={styles.userInfo}>
          <ThemedText type="smallBold" style={styles.userName}>Agustín Canteros</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">agustin.canteros@ejemplo.com</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">+54 11 1234-5678</ThemedText>
        </View>
      </ThemedView>

      <ThemedView style={styles.menuSection}>
        <ProfileMenuItem
          icon={<User size={20} color="#6C4DF6" />}
          title="Datos personales"
          onPress={() => {}}
        />
        <ProfileMenuItem
          icon={<Shield size={20} color="#6C4DF6" />}
          title="Seguridad y contraseña"
          onPress={() => {}}
        />
        <ProfileMenuItem
          icon={<HelpCircle size={20} color="#6C4DF6" />}
          title="Centro de ayuda"
          onPress={() => {}}
        />
      </ThemedView>

      <View style={styles.logoutSection}>
        <ProfileMenuItem
          icon={<LogOut size={20} color="#EF4444" />}
          title="Cerrar sesión"
          onPress={() => {}}
          isDestructive
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.four,
    gap: Spacing.four,
    paddingBottom: Spacing.six,
  },
  pageTitle: {
    marginBottom: Spacing.two,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.four,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    gap: Spacing.four,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6C4DF6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
  },
  userInfo: {
    flex: 1,
    gap: 2,
  },
  userName: {
    fontSize: 18,
  },
  menuSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: Spacing.four,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  logoutSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: Spacing.four,
    marginTop: Spacing.two,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
})