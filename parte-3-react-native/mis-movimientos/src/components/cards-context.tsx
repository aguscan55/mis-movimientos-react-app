import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useAuth } from '@/context/auth-context';
import { useApi } from '@/hooks/useApi';

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
  const { fetcher } = useApi();

  const fetchCards = useCallback(async () => {
    try {
      const data = await fetcher('/cards');
      setCards(data);
    } catch (error) {
      console.error('Error cargando tarjetas:', error);
    } finally {
      setIsLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    if (user) {
      fetchCards();
    } else {
      setCards([]);
      setIsLoading(false);
    }
  }, [user, fetchCards]);

  const addCard = async (newCard: Omit<Card, 'id'> & { cvv?: string }) => {
    try {
      const data = await fetcher('/cards', {
        method: 'POST',
        body: JSON.stringify(newCard),
      });
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