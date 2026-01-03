import type { IRowRatio, ISectionProps, Media } from "@/payload-types"
import Section from "./Section"
import React, { PropsWithChildren } from "react"
import { tw } from "@/utils/tailwind"

// TODO сделать разделение section и halfsection
type RenderableContent<BT extends string> = {
  blocks?: Array<{ blockType: BT; id?: number | string | undefined | null }> | null
  block1?: Array<{ blockType: BT; id?: number | string | undefined | null }> | null
  block2?: Array<{ blockType: BT; id?: number | string | undefined | null }> | null
  ratio?: IRowRatio
} | null

export type TabLayout<BT extends string> = {
  section?: ISectionProps | null
  content?: RenderableContent<BT>
  blockType: "section" | "halfsection"
  id?: number | string | undefined | null
}
export type GroupLayout<BT extends string> = {
  section?: ISectionProps | null
  blockType: "section" | "halfsection" | "third"
  id?: number | string | undefined | null
} & RenderableContent<BT>

type LayoutedRendererProps<BT extends string, Layouts extends TabLayout<BT> | GroupLayout<BT>> = {
  getContent: (layout: Layouts) => RenderableContent<BT> | undefined | null
  componentsMap: TypedComponentsMap<BT>
  layouts: Array<Layouts> | null | undefined
}

export type TypedComponentsMap<T extends string> = { [BT in T]: React.FC<{ blockType: BT }> }

type SectionBlocksRendererProps<BT extends string> = {
  content: RenderableContent<BT> | undefined | null
  componentsMap: TypedComponentsMap<BT>
  skipSections?: boolean
}

export const SectionBlocksRenderer = <BT extends string>({
  content,
  componentsMap,
  skipSections,
}: SectionBlocksRendererProps<BT>) => {
  return (
    <div className="flex flex-col gap-10 h-full w-full">
      {!!content?.blocks?.length &&
        content.blocks.map((block, index) => {
          const Cmp = componentsMap[block.blockType] as React.FC<object>
          if (!Cmp) {
            console.warn(`Component not found for blockType "${block.blockType}"`)
            return null
          }
          return skipSections ? (
            <Cmp key={block.id} {...block} />
          ) : (
            <Section key={block.id} bg={index ? "white" : "green"}>
              <Cmp {...block} />
            </Section>
          )
        })}
    </div>
  )
}

export const SingleLayoutSection: React.FC<PropsWithChildren<ISectionProps>> = ({
  bg,
  blured,
  bottomOffset,
  topOffset,
  variant,
  children,
}) => {
  const offsets: React.CSSProperties = {}
  if (bottomOffset) {
    if (bottomOffset > 0) offsets.paddingBottom = bottomOffset
    else offsets.marginBottom = bottomOffset
  }
  if (topOffset) {
    if (topOffset > 0) offsets.paddingTop = topOffset
    else offsets.marginTop = topOffset
  }
  return (
    <div
      style={offsets}
      className={`relative rounded-4 ${blured ? "backdrop-blur-[15px] bg-white/40" : ""}`}
    >
      {/* {imgs?.map((img) => {
        const offset: OffsetOptions = { offsetX: img.offsetX, offsetY: img.offsetY }
        return (
          <PositionedImg
            key={img.id}
            img={img.img as Media}
            position={img.position}
            offset={offset}
            // zIndex={img.zIndex}
          />
        )
      })} */}
      <Section variant={variant ?? "centered"} bg={bg ?? "none"}>
        <div className="relative py-5">{children}</div> {" "}
      </Section>
    </div>
  )
}

export const NewLayoutedRenderer = <
  BT extends string,
  Blocks extends TabLayout<BT> | GroupLayout<BT>,
>(
  props: LayoutedRendererProps<BT, Blocks>,
) => {
  const { layouts: blocks, componentsMap } = props

  return (
    !!blocks?.length &&
    blocks.map((block) => {
      const { blockType } = block
      if (blockType == "section") {
        const content = props.getContent(block)
        return (
          <SingleLayoutSection key={block.id} {...block.section}>
            <SectionBlocksRenderer
              content={content}
              componentsMap={componentsMap}
              skipSections={true}
            />
          </SingleLayoutSection>
        )
      } else if (blockType == "halfsection") {
        const inferTab = (block: GroupLayout<BT> | TabLayout<BT>): block is TabLayout<BT> =>
          !!(block as TabLayout<BT>).content
        const inferGroup = (block: GroupLayout<BT> | TabLayout<BT>): block is GroupLayout<BT> =>
          !!(block as GroupLayout<BT>).block1

        const { block1, block2, ratio } =
          inferTab(block) && block.content
            ? block.content
            : inferGroup(block) && block.block1 && block.block2
              ? block
              : { block1: null, block2: null, ratio: null }

        if (!block1 || !block2 || !ratio) return <></>

        const ratioMap: Record<NonNullable<IRowRatio>, [string, string]> = {
          "33/66": [tw`flex-1`, tw`flex-2`],
          "50/50": [tw`flex-1`, tw`flex-1`],
          "66/33": [tw`flex-2`, tw`flex-1`],
        }
        return (
          <SingleLayoutSection key={block.id} {...block.section}>
            <div className="flex gap-[20px] items-stretch justify-between">
              <div className={`${ratioMap[ratio][0]} min-w-0`}>
                <SectionBlocksRenderer
                  content={{ blocks: block1 }}
                  componentsMap={componentsMap}
                  skipSections={true}
                />
              </div>

              <div className={`${ratioMap[ratio][1]} min-w-0`}>
                <SectionBlocksRenderer
                  content={{ blocks: block2 }}
                  componentsMap={componentsMap}
                  skipSections={true}
                />
              </div>
            </div>
          </SingleLayoutSection>
        )
      }
    })
  )
}

/** Использовать для отладки блоков и пропсов */
export const ToJson: React.FC<object> = (props) => (
  <div className="mt-[300px]">
    <Section bg="white">
      <pre>{JSON.stringify(props, null, 2)}</pre> {" "}
    </Section>
  </div>
)
