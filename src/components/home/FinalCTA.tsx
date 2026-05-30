import Link from "next/link"

export function FinalCTA() {
  return (
    <section className="bg-[#171411] px-5 py-24 text-center sm:px-8 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <p className="gallery-eyebrow text-[#b79867]">Iris Art</p>
        <h2 className="font-serif text-[clamp(2.4rem,5vw,5.4rem)] leading-none text-[#f7f0e7]">
          Начните коллекцию с одной работы
        </h2>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link className="gallery-button gallery-button-light" href="/gallery">
            Перейти в каталог
          </Link>
          <Link className="gallery-button gallery-button-dark" href="/about">
            Связаться с куратором
          </Link>
        </div>
      </div>
    </section>
  )
}
