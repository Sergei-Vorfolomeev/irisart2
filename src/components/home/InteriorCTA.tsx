import Image from "next/image"
import Link from "next/link"
import type { HomeImage } from "./homeData"

type InteriorCTAProps = {
  image: HomeImage
}

export function InteriorCTA({ image }: InteriorCTAProps) {
  return (
    <section className="gallery-section bg-[#f4efe7]">
      <div className="gallery-container">
        <div className="relative min-h-[560px] overflow-hidden bg-[#2b241e]">
          {image.url && (
            <Image
              src={image.url}
              alt={image.alt}
              fill
              sizes="100vw"
              className="object-cover opacity-55"
            />
          )}
          {!image.url && <div className="gallery-interior-placeholder" />}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(31,25,20,0.84),rgba(31,25,20,0.46),rgba(31,25,20,0.18))]" />
          <div className="relative z-10 flex min-h-[560px] max-w-2xl flex-col justify-end px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
            <p className="mb-5 text-[0.68rem] uppercase tracking-[0.34em] text-[#d8c29d]">
              Private consulting
            </p>
            <h2 className="font-serif text-[clamp(2.2rem,5vw,5rem)] leading-none text-[#f8f1e7]">
              Подберем искусство под ваш интерьер
            </h2>
            <p className="mt-7 text-base leading-8 text-[#eadfce]">
              Поможем выбрать работу по размеру, цвету, настроению и задачам пространства.
            </p>
            <Link className="gallery-button gallery-button-light mt-9 w-fit" href="/about">
              Получить подборку
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
