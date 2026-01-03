"use client"

import React, { useEffect, useRef, useState } from "react"
import { Media } from "@/payload-types"
import { motion } from "framer-motion"

type Props = {
  items: Media[]
  maxVisible?: number
}

export function OrbitSlider2({ items, maxVisible = 5 }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<"next" | "prev">("next")

  const allCount = Math.min(maxVisible, Math.max(1, items.length)) + 2
  const posOffset = 5
  const scaleOffset = 0.05
  const positions: Record<number, any> = {}

  // === параметры параллакса ===
  const imgRef = useRef<HTMLImageElement | null>(null) // на него будем писать transform
  const target = useRef({ tx: 0, ty: 0, rx: 0, ry: 0 })
  const current = useRef({ tx: 0, ty: 0, rx: 0, ry: 0 })
  const rafRef = useRef<number | null>(null)
  const maxTranslate = 18 // 18
  const maxRotate = 12 // 8
  const ease = 0.1

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

  // === rAF loop: интерполируем и применяем transform к imgRef ===
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

  // pointer handlers: обновляют target (слушаем только на wrapper для posIndex === 1)
  const handlePointerMove = (e: React.PointerEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5 // -0.5 .. 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5 // -0.5 .. 0.5

    target.current.tx = nx * maxTranslate
    target.current.ty = ny * maxTranslate
    target.current.rx = -ny * maxRotate // инверт для естественного наклона
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
    <div className="flex flex-col items-center justify-between h-screen">
      <div className="relative flex-1 w-full flex items-center justify-center px-8">
        {slots.map((img) => {
          const isMain = img.posIndex === 1 // <-- main (видимая "левая/центральная") картинка
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
              // pointer handlers только на wrapper главной картинки
              onPointerMove={isMain ? handlePointerMove : undefined}
              onPointerLeave={isMain ? handlePointerLeave : undefined}
              className="absolute"
              onClick={() => paginate("next")}
              style={{
                width: "30%",
                height: "60%",
                zIndex: positions[img.posIndex].zIndex,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                // здесь не пишем transform — framer-motion делает это
              }}
            >
              {/* img — сюда пишем параллакс (imgRef). pointer события ловит wrapper */}
              <img
                ref={isMain ? imgRef : null}
                src={img.url ?? ""}
                alt={img.alt ?? ""}
                className="object-cover shadow-2xl w-full h-full select-none pointer-events-none"
                // pointer-events-none чтобы wrapper получал события
                draggable={false}
                style={{
                  boxShadow: "1px 1px 20px #4F4F4F",
                  // начальный transform пустой; rAF запишет на imgRef.style.transform
                }}
              />
            </motion.div>
          )
        })}
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
