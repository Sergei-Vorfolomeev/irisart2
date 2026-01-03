import { ISimpleContentBlock, Media } from "@/payload-types"
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"
import { RichText } from "@payloadcms/richtext-lexical/react"
import { Block } from "payload"
import { FC } from "react"
import Image from "next/image"

export const SimpleContentBlockConfig: Block = {
  slug: "SimpleContentBlock",
  labels: { singular: "Блок с контентом и картинкой", plural: "Блоки с контентом и картинкой" },
  interfaceName: "ISimpleContentBlock",
  fields: [
    { name: "title", label: "Заголовок", type: "text" },
    { name: "img", label: "Картинка", type: "upload", relationTo: "media" },
    { name: "content", label: "Содержимое", type: "richText" },
    {
      name: "layout",
      label: "Расположение",
      type: "select",
      options: [
        { label: "Картинка | Содержимое", value: "img-content" },
        { label: "Содержимое | Картинка", value: "content-img" },
      ],
      defaultValue: "img-content",
    },
  ],
}

export const SimpleContentBlock: FC<ISimpleContentBlock> = ({ title, img, content, layout }) => {
  return (
    <div className="flex flex-col flex-gap gap-10">
      <h2 className="text-4xl font-semibold text-center">{title}</h2>
      <div
        className="flex gap-10"
        style={{ flexDirection: layout === "img-content" ? "row" : "row-reverse" }}
      >
        <div className="relative flex-shrink-0 w-[600px] h-[600px] overflow-hidden rounded-xl">
          {img && typeof img !== "number" && img.url && (
            <Image src={img.url} alt={img.alt || ""} fill className="object-cover" sizes="600px" />
          )}
        </div>
        <RichText data={content as SerializedEditorState} />
      </div>
    </div>
  )
}
