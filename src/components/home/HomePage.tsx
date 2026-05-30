import type { Media } from "@/payload-types"
import { ArtistsSection } from "./ArtistsSection"
import { FeaturedArtworks } from "./FeaturedArtworks"
import { FinalCTA } from "./FinalCTA"
import { GalleryValues } from "./GalleryValues"
import { HeroSection } from "./HeroSection"
import { HowItWorks } from "./HowItWorks"
import { InteriorCTA } from "./InteriorCTA"
import { createArtists, createFeaturedArtworks, getHomeImages, getHomeMedia } from "./homeData"

type HomePageProps = {
  media: Media[]
}

export function HomePage({ media }: HomePageProps) {
  const heroMedia = getHomeMedia(media)
  const images = getHomeImages(heroMedia)
  const artworks = createFeaturedArtworks(images)
  const artists = createArtists(images)

  return (
    <>
      <HeroSection media={heroMedia} />
      <FeaturedArtworks artworks={artworks} />
      <ArtistsSection artists={artists} />
      <HowItWorks />
      <InteriorCTA image={images[0]} />
      <GalleryValues />
      <FinalCTA />
    </>
  )
}
