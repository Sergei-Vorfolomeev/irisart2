import { LayoutTabsBlocksField } from "@/components/fields/Section.group"
import { GlobalConfig } from "payload"
import { GalleryBlocksField } from "./GalleryBlocksField"

export const GalleryPage: GlobalConfig = {
  slug: "gallery-page",
  label: "Галерея",
  fields: [LayoutTabsBlocksField(GalleryBlocksField)],
}
