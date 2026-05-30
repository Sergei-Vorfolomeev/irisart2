"use client"

import React, { useState } from "react"
import { Media } from "@/payload-types"
import { motion } from "framer-motion"

type Props = {
  items: Media[]
  maxVisible?: number
}

export function OrbitSlider({ items, maxVisible = 5 }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<"next" | "prev">("next")

  if (!items.length) return null

  const allCount = Math.min(maxVisible, Math.max(1, items.length)) + 2
  const posOffset = 5
  const scaleOffset = 0.05
  const positions: Record<number, any> = {}

  for (let i = 0; i < allCount; i++) {
    if (i === 0) {
      positions[i] = { x: "-70%", y: "-40%", scale: 0.4, zIndex: 1, opacity: 0 }
    } else if (i === 1) {
      positions[i] = { x: "-35%", y: 0, scale: 1.2, zIndex: 50, opacity: 1 }
    } else if (i === allCount - 1) {
      positions[i] = {
        x: `${85 + i * posOffset}%`,
        y: `${30 - i * posOffset}%`,
        scale: Math.max(0.2, 0.55 - i * scaleOffset),
        zIndex: 50 - i,
        opacity: 0,
      }
    } else {
      positions[i] = {
        x: `${85 + i * posOffset}%`,
        y: `${40 - i * posOffset}%`,
        scale: Math.max(0.3, 0.55 - i * scaleOffset),
        zIndex: 50 - i,
        opacity: 1,
      }
    }
  }

  const slots = Array.from({ length: allCount }).map((_, i) => {
    const itemIndex = (currentIndex + i) % items.length
    return { ...items[itemIndex], posIndex: i }
  })

  const paginate = (dir: "next" | "prev") => {
    setDirection(dir)
    setCurrentIndex((prev) => {
      if (dir === "next") {
        return (prev + 1) % items.length
      } else {
        return (prev - 1 + items.length) % items.length
      }
    })
  }

  const getHover = (img: Media & { posIndex: number }) => {
    if ([0, 1, allCount - 1].includes(img.posIndex)) return
    return { y: `${25 - img.posIndex * posOffset}%` }
  }

  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <div className="relative flex-1 w-full flex items-center justify-center px-8">
        {slots.map((img) => (
          <motion.img
            key={img.id}
            src={img.url ?? ""}
            alt={img.alt ?? ""}
            initial={
              direction === "next" ? { y: 0, opacity: 0 } : { x: "-100%", y: "-20%", opacity: 0 }
            }
            animate={positions[img.posIndex]}
            exit={{ height: 0 }}
            custom={direction}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            whileHover={getHover(img)}
            className="absolute object-cover shadow-2xl"
            style={{ width: "30%", height: "60%", zIndex: positions[img.posIndex].zIndex }}
          />
        ))}
      </div>

      <div className="flex flex-row gap-3 mb-10">
        <button
          className="text-white bg-indigo-400 rounded-md py-2 px-4"
          onClick={() => paginate("prev")}
        >
          Back
        </button>
        <button
          className="text-white bg-indigo-400 rounded-md py-2 px-4"
          onClick={() => paginate("next")}
        >
          Next
        </button>
      </div>
    </div>
  )
}
