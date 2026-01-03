import { Carousel3dBlockConfig } from "@/components/blocks/Carousel3dBlock"
import { BlocksField } from "payload"

export const GalleryBlocksField: BlocksField = {
  name: "gallery-blocks-field",
  labels: { plural: "Галереи", singular: "Галерея" },
  type: "blocks",
  blocks: [Carousel3dBlockConfig],
}
