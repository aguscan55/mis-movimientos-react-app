import './App.css'

function App() {
  return ( // los class se cambian por className en React, ya que class es una palabra reservada en JS
    // tambien se cambia datetime por dateTime en React, ya que es case sensitive
    <div className="app-container">
        
        <header className="app-header">
            <button className="icon-btn" aria-label="Abrir menú">Abrir menú</button>
            <h1>Mis movimientos</h1>
            <button className="icon-btn" aria-label="Ver notificaciones">Ver notificaciones</button>
        </header>

        <main>
            <section className="balance-card">
                <div className="balance-info">
                    <p className="text-small">Saldo disponible</p>
                    <h2 className="balance-amount">$ 125.430,50</h2>
                    <p className="text-small">Última actualización: Hoy 09:40</p>
                </div>
                <button className="icon-btn" aria-label="Ocultar saldo">Ocultar saldo</button>
            </section>

            <section className="movements-section">
                <div className="section-title-row">
                    <h3>Movimientos recientes</h3>
                    <a href="#" className="link-primary">Ver todos</a>
                </div>

                <ul className="movements-list">
                    <li>
                        <article className="movement-item">
                            <div className="icon-box icon-income">↓</div>
                            <div className="movement-details">
                                <h4>Transferencia recibida</h4>
                                <time dateTime="2026-06-20">20 Jun 2026 - 09:15</time>
                            </div>
                            <div className="movement-amount amount-income">+ $15.000,00</div>
                        </article>
                    </li>
                    <li>
                        <article className="movement-item">
                            <div className="icon-box icon-expense">↑</div>
                            <div className="movement-details">
                                <h4>Pago en supermercado</h4>
                                <time dateTime="2026-06-21">21 Jun 2026 - 14:23</time>
                            </div>
                            <div className="movement-amount amount-expense">- $8.500,00</div>
                        </article>
                    </li>
                </ul>

                <button className="btn-outline"> Ver más movimientos</button>
            </section>
        </main>
        
    </div>
  )
}

export default App