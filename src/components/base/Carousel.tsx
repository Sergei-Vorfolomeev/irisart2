"use client"

import { Fragment, ReactNode, useRef } from "react"
import { ArrowLeft, ArrowRight } from "./Icons"

type CarouselProps = {
  items: ReactNode[]
  actions?: ReactNode[]
  gap?: number
}

export function Carousel({ items, actions, gap }: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const moveLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -containerRef.current.clientWidth, behavior: "smooth" })
    }
  }

  const moveRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: containerRef.current.clientWidth, behavior: "smooth" })
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={containerRef}
        className={`flex rounded-2xl overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide`}
        style={{ gap: gap ?? 8 }}
      >
        {items.map((el, i) => (
          <div key={i} className="flex-none snap-start">
            {el}
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        {!!actions?.length && (
          <div className="flex gap-4">
            {actions.map((action, i) => (
              <Fragment key={i}>{action}</Fragment>
            ))}
          </div>
        )}
        <div className="flex gap-4 ml-auto">
          <button onClick={moveLeft} className="text-white">
            <ArrowLeft />
          </button>
          <button onClick={moveRight} className="text-white">
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  )
}
