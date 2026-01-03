import { LayoutTabsBlocksField } from "@/components/fields/Section.group"
import { GlobalConfig } from "payload"
import { AboutBlocksField } from "./AboutBlocksField"

export const AboutPage: GlobalConfig = {
  slug: "about-page",
  label: "Биография",
  fields: [LayoutTabsBlocksField(AboutBlocksField)],
}
