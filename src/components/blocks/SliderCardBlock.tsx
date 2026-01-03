import { ISliderCardBlock } from "@/payload-types"
import { Block } from "payload"
import React, { FC } from "react"
import Image from "next/image"
import { RichText } from "@payloadcms/richtext-lexical/react"
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"
import { Slider } from "../base/Slider"

export const SliderCardBlockConfig: Block = {
  slug: "SliderCardBlock",
  interfaceName: "ISliderCardBlock",
  labels: { singular: "Карточка-слайдер", plural: "Карточка-слайдер" },
  fields: [
    {
      name: "cards",
      label: "Карточки",
      type: "array",
      fields: [
        { name: "title", label: "Заголовок", type: "text" },
        { name: "description", label: "Описание", type: "richText" },
        { name: "img", label: "Картинка", type: "upload", relationTo: "media" },
      ],
    },
  ],
}

export const SliderCardBlock: FC<ISliderCardBlock> = ({ cards, blockName }) => {
  const items = cards?.map(({ id, img, title, description }) => (
    <div key={id} className="flex flex-col gap-8 w-screen">
      {title && <h3>{title}</h3>}
      <div className="flex gap-10">
        <div className="relative w-[300px] h-[300px] flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
          {img && typeof img !== "number" && img.url && (
            <Image src={img.url} alt={img.alt} fill className="object-contain" />
          )}
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
