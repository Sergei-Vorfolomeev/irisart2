export type TypedOptions<Options extends string> = { label: string; value: Options }[]

export type GetBlockTypes<Blocks extends object[] | undefined | null> = Blocks extends object[]
  ? Blocks[number] extends { blockType: string }
    ? Blocks[number]["blockType"]
    : never
  : never

export type GetBlockTypesFromTab<
  T,
  Layout extends string = "layoutBlocks",
  Tab extends string = "content",
> = T extends { [L in Layout]?: infer LayoutBlocks }
  ? LayoutBlocks extends Array<{ [K in Tab]?: infer Content }>
    ? Content extends { blocks?: Array<{ blockType: infer BlockType }> | null }
      ? BlockType
      : never
    : never
  : never
