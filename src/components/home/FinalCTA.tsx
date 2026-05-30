import Link from "next/link"

export function FinalCTA() {
  return (
    <section className="boutique-final">
      <div>
        <p className="boutique-eyebrow">Iris Art</p>
        <h2>
          Начните коллекцию с одной работы
        </h2>
        <div className="boutique-actions">
          <Link className="boutique-button boutique-button-light" href="/gallery">
            Перейти в каталог
          </Link>
          <Link className="boutique-button boutique-button-outline-light" href="/about">
            Связаться с куратором
          </Link>
        </div>
      </div>
    </section>
  )
}
