import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/context/auth-context';

const API_URL = 'http://localhost:3000/api/cards';

export type Card = {
  id: number | string;
  holder: string;
  number: string;
  expiry: string;
};

type CardsContextType = {
  cards: Card[];
  isLoading: boolean;
  addCard: (card: Omit<Card, 'id'> & { cvv?: string }) => Promise<void>;
  refreshCards: () => Promise<void>;
};

const CardsContext = createContext<CardsContextType | null>(null);

export function CardsProvider({ children }: { children: ReactNode }) {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { user } = useAuth(); 

  const fetchCards = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      
      if (!token) return; 

      const response = await fetch(API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Error al cargar tarjetas');
      
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.error('Error cargando tarjetas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCards();
    } else {
      setCards([]);
      setIsLoading(false);
    }
  }, [user]);

  const addCard = async (newCard: Omit<Card, 'id'> & { cvv?: string }) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(newCard),
      });
      
      if (!response.ok) throw new Error('Error al guardar en el servidor');
      
      const data = await response.json();
      setCards((prevCards) => [data, ...prevCards]);
    } catch (error) {
      console.error('Error agregando tarjeta:', error);
      throw error;
    }
  };

  return (
    <CardsContext.Provider value={{ cards, isLoading, addCard, refreshCards: fetchCards }}>
      {children}
    </CardsContext.Provider>
  );
}

export function useCards() {
  const context = useContext(CardsContext);
  if (!context) {
    throw new Error('useCards debe ser usado dentro de un CardsProvider');
  }
  return context;
}