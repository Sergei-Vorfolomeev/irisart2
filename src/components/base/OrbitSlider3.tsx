"use client"

import React, { useEffect, useRef, useState } from "react"
import { Media } from "@/payload-types"
import { motion } from "framer-motion"
import Image from "next/image"

type Props = {
  items: Media[]
  maxVisible?: number
  className?: string
}

export function OrbitSlider3({ items, maxVisible = 7, className = "" }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<"next" | "prev">("next")

  const allCount = Math.min(maxVisible, Math.max(1, items.length)) + 2
  const posOffset = 4
  const scaleOffset = 0.05
  const positions: Record<number, any> = {}

  // === параметры параллакса ===
  const imgRef = useRef<HTMLImageElement | null>(null)
  const target = useRef({ tx: 0, ty: 0, rx: 0, ry: 0 })
  const current = useRef({ tx: 0, ty: 0, rx: 0, ry: 0 })
  const rafRef = useRef<number | null>(null)
  const maxTranslate = 18
  const maxRotate = 12
  const ease = 0.1

  const centerPos = Math.ceil(maxVisible / 2) // центральная позиция

  for (let i = 0; i < allCount; i++) {
    const idxFromTop = centerPos - i // 1 — верхняя, 2 — ниже и т.д.
    const idxFromCenter = i - centerPos
    if (i === 0) {
      // дальний левый хвост (невидимый)
      positions[i] = {
        x: `${-120 - idxFromTop * posOffset}%`,
        y: `${posOffset + idxFromTop * -posOffset}%`,
        scale: Math.max(0.2, 0.5 + idxFromTop * -scaleOffset),
        zIndex: 1,
        opacity: 0,
      }
    } else if (i === centerPos) {
      // центр
      positions[i] = { x: 0, y: 0, scale: 1.2, zIndex: 50, opacity: 1 }
    } else if (i === allCount - 1) {
      // дальний правый хвост
      positions[i] = {
        x: `${120 + idxFromCenter * posOffset}%`,
        y: `${posOffset + idxFromCenter * -posOffset}%`,
        scale: Math.max(0.2, 0.5 - i * scaleOffset),
        zIndex: 1,
        opacity: 0,
      }
    } else if (i < centerPos) {
      // левая стопка
      positions[i] = {
        x: `${-120 - idxFromTop * posOffset}%`,
        y: `${posOffset + idxFromTop * -posOffset}%`,
        scale: Math.max(0.2, 0.5 + idxFromTop * -scaleOffset),
        zIndex: 50 - idxFromTop,
        opacity: 1,
      }
    } else {
      // правая стопка
      positions[i] = {
        x: `${120 + idxFromCenter * posOffset}%`,
        y: `${posOffset + idxFromCenter * -posOffset}%`,
        scale: Math.max(0.2, 0.5 - idxFromCenter * scaleOffset),
        zIndex: 50 - idxFromCenter,
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
    setCurrentIndex((prev) =>
      dir === "next" ? (prev - 1 + items.length) % items.length : (prev + 1) % items.length,
    )
  }

  const getHover = (img: Media & { posIndex: number }) => {
    if ([0, centerPos - 1, centerPos, centerPos + 1, allCount - 1].includes(img.posIndex)) return
    return { y: "-30%" }
  }

  // rAF loop: интерполируем и применяем transform к imgRef
  useEffect(() => {
    const loop = () => {
      const cur = current.current
      const tgt = target.current

      cur.tx += (tgt.tx - cur.tx) * ease
      cur.ty += (tgt.ty - cur.ty) * ease
      cur.rx += (tgt.rx - cur.rx) * ease
      cur.ry += (tgt.ry - cur.ry) * ease

      const img = imgRef.current
      if (img) {
        img.style.willChange = "transform"
        img.style.transform = `perspective(1000px) translate3d(${cur.tx.toFixed(2)}px, ${cur.ty.toFixed(
          2,
        )}px, 0) rotateX(${cur.rx.toFixed(2)}deg) rotateY(${cur.ry.toFixed(2)}deg)`
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // pointer handlers
  const handlePointerMove = (e: React.PointerEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5

    target.current.tx = nx * maxTranslate
    target.current.ty = ny * maxTranslate
    target.current.rx = -ny * maxRotate
    target.current.ry = nx * maxRotate
  }

  const handlePointerLeave = () => {
    target.current.tx = 0
    target.current.ty = 0
    target.current.rx = 0
    target.current.ry = 0
  }

  if (!items.length) return null
  return (
    <div
      className={`flex h-screen flex-col items-center justify-between overflow-hidden ${className}`}
      aria-label="Анимация перелистывания картин"
    >
      <div className="relative flex-1 w-full flex items-center justify-center px-8">
        {slots.map((img) => {
          const isMain = img.posIndex === centerPos
          return (
            <motion.div
              key={img.id}
              initial={
                direction === "next" ? { y: 0, opacity: 0 } : { x: "-100%", y: "-20%", opacity: 0 }
              }
              animate={positions[img.posIndex]}
              custom={direction}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              whileHover={getHover(img)}
              onPointerMove={isMain ? handlePointerMove : undefined}
              onPointerLeave={isMain ? handlePointerLeave : undefined}
              className="absolute cursor-pointer"
              onClick={() => paginate(centerPos >= img.posIndex ? "next" : "prev")}
              style={{
                width: "30%",
                height: "60%",
                zIndex: positions[img.posIndex].zIndex,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                ref={isMain ? imgRef : null}
                className="relative w-full h-full overflow-hidden bg-gray-200"
                style={{
                  boxShadow: "0 24px 80px rgba(25, 19, 14, 0.32)",
                }}
              >
                {img && typeof img !== "number" && img.url && (
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    className="flex-shrink-0 object-contain select-none pointer-events-none"
                  />
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* <div className="flex flex-row gap-3 mb-10">
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
      </div> */}
    </div>
  )
}
