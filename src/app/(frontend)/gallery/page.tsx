import React from "react"
import { getPayload } from "payload"
import config from "@/payload.config"
import { GalleryPage as GalleryPageType } from "@/payload-types"
import { GetBlockTypesFromTab } from "@/types/typeUtils"
import {
  NewLayoutedRenderer,
  TabLayout,
  TypedComponentsMap,
} from "@/components/layout/LayoutRenderer"
import { Carousel3dBlock } from "@/components/blocks/Carousel3dBlock"

type GalleryPageBlockTypes = GetBlockTypesFromTab<GalleryPageType>
const componentsMap: TypedComponentsMap<GalleryPageBlockTypes> = { Carousel3dBlock }

export default async function GalleryPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const galleryPage = await payload.findGlobal({ slug: "gallery-page" })

  return (
    <NewLayoutedRenderer<GalleryPageBlockTypes, TabLayout<GalleryPageBlockTypes>>
      componentsMap={componentsMap}
      layouts={galleryPage.layoutBlocks}
      getContent={(layout) => layout.content}
    />
  )
}
