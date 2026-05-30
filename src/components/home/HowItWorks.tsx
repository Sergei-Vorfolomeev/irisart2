const steps = [
  {
    title: "Выберите работу",
    text: "Оставьте заявку на понравившуюся работу или подборку в нужном настроении.",
  },
  {
    title: "Получите консультацию куратора",
    text: "Уточним формат, интерьер, бюджет и покажем близкие по характеру варианты.",
  },
  {
    title: "Оформите покупку",
    text: "Подготовим документы, согласуем оплату и удобный способ передачи работы.",
  },
  {
    title: "Получите доставку и сертификат",
    text: "Организуем бережную упаковку, доставку и сертификат подлинности.",
  },
]

export function HowItWorks() {
  return (
    <section className="gallery-section bg-[#f7f3ec]">
      <div className="gallery-container">
        <div className="mb-12 max-w-2xl">
          <p className="gallery-eyebrow">Process</p>
          <h2 className="gallery-heading">Как купить</h2>
        </div>

        <div className="grid border-t border-[#c9bba7] md:grid-cols-4">
          {steps.map((step, index) => (
            <article className="step-card" key={step.title}>
              <span className="text-sm text-[#8c6b42]">0{index + 1}</span>
              <h3 className="mt-7 font-serif text-2xl leading-tight text-[#191512]">{step.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#62584e]">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
