import React from "react"
import { getPayload } from "payload"
import config from "@/payload.config"
import { AboutPage as AboutPageType } from "@/payload-types"
import { GetBlockTypesFromTab } from "@/types/typeUtils"
import {
  NewLayoutedRenderer,
  TabLayout,
  TypedComponentsMap,
} from "@/components/layout/LayoutRenderer"
import { SimpleContentBlock } from "@/components/blocks/SimpleContentBlock"
import { SliderCardBlock } from "@/components/blocks/SliderCardBlock"
import { SliderWithCarouselBlock } from "@/components/blocks/SliderWithCarouselBlock"

type ReviewsPageBlockTypes = GetBlockTypesFromTab<AboutPageType>
const componentsMap: TypedComponentsMap<ReviewsPageBlockTypes> = {
  SimpleContentBlock,
  SliderCardBlock,
  SliderWithCarouselBlock,
}

export default async function AboutPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const aboutPage = await payload.findGlobal({ slug: "about-page" })

  return (
    <NewLayoutedRenderer<ReviewsPageBlockTypes, TabLayout<ReviewsPageBlockTypes>>
      componentsMap={componentsMap}
      layouts={aboutPage.layoutBlocks}
      getContent={(layout) => layout.content}
    />
  )
}
