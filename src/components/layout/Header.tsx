import Link from "next/link"

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-[#d8c7b4] bg-[#f3ecdf]/92 backdrop-blur-md">
      <div className="mx-auto flex h-20 w-[min(100%-2rem,1480px)] items-center justify-between gap-6">
        <Link
          className="font-serif text-[1.55rem] uppercase leading-none tracking-[0.18em] text-[#17120e]"
          href="/"
          aria-label="Iris Art"
        >
          Iris Art
        </Link>
        <nav className="hidden items-center gap-9 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#51483f] md:flex">
          <Link className="transition hover:text-[#7d5837]" href="/gallery">
            Коллекция
          </Link>
          <Link className="transition hover:text-[#7d5837]" href="/about">
            Художники
          </Link>
          <Link className="transition hover:text-[#7d5837]" href="/catalog">
            Каталог
          </Link>
        </nav>
        <Link
          className="hidden border-b border-current pb-1 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#7d5837] sm:inline-flex"
          href="/about"
        >
          Подбор
        </Link>
      </div>
    </header>
  )
}
