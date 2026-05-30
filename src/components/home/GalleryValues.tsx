const values = [
  "Оригинальные работы",
  "Сертификат подлинности",
  "Кураторский отбор",
  "Доставка и упаковка",
]

export function GalleryValues() {
  return (
    <section className="bg-[#efe7dc] py-14">
      <div className="gallery-container">
        <div className="grid gap-6 border-y border-[#c9bba7] py-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <p
              className="text-sm uppercase leading-6 tracking-[0.18em] text-[#4c433a]"
              key={value}
            >
              {value}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
