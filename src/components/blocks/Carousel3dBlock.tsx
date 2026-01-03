import { Block } from "payload"
import { FC } from "react"
import { ICarousel3D } from "@/payload-types"
import { Carousel3d } from "../base/Carousel3d"

export const Carousel3dBlockConfig: Block = {
  slug: "Carousel3dBlock",
  interfaceName: "ICarousel3D",
  labels: { singular: "Блок 3D-карусель", plural: "Блоки 3D-карусель" },
  fields: [
    {
      name: "imgs",
      label: "Изображения",
      type: "array",
      fields: [{ name: "img", label: "Картинка", type: "upload", relationTo: "media" }],
    },
  ],
}

export const Carousel3dBlock: FC<ICarousel3D> = ({ blockName, imgs }) => {
  return (
    <div className="flex flex-col gap-4">
      {blockName && <h1>{blockName}</h1>}
      <Carousel3d items={imgs ?? []} maxVisible={3} />
    </div>
  )
}
