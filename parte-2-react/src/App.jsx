import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import BalanceCard from './components/BalanceCard'
import MovementItem from './components/MovementItem'

const movements = [
  { id: 1, title: 'Transferencia recibida', date: 1781913600000, amount: 15000, type: 'income' },
  { id: 2, title: 'Pago en supermercado', date: 1782000000000, amount: 8500, type: 'expense' },
  { id: 3, title: 'Recarga celular', date: 1782086400000, amount: 2000, type: 'expense' },
  { id: 4, title: 'Devolución', date: 1782172800000, amount: 3200, type: 'income' },
]

function App() {
  const [showBalance, setShowBalance] = useState(true)
  const [filter, setFilter] = useState('all')

  const filteredMovements =
    filter === 'all' ? movements : movements.filter((movement) => movement.type === filter)

  const balance = movements.reduce(
    (sum, movement) => sum + (movement.type === 'income' ? movement.amount : -movement.amount),
    0
  )
  return ( // los class se cambian por className en React, ya que class es una palabra reservada en JS
    // tambien se cambia datetime por dateTime en React, ya que es case sensitive
    <div className="app-container">
      <Header />

      <main>
        <BalanceCard
          balance={balance}
          showBalance={showBalance}
          onToggleHide={() => setShowBalance((prev) => !prev)}
        />

        <section className="movements-section">
          <div className="section-title-row">
            <h3>Movimientos recientes</h3>
            <a href="#" className="link-primary">
              Ver todos
            </a>
          </div>

          <div className="filter-row">
            <button
              type="button"
              className={filter === 'all' ? 'btn-primary' : 'btn-outline'}
              onClick={() => setFilter('all')}
            >
              Todos
            </button>
            <button
              type="button"
              className={filter === 'income' ? 'btn-primary' : 'btn-outline'}
              onClick={() => setFilter('income')}
            >
              Ingresos
            </button>
            <button
              type="button"
              className={filter === 'expense' ? 'btn-primary' : 'btn-outline'}
              onClick={() => setFilter('expense')}
            >
              Egresos
            </button>
          </div>

          <ul className="movements-list">
            {filteredMovements.map((movement) => (
              <MovementItem key={movement.id} movement={movement} />
            ))}
          </ul>

          <button className="btn-outline">Ver más movimientos</button>
        </section>
      </main>
    </div>
  )
}

export default App