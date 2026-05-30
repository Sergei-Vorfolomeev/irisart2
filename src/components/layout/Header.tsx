import Link from "next/link"

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex h-[80px] items-center justify-center border-b border-[#d8ccbb] bg-[#efe7dc]/95 px-5 backdrop-blur-md sm:px-8 lg:px-16">
      <div className="flex w-full max-w-[1440px] items-center justify-between gap-6">
        <Link
          className="font-serif text-2xl uppercase tracking-[0.18em] text-[#171411]"
          href="/"
          aria-label="Iris Art"
        >
          Iris Art
        </Link>
        <nav className="hidden items-center gap-10 text-sm uppercase tracking-[0.18em] text-[#4d443b] md:flex">
          <Link className="transition hover:text-[#8c6b42]" href="/gallery">
            Галерея
          </Link>
          <Link className="transition hover:text-[#8c6b42]" href="/about">
            Художники
          </Link>
          <Link className="transition hover:text-[#8c6b42]" href="/catalog">
            Каталог
          </Link>
        </nav>
        <Link className="gallery-text-link hidden sm:inline-flex" href="/about">
          Консультация
        </Link>
      </div>
    </header>
  )
}
