function BalanceCard({ balance, showBalance, onToggleHide }) {
  return (
    <section className="balance-card">
      <div className="balance-info">
        <p className="text-small">Saldo disponible</p>
        <h2 className="balance-amount">
          {showBalance
            ? `$ ${balance.toLocaleString('es-AR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`
            : '••••••'}
        </h2>
        <p className="text-small">Última actualización: Hoy 09:40</p>
      </div>
      <button className="icon-btn" type="button" onClick={onToggleHide}>
        {showBalance ? 'Ocultar saldo' : 'Mostrar saldo'}
      </button>
    </section>
  )
}

export default BalanceCard
