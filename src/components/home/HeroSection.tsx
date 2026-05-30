import Link from "next/link"
import type { Media } from "@/payload-types"
import { OrbitSlider3 } from "@/components/base/OrbitSlider3"

type HeroSectionProps = {
  media: Media[]
}

export function HeroSection({ media }: HeroSectionProps) {
  return (
    <section className="boutique-hero">
      <div className="boutique-hero-grid">
        <aside className="boutique-hero-rail" aria-hidden="true">
          <span>IRIS ART</span>
          <span>PRIVATE COLLECTION</span>
        </aside>

        <div className="boutique-hero-copy">
          <p className="boutique-eyebrow">CURATED ART COLLECTION</p>
          <h1>Искусство, которое становится частью пространства</h1>
          <p>
            Оригинальные работы, живопись и арт-объекты для частных интерьеров, коллекций и
            архитектурных проектов.
          </p>
          <div className="boutique-actions">
            <Link className="boutique-button boutique-button-dark" href="/gallery">
              Смотреть коллекцию
            </Link>
            <Link className="boutique-button boutique-button-ghost" href="/about">
              Подобрать работу
            </Link>
          </div>
        </div>

        <div className="boutique-hero-stage">
          <div className="boutique-stage-label">
            <span>01</span>
            <span>Salon View</span>
          </div>
          {media.length > 0 ? (
            <OrbitSlider3 items={media} className="home-orbit-slider" />
          ) : (
            <div className="boutique-empty-stage" />
          )}
        </div>
      </div>

      <div className="boutique-hero-meta">
        <span>Original works</span>
        <span>Certificate of authenticity</span>
        <span>Curatorial selection</span>
      </div>
    </section>
  )
}
