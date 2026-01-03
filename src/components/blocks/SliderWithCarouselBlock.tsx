import { ISliderWithCarouselBlock, Media } from "@/payload-types"
import { Block } from "payload"
import { FC } from "react"
import { Slider } from "../base/Slider"
import { RichText } from "@payloadcms/richtext-lexical/react"
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"
import Image from "next/image"
import { Carousel3d } from "../base/Carousel3d"

export const SliderWithCarouselBlockConfig: Block = {
  slug: "SliderWithCarouselBlock",
  dbName: "sliderCarousel",
  interfaceName: "ISliderWithCarouselBlock",
  labels: { singular: "Карточка-слайдер с каруселью", plural: "Карточка-слайдер с каруселью" },
  fields: [
    {
      name: "cards",
      label: "Карточки",
      type: "array",
      fields: [
        { name: "title", label: "Заголовок", type: "text" },
        { name: "description", label: "Описание", type: "richText" },
        {
          name: "imgs",
          label: "Карточки",
          type: "array",
          fields: [{ name: "img", label: "Картинка", type: "upload", relationTo: "media" }],
        },
      ],
    },
  ],
}

export const SliderWithCarouselBlock: FC<ISliderWithCarouselBlock> = ({ blockName, cards }) => {
  const items = cards?.map(({ id, imgs, title, description }) => (
    <div key={id} className="flex flex-col gap-8 w-screen">
      {title && <h3>{title}</h3>}
      <div className="flex gap-10">
        <div className="relative flex-shrink-0 w-1/2">
          <Carousel3d items={imgs ?? []} />
        </div>
        <RichText data={description as SerializedEditorState} />
      </div>
    </div>
  ))

  return (
    <div className="flex flex-col gap-8">
      {blockName && <h2>{blockName}</h2>}
      <Slider items={items} />
    </div>
  )
}
