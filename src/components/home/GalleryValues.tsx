const values = [
  "Оригинальные работы",
  "Сертификат подлинности",
  "Кураторский отбор",
  "Доставка и упаковка",
]

export function GalleryValues() {
  return (
    <section className="boutique-values">
      <div className="boutique-container">
        <div className="boutique-values-grid">
          {values.map((value) => (
            <p key={value}>
              {value}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
