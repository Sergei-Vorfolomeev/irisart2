import Image from "next/image"
import Link from "next/link"
import type { FeaturedArtwork } from "./homeData"

type FeaturedArtworksProps = {
  artworks: FeaturedArtwork[]
}

export function FeaturedArtworks({ artworks }: FeaturedArtworksProps) {
  return (
    <section className="gallery-section bg-[#f4efe7]">
      <div className="gallery-container">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="gallery-eyebrow">Selection</p>
            <h2 className="gallery-heading">Избранные работы</h2>
          </div>
          <Link className="gallery-text-link" href="/gallery">
            Все работы
          </Link>
        </div>

        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
          {artworks.map((artwork) => (
            <article className="art-card group" key={artwork.title}>
              <div className="relative aspect-[4/5] overflow-hidden bg-[#e5ddd1]">
                {artwork.image.url && (
                  <Image
                    src={artwork.image.url}
                    alt={artwork.image.alt}
                    fill
                    sizes="(min-width: 1280px) 31vw, (min-width: 768px) 45vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.035]"
                  />
                )}
                {!artwork.image.url && <div className="gallery-image-placeholder" />}
              </div>
              <div className="pt-5">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <h3 className="font-serif text-2xl leading-tight text-[#191512]">{artwork.title}</h3>
                    <p className="mt-1 text-sm uppercase tracking-[0.18em] text-[#7a6d60]">
                      {artwork.artist}
                    </p>
                  </div>
                  <p className="text-right text-sm text-[#5f564d]">{artwork.price}</p>
                </div>
                <p className="mt-4 text-sm leading-6 text-[#665c52]">{artwork.details}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
