"use client"

import { FC, useMemo, useState, ReactElement } from "react"
import { ArrowLeft, ArrowRight } from "@/components/base/Icons"
import { Button } from "./Button"

type SliderProps = {
  items?: ReactElement[]
  itemsPerSlide?: number
}

export const Slider: FC<SliderProps> = ({ items = [], itemsPerSlide = 1 }) => {
  const [curIndex, setCurIndex] = useState(0)

  const slides = useMemo(() => {
    const res: ReactElement[][] = []
    if (!items?.length) return res

    const step = itemsPerSlide

    for (let i = 0; i < items.length; i += step) {
      const slide = items.slice(i, i + step)
      if (slide.length < step) {
        res.push(items.slice(items.length - step))
        break
      }
      res.push(slide)
    }

    return res
  }, [items, itemsPerSlide])

  const total = slides.length

  const prev = () => setCurIndex((prev) => Math.max(0, prev - 1))
  const next = () => setCurIndex((prev) => Math.min(total - 1, prev + 1))

  if (!items?.length) return <></>
  return (
    <div className="flex flex-col justify-between gap-6 rounded-[20px] bg-white p-8 flex-1">
      <div className="flex flex-col gap-8">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{
              width: `${total * 100}%`,
              transform: `translateX(-${(curIndex * 100) / total}%)`,
            }}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                className="flex gap-6 w-full flex-shrink-0"
                style={{ width: `${100 / total}%` }}
              >
                {slide?.map((el) => el)}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center gap-2">
        <div className="text-[18px] text-[#bcbcbc]">{`${curIndex + 1}/${total}`}</div>
        <button disabled={curIndex === 0} onClick={prev}>
          <ArrowLeft />
        </button>
        <button disabled={curIndex === total - 1} onClick={next}>
          <ArrowRight />
        </button>
        {/* <Button
          variant="secondary"
          squared
          className="!p-0"
          onClick={prev}
          disabled={curIndex === 0}
        >
          <ArrowLeft />
        </Button>
        <Button
          variant="secondary"
          squared
          className="!p-0"
          onClick={next}
          disabled={curIndex === total - 1}
        >
          <ArrowRight />
        </Button> */}
      </div>
    </div>
  )
}
