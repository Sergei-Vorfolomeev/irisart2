import type { Media } from "@/payload-types"

export type HomeImage = {
  alt: string
  url?: string | null
}

export type FeaturedArtwork = {
  title: string
  artist: string
  details: string
  price: string
  image: HomeImage
}

export type ArtistPreview = {
  name: string
  description: string
  image: HomeImage
}

const imageExtensionPattern = /\.(avif|gif|jpe?g|png|webp)$/i

export const isImageMedia = (item: Media): item is Media & { url: string } => {
  if (typeof item === "number" || !item.url) return false

  if (item.mimeType) {
    return item.mimeType.startsWith("image/")
  }

  return imageExtensionPattern.test(item.url)
}

export const getHomeMedia = (media: Media[]): Media[] => media.filter(isImageMedia)

export const getHomeImages = (media: Media[]): HomeImage[] =>
  media.filter(isImageMedia).map((item) => ({
    url: item.url,
    alt: item.alt || "Работа из коллекции Iris Art",
  }))

const placeholderImage = (alt: string): HomeImage => ({ alt })

const pickImage = (images: HomeImage[], index: number, alt: string): HomeImage =>
  images[index] ?? placeholderImage(alt)

export const createFeaturedArtworks = (images: HomeImage[]): FeaturedArtwork[] => [
  {
    title: "Тихий свет",
    artist: "Анна Ветрова",
    details: "Холст, масло / 2025",
    price: "Цена по запросу",
    image: pickImage(images, 0, "Абстрактная живопись в теплой палитре"),
  },
  {
    title: "Слой воздуха",
    artist: "Михаил Серов",
    details: "Смешанная техника / 2024",
    price: "180 000 ₽",
    image: pickImage(images, 1, "Современная живопись для интерьера"),
  },
  {
    title: "После полудня",
    artist: "Елена Марк",
    details: "Акрил, фактура / 2026",
    price: "Цена по запросу",
    image: pickImage(images, 2, "Фрагмент авторской работы"),
  },
]

export const createArtists = (images: HomeImage[]): ArtistPreview[] => [
  {
    name: "Анна Ветрова",
    description: "Работает с мягкой абстракцией и живописными поверхностями для спокойных интерьеров.",
    image: pickImage(images, 3, "Портрет художника"),
  },
  {
    name: "Михаил Серов",
    description: "Исследует архитектурный ритм, свет и тактильность в больших форматах.",
    image: pickImage(images, 4, "Портрет художника"),
  },
  {
    name: "Елена Марк",
    description: "Создает камерные работы с тонкой цветовой драматургией и ощущением личной истории.",
    image: pickImage(images, 1, "Портрет художника"),
  },
  {
    name: "Ирис Ланская",
    description: "Соединяет графику, объект и живопись в выразительные коллекционные серии.",
    image: pickImage(images, 2, "Портрет художника"),
  },
]
