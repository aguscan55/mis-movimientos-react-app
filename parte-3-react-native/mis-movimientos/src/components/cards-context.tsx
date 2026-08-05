import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type Card = {
  id: string;
  holder: string;
  number: string;
  expiry: string;
};

type CardsContextValue = {
  cards: Card[];
  addCard: (card: Omit<Card, 'id'>) => void;
};

const CardsContext = createContext<CardsContextValue | null>(null);

export function CardsProvider({ children }: { children: ReactNode }) {
  const [cards, setCards] = useState<Card[]>([]);

  const value = useMemo(
    () => ({
      cards,
      addCard: (card: Omit<Card, 'id'>) => {
        setCards((current) => [
          ...current,
          {
            ...card,
            id: String(Date.now()),
          },
        ]);
      },
    }),
    [cards]
  );

  return <CardsContext.Provider value={value}>{children}</CardsContext.Provider>;
}

export function useCards() {
  const context = useContext(CardsContext);
  if (!context) {
    throw new Error('useCards must be used within CardsProvider');
  }
  return context;
}
