import { tw } from "@/utils/tailwind"
import React from "react"

export type SectionVariant = "full" | "centered"
export type SectionBg = "green" | "base" | "white" | "none" | "greenMute"

type SectionProps = { variant?: SectionVariant; bg?: SectionBg }

const Section: React.FC<React.PropsWithChildren<SectionProps>> = (props) => {
  const { children, bg = "base", variant = "centered" } = props

  const variantClassNames: Record<SectionVariant, string> = {
    centered: tw`w-full mx-auto`,
    full: tw`w-full p-[16px]`,
  }

  const bgClassNames: Record<SectionBg, string> = {
    base: tw`bg-background-01`,
    green: tw`bg-background-02`,
    white: tw`bg-white`,
    none: tw`bg-transparent`,
    greenMute: tw`bg-[var(--color-green-mute-01)]`,
  }

  return (
    <div className={`${variantClassNames[variant]} ${bgClassNames[bg]}`}>
      {variant == "full" ? (
        <>{children}</>
      ) : (
        <div className="max-w-[1400px] mx-auto py-[16px]">{children}</div>
      )}
    </div>
  )
}

export default Section
