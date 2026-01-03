import { TypedOptions } from "@/types/typeUtils"
import { SelectField } from "payload"

export type PositioningOptions =
  | "bottom-center"
  | "bottom-left"
  | "bottom-right"
  | "center-center"
  | "center-left"
  | "center-right"
  | "top-center"
  | "top-left"
  | "top-right"

// TODO add dbName
export const Position: SelectField = {
  name: "position",
  type: "select",
  // enumName:"position",
  interfaceName: "IPositionField",
  options: [
    { label: "По центру", value: "center-center" },
    { label: "По центру слева", value: "center-left" },
    { label: "По центру справа", value: "center-right" },
    { label: "Снизу по середине", value: "bottom-center" },
    { label: "Снизу слева", value: "bottom-left" },
    { label: "Снизу справа", value: "bottom-right" },
    { label: "Сверху по середине", value: "top-center" },
    { label: "Сверху слева", value: "top-left" },
    { label: "Сверху справа", value: "top-right" },
  ] satisfies TypedOptions<PositioningOptions>,
  label: "Положение",
}

export interface OffsetOptions {
  offsetX?: number | null
  offsetY?: number | null
}
