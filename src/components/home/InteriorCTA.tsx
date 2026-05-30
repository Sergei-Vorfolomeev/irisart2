import Image from "next/image"
import Link from "next/link"
import type { HomeImage } from "./homeData"

type InteriorCTAProps = {
  image: HomeImage
}

export function InteriorCTA({ image }: InteriorCTAProps) {
  return (
    <section className="boutique-interior">
      <div className="boutique-interior-media">
          {image.url ? (
            <Image
              src={image.url}
              alt={image.alt}
              fill
              sizes="100vw"
              className="object-cover opacity-55"
            />
          ) : (
            <div className="gallery-interior-placeholder" />
          )}
      </div>
      <div className="boutique-interior-copy">
        <p className="boutique-eyebrow">Private consulting</p>
        <h2>Подберем искусство под ваш интерьер</h2>
        <p>Поможем выбрать работу по размеру, цвету, настроению и задачам пространства.</p>
        <Link className="boutique-button boutique-button-light" href="/about">
          Получить подборку
        </Link>
      </div>
    </section>
  )
}
