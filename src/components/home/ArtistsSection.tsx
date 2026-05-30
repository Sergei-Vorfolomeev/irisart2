import Image from "next/image"
import Link from "next/link"
import type { ArtistPreview } from "./homeData"

type ArtistsSectionProps = {
  artists: ArtistPreview[]
}

export function ArtistsSection({ artists }: ArtistsSectionProps) {
  return (
    <section className="gallery-section bg-[#efe7dc]">
      <div className="gallery-container">
        <div className="mb-12 max-w-2xl">
          <p className="gallery-eyebrow">Artists</p>
          <h2 className="gallery-heading">Художники</h2>
        </div>

        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {artists.map((artist) => (
            <article className="artist-card group" key={artist.name}>
              <div className="relative aspect-[3/4] overflow-hidden bg-[#ded3c4]">
                {artist.image.url && (
                  <Image
                    src={artist.image.url}
                    alt={artist.image.alt}
                    fill
                    sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover grayscale-[18%] transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                  />
                )}
                {!artist.image.url && <div className="gallery-image-placeholder gallery-image-placeholder-portrait" />}
              </div>
              <h3 className="mt-5 font-serif text-2xl text-[#191512]">{artist.name}</h3>
              <p className="mt-3 text-sm leading-7 text-[#5f564d]">{artist.description}</p>
              <Link className="gallery-text-link mt-5 inline-flex" href="/gallery">
                Смотреть работы
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
