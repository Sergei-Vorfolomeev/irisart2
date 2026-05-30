import Link from "next/link"
import type { Media } from "@/payload-types"
import { OrbitSlider3 } from "@/components/base/OrbitSlider3"

type HeroSectionProps = {
  media: Media[]
}

export function HeroSection({ media }: HeroSectionProps) {
  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#ebe3d8]">
      <div className="absolute inset-0 opacity-95">
        <OrbitSlider3 items={media} className="home-orbit-slider" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(239,233,224,0.96)_0%,rgba(239,233,224,0.82)_37%,rgba(239,233,224,0.18)_72%,rgba(239,233,224,0)_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-[1440px] items-center px-5 py-20 sm:px-8 lg:px-16">
        <div className="max-w-[720px]">
          <p className="mb-7 text-[0.68rem] font-medium uppercase tracking-[0.36em] text-[#8c6b42]">
            CURATED ART COLLECTION
          </p>
          <h1 className="max-w-[760px] font-serif text-[clamp(2.7rem,7vw,6.8rem)] leading-[0.96] text-[#171411]">
            Искусство, которое становится частью пространства
          </h1>
          <p className="mt-8 max-w-[560px] text-[1rem] leading-8 text-[#514941] sm:text-[1.08rem]">
            Оригинальные работы, живопись и арт-объекты для частных интерьеров, коллекций и
            архитектурных проектов.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link className="gallery-button gallery-button-primary" href="/gallery">
              Смотреть коллекцию
            </Link>
            <Link className="gallery-button gallery-button-secondary" href="/about">
              Подобрать работу
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
