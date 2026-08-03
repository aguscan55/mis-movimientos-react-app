import { DarkTheme, DefaultTheme, ThemeProvider, Tabs } from 'expo-router';
import { Platform, useColorScheme } from 'react-native';
import { Home, List, CreditCard, User } from 'lucide-react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const bottomPadding = Platform.OS === 'android' ? 30 : 10;
  const tabHeight = Platform.OS === 'android' ? 86 : 64;

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#6C4DF6',
          tabBarInactiveTintColor: '#6B7280',
          tabBarStyle: {
            backgroundColor: isDark ? '#111827' : '#ffffff',
            borderTopWidth: 1,
            borderTopColor: isDark ? '#374151' : '#E5E7EB',
            height: tabHeight,
            paddingBottom: bottomPadding,
            paddingTop: 10,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginTop: 2,
          },
          tabBarItemStyle: {
            paddingBottom: 2,
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Inicio',
            tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="movements"
          options={{
            title: 'Movimientos',
            tabBarIcon: ({ color, size }) => <List color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="cards"
          options={{
            title: 'Tarjetas',
            tabBarIcon: ({ color, size }) => <CreditCard color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Perfil',
            tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}
