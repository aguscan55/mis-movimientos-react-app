import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  addCard: (card: Omit<Card, 'id'>) => Promise<void>;
  refreshCards: () => Promise<void>;
};

const CardsContext = createContext<CardsContextType | null>(null);

export function CardsProvider({ children }: { children: ReactNode }) {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCards = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.error('Error cargando tarjetas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Carga inicial al abrir la app
  useEffect(() => {
    fetchCards();
  }, []);

  const addCard = async (newCard: Omit<Card, 'id'>) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCard),
      });
      
      if (!response.ok) throw new Error('Error al guardar en el servidor');
      
      const data = await response.json();
      // Agregamos la tarjeta nueva al estado para que se actualice la pantalla al instante
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