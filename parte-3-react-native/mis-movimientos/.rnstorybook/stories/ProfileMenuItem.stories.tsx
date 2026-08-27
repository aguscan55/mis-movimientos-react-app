import { View } from 'react-native';
import { User, LogOut } from 'lucide-react-native';
import ProfileMenuItem from '../../src/components/profile-menu-item';
import { Colors } from '../../src/constants/theme';

export default {
  title: 'Componentes/ProfileMenuItem',
  component: ProfileMenuItem,
  decorators: [
    (Story) => (
      <View style={{ padding: 20, backgroundColor: Colors.surface, flex: 1, justifyContent: 'center' }}>
        <Story />
      </View>
    ),
  ],
};


export const Normal = {
  args: {
    icon: <User size={20} color={Colors.primary} />,
    title: 'Datos personales',
    onPress: () => console.log('Presionado: Datos personales'),
  },
};


export const Destructivo = {
  args: {
    icon: <LogOut size={20} color={Colors.danger} />,
    title: 'Cerrar sesión',
    isDestructive: true,
    onPress: () => console.log('Presionado: Cerrar sesión'),
  },
};