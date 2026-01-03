"use client"
import React from "react"
import { tw } from "@/utils/tailwind"

type ExtButtonProps = {
  size?: ButtonSize
  variant?: ButtonVariant
  squared?: boolean
}

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ExtButtonProps

export type ButtonVariant = "primary" | "secondary" | "accent" | "white" | "whiteAccent" | "link"
export type ButtonSize = "64" | "56" | "48" | "40" | "32"

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, variant = "primary", size = "48", squared, className, ...buttonProps } = props

  const variantsStyle: Record<ButtonVariant, string> = {
    primary: tw`bg-black text-white hover:bg-green-002`,
    secondary: tw`bg-green-mute-01 text-black hover:bg-[#CFDAD8]`,
    accent: tw`bg-green-01 text-white hover:bg-green-002`,
    whiteAccent: tw`bg-white text-green-01 hover:text-green-002 hover:bg-green-mute-01`,
    white: tw`bg-white text-black hover:text-white hover:bg-black`,
    link: tw`bg-transparent text-black hover:bg-green-mute-01`,
  }

  const disabledStyle = tw`bg-[#E2EAE8] text-[#828D8B] cursor-not-allowed`

  const sizesStyle: Record<ButtonSize, string> = {
    "32": tw`h-[32px] rounded-[12px] px-[8px] text-[14px] ${squared ? "w-[32px]" : ""}`,
    "40": tw`h-[40px] rounded-4 px-[12px] text-[16px] ${squared ? "w-[40px]" : ""}`,
    "48": tw`h-[48px] rounded-4 px-[16px] text-[18px] font-medium ${squared ? "w-[48px]" : ""}`,
    "56": tw`h-[56px] rounded-4 px-[24px] text-[18px] font-medium ${squared ? "w-[56px]" : ""}`,
    "64": tw`h-[64px] rounded-4 px-[24px] text-[18px] font-medium ${squared ? "w-[64px]" : ""}`,
  }

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (buttonProps.disabled) return
  }
  return (
    <button
      {...buttonProps}
      className={`flex gap-[8px] items-center justify-center transition-colors duration-150 ${sizesStyle[size]} ${buttonProps.disabled ? disabledStyle : variantsStyle[variant]} ${className} `}
    >
      {children}
    </button>
  )
}
