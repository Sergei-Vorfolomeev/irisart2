import type { CollectionConfig } from "payload"

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "type",
      type: "select",
      options: [
        { label: "Акварель", value: "watercolour" },
        { label: "Масло", value: "oil" },
        { label: "Керамика", value: "ceramics" },
      ],
      required: true,
    },
  ],
  upload: true,
}
