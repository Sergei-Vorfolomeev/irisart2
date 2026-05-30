import Image from "next/image"
import Link from "next/link"
import type { FeaturedArtwork } from "./homeData"

type FeaturedArtworksProps = {
  artworks: FeaturedArtwork[]
}

export function FeaturedArtworks({ artworks }: FeaturedArtworksProps) {
  return (
    <section className="boutique-section boutique-featured">
      <div className="boutique-container">
        <div className="boutique-section-head">
          <div>
            <p className="boutique-eyebrow">Selection</p>
            <h2>Избранные работы</h2>
          </div>
          <Link className="boutique-text-link" href="/gallery">
            Все работы
          </Link>
        </div>

        <div className="boutique-art-grid">
          {artworks.map((artwork, index) => (
            <article className="boutique-art-card group" key={artwork.title}>
              <div className="boutique-art-image">
                {artwork.image.url ? (
                  <Image
                    src={artwork.image.url}
                    alt={artwork.image.alt}
                    fill
                    sizes="(min-width: 1280px) 31vw, (min-width: 768px) 45vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.035]"
                  />
                ) : (
                  <div className="gallery-image-placeholder" />
                )}
              </div>
              <div className="boutique-art-info">
                <span>0{index + 1}</span>
                <div>
                  <h3>{artwork.title}</h3>
                  <p>{artwork.artist}</p>
                </div>
                <p>{artwork.details}</p>
                <strong>{artwork.price}</strong>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
