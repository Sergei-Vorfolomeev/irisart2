"use client"

import { Media } from "@/payload-types"
import { motion } from "framer-motion"
import React, { FC, useState } from "react"
import { ArrowLeft, ArrowRight } from "./Icons"
import Image from "next/image"

type Props = {
  items?: {
    img?: number | Media | null | undefined
    id?: string | null
  }[]
  maxVisible?: number
}

export const Carousel3d: FC<Props> = ({ items = [], maxVisible = 3 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<"next" | "prev">("next")

  if (!items.length) return null

  const allCount = Math.min(maxVisible, Math.max(1, items.length)) + 2
  const centerPos = Math.ceil(maxVisible / 2)
  const posOffset = 40
  const scaleOffset = 0.12

  // позиции слотов
  const positions: Record<number, any> = {}
  for (let i = 0; i < allCount; i++) {
    if (i === 0) {
      positions[i] = { x: `-${posOffset * 2}%`, scale: 0.4, zIndex: 1, opacity: 0 }
    } else if (i === allCount - 1) {
      positions[i] = { x: `${posOffset * 2}%`, scale: 0.4, zIndex: 1, opacity: 0 }
    } else if (i === centerPos) {
      positions[i] = { x: "0%", scale: 1, zIndex: 50, opacity: 1 }
    } else if (i < centerPos) {
      positions[i] = {
        x: `${-posOffset * (centerPos - i)}%`,
        scale: 1 - scaleOffset * (centerPos - i),
        zIndex: 40 - (centerPos - i),
        opacity: 1,
      }
    } else {
      positions[i] = {
        x: `${posOffset * (i - centerPos)}%`,
        scale: 1 - scaleOffset * (i - centerPos),
        zIndex: 40 - (i - centerPos),
        opacity: 1,
      }
    }
  }

  // вычисляем слоты с циклическими хвостами
  const slots = Array.from({ length: allCount }).map((_, posIndex) => {
    let itemIndex: number
    let id: string | undefined

    if (posIndex === 0) {
      // левый скрытый элемент = крайний справа
      itemIndex = (currentIndex + maxVisible - 1) % items.length
      id = `${items[itemIndex].id}_left-hidden`
    } else if (posIndex === allCount - 1) {
      // правый скрытый элемент = крайний слева
      itemIndex = currentIndex % items.length
      id = `${items[itemIndex].id}_right-hidden`
    } else {
      // обычные элементы
      itemIndex = (currentIndex + posIndex - 1) % items.length
      id = items[itemIndex].id ?? `item-${itemIndex}`
    }

    return { ...items[itemIndex], posIndex, id }
  })

  const paginate = (dir: "next" | "prev") => {
    setDirection(dir)
    setCurrentIndex((prev) =>
      dir === "next" ? (prev + 1) % items.length : (prev - 1 + items.length) % items.length,
    )
  }

  return (
    <div className="flex flex-col justify-between items-center gap-2 h-full">
      <div className="relative flex justify-center items-center w-full min-h-[400px] overflow-hidden">
        {slots.map((slot) => {
          if (!slot.img || typeof slot.img === "number" || !slot.img.url) return null
          return (
            <motion.div
              key={slot.id}
              className="absolute w-[40%] h-[90%] rounded-[12px] -translate-x-1/2 -translate-y-1/2 bg-gray-200"
              animate={positions[slot.posIndex]}
              initial={
                direction === "next" ? { x: "100%", opacity: 0 } : { x: "-100%", opacity: 0 }
              }
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Image
                src={slot.img.url}
                alt={slot.img.alt ?? ""}
                fill
                className="object-contain rounded-[12px] shadow-lg"
              />
            </motion.div>
          )
        })}
      </div>

      <div className="flex flex-row gap-3 mt-auto">
        <button onClick={() => paginate("prev")}>
          <ArrowLeft />
        </button>
        <button onClick={() => paginate("next")}>
          <ArrowRight />
        </button>
      </div>
    </div>
  )
}
