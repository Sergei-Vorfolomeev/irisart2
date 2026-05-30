import Image from "next/image"
import Link from "next/link"
import type { ArtistPreview } from "./homeData"

type ArtistsSectionProps = {
  artists: ArtistPreview[]
}

export function ArtistsSection({ artists }: ArtistsSectionProps) {
  return (
    <section className="boutique-section boutique-artists">
      <div className="boutique-container">
        <div className="boutique-section-head">
          <div>
            <p className="boutique-eyebrow">Artists</p>
            <h2>Художники</h2>
          </div>
        </div>

        <div className="boutique-artist-list">
          {artists.map((artist) => (
            <article className="boutique-artist-row group" key={artist.name}>
              <div className="boutique-artist-image">
                {artist.image.url ? (
                  <Image
                    src={artist.image.url}
                    alt={artist.image.alt}
                    fill
                    sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover grayscale-[18%] transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                  />
                ) : (
                  <div className="gallery-image-placeholder gallery-image-placeholder-portrait" />
                )}
              </div>
              <div>
                <h3>{artist.name}</h3>
                <p>{artist.description}</p>
              </div>
              <Link className="boutique-text-link" href="/gallery">
                Смотреть работы
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
