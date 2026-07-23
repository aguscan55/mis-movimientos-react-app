function MovementItem({ movement }) {
  const isIncome = movement.type === 'income'
  const amountClass = isIncome ? 'amount-income' : 'amount-expense'
  const iconClass = isIncome ? 'icon-income' : 'icon-expense'

  return (
    <li>
      <article className="movement-item">
        <div className={`icon-box ${iconClass}`}>{isIncome ? '↓' : '↑'}</div>
        <div className="movement-details">
          <h4>{movement.title}</h4>
          <time dateTime={new Date(movement.date).toISOString()}>
            {new Date(movement.date).toLocaleDateString('es-AR', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </time>
        </div>
        <div className={`movement-amount ${amountClass}`}>
          {isIncome ? '+' : '-'} ${movement.amount.toLocaleString('es-AR')}
        </div>
      </article>
    </li>
  )
}

export default MovementItem
