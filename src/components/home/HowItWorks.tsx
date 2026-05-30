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
    <section className="boutique-section boutique-process">
      <div className="boutique-container">
        <div className="boutique-section-head">
          <div>
            <p className="boutique-eyebrow">Process</p>
            <h2>Как купить</h2>
          </div>
        </div>

        <div className="boutique-steps">
          {steps.map((step, index) => (
            <article className="boutique-step" key={step.title}>
              <span>0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
