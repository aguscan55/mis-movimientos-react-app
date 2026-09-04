import { DarkTheme, DefaultTheme, ThemeProvider, Tabs, Redirect, useSegments } from 'expo-router';
import { Platform, useColorScheme } from 'react-native';
import { Home, List, CreditCard, User, QrCode } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CardsProvider } from '@/components/cards-context';
import { AuthProvider, useAuth } from '@/context/auth-context';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const segments = useSegments();

  if (isLoading) return null; 

  const inAuthScreen = segments[0] === 'login' || segments[0] === 'register';

  if (!user && !inAuthScreen) {
    return <Redirect href="/login" />;
  }

  if (user && inAuthScreen) {
    return <Redirect href="/" />;
  }

  return <>{children}</>;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const insets = useSafeAreaInsets();
  
  const bottomPadding = Platform.OS === 'android' ? Math.max(insets.bottom, 12) : 10;
  const tabHeight = Platform.OS === 'android' ? 56 + bottomPadding : 64;

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <CardsProvider>
          <AuthGuard>
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
              <Tabs.Screen 
                name="login" 
                options={{ 
                  href: null,
                  tabBarStyle: { display: 'none' }
                }} 
              />
              <Tabs.Screen 
                name="register" 
                options={{ 
                  href: null, 
                  tabBarStyle: { display: 'none' } 
                }} 
              />
              <Tabs.Screen
                name="pago"
                options={{
                  title: 'Pago',
                  tabBarIcon: ({ color, size }) => <QrCode color={color} size={size} />,
                }}
              />
            </Tabs>
          </AuthGuard>
        </CardsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}