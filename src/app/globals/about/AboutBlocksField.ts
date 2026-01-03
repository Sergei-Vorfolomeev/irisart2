import { SimpleContentBlockConfig } from "@/components/blocks/SimpleContentBlock"
import { SliderCardBlockConfig } from "@/components/blocks/SliderCardBlock"
import { SliderWithCarouselBlockConfig } from "@/components/blocks/SliderWithCarouselBlock"
import { BlocksField } from "payload"

export const AboutBlocksField: BlocksField = {
  name: "about-blocks-field",
  labels: { plural: "Биографии", singular: "Биография" },
  type: "blocks",
  blocks: [SimpleContentBlockConfig, SliderCardBlockConfig, SliderWithCarouselBlockConfig],
}
