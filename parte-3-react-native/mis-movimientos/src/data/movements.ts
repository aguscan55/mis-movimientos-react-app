export type MovementType = 'income' | 'expense'

export type Movement = {
  id: number
  title: string
  date: number
  amount: number
  type: MovementType
}

export const movements: Movement[] = [
  { id: 1, title: 'Transferencia recibida', date: 1781913600000, amount: 15000, type: 'income' },
  { id: 2, title: 'Pago en supermercado', date: 1782000000000, amount: 8500, type: 'expense' },
  { id: 3, title: 'Recarga celular', date: 1782086400000, amount: 2000, type: 'expense' },
  { id: 4, title: 'Devolución', date: 1782172800000, amount: 3200, type: 'income' },
]
