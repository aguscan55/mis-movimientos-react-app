import { View } from 'react-native';
import MovementItem from '../../src/components/movement-item';

export default {
  title: 'Componentes/MovementItem',
  component: MovementItem,
  // simula el fondo de la app y le da padding
  decorators: [
    (Story) => (
      <View style={{ padding: 20, backgroundColor: '#F3F4F6', flex: 1, justifyContent: 'center' }}>
        <Story />
      </View>
    ),
  ],
};

// simulando un ingreso de dinero
export const Ingreso = {
  args: {
    movement: {
      id: 1,
      description: 'Transferencia recibida',
      amount: 115000.50,
      type: 'income',
      date: 1718885700000, // Timestamp de ejemplo
    },
  },
};

// simulando un egreso de dinero
export const Egreso = {
  args: {
    movement: {
      id: 2,
      description: 'Pago en supermercado',
      amount: 58500.00,
      type: 'expense',
      date: 1718972100000,
    },
  },
};