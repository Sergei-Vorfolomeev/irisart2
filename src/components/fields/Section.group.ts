import { BlocksField, GroupField } from "payload"
import { Position } from "@/components/fields/Position.field"
import { TypedOptions } from "@/types/typeUtils"
import { SectionBg, SectionVariant } from "@/components/layout/Section"

export const SectionGroup: GroupField = {
  name: "section",
  type: "group",
  interfaceName: "ISectionProps",
  fields: [
    // {
    //   name: "imgs",
    //   type: "array",
    //   fields: [
    //     { name: "img", type: "upload", relationTo: "media" },
    //     {
    //       type: "row",
    //       fields: [
    //         { ...Position, label: "Позиция изображения" },
    //         { name: "offsetX", type: "number", label: "Смещение изображения X" },
    //         { name: "offsetY", type: "number", label: "Смещение изображения Y" },
    //         { name: "zIndex", type: "number", label: "Z-индекс" },
    //       ],
    //     },
    //   ],
    // },
    {
      name: "variant",
      // enumName:"section_variant", // TODO add enumName
      type: "select",
      options: [
        { label: "Во всю ширину", value: "full" },
        { label: "По центру", value: "centered" },
      ] satisfies TypedOptions<SectionVariant>,
    },
    {
      name: "bg",
      // enumName: "section_bg", // TODO add enumName
      type: "select",
      options: [
        { label: "Основной", value: "base" },
        { label: "Зеленый", value: "green" },
        { label: "Белый", value: "white" },
        { label: "Болотный", value: "greenMute" },
      ] satisfies TypedOptions<SectionBg>,
    },
    { name: "blured", type: "checkbox", label: "Блюр фона" },
    { name: "zIndex", type: "number", label: "Z-индекс" },
    {
      type: "row",
      fields: [
        { name: "topOffset", type: "number", label: "Отступ сверху" },
        { name: "bottomOffset", type: "number", label: "Отступ снизу" },
      ],
    },

    // {
    //   type: "row",
    //   fields: [
    //     { name: "leftOffset", type: "number", label: "Отступ слева" },
    //     { name: "bottomOffset", type: "number", label: "Отступ справа" },
    //   ],
    // },
  ],
}

export const LayoutTabsBlocksField = (blockFld: BlocksField): BlocksField => ({
  name: "layoutBlocks",
  type: "blocks",
  labels: { plural: "Секции", singular: "Секция" },
  label: "Секции",
  blocks: [
    {
      slug: "section",
      fields: [
        {
          type: "tabs",
          tabs: [
            {
              name: "content",
              label: "Контент",
              fields: [{ name: "blocks", type: "blocks", blocks: blockFld.blocks }],
            },
            {
              name: "section",
              label: "Настройки секции",
              fields: SectionGroup.fields,
              interfaceName: SectionGroup.interfaceName,
            },
          ],
        },
      ],
    },
    {
      slug: "halfsection",
      fields: [
        {
          type: "tabs",
          tabs: [
            {
              name: "content",
              label: "Контент",
              fields: [
                {
                  name: "ratio",
                  type: "radio",
                  enumName: "row_ratio",
                  interfaceName: "IRowRatio",
                  admin: { layout: "horizontal" },
                  options: [
                    { value: "50/50", label: "50% | 50%" },
                    { value: "33/66", label: "33% | 66%" },
                    { value: "66/33", label: "66% | 33%" },
                  ],
                },
                { name: "block1", type: "blocks", blocks: blockFld.blocks, maxRows: 1 },
                { name: "block2", type: "blocks", blocks: blockFld.blocks, maxRows: 1 },
              ],
            },
            {
              name: "section",
              label: "Настройки секции",
              fields: SectionGroup.fields,
              interfaceName: SectionGroup.interfaceName,
            },
          ],
        },
      ],
    },
  ],
})
