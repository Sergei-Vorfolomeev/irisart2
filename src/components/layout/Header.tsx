import Link from "next/link"

export const Header = () => {
  return (
    <header className="flex justify-between items-center h-[80px] px-20 bg-[#E7DFD7]">
      <img src="/" />
      <div className="flex justify-between items-center gap-28">
        <div className="flex gap-10">
          <Link href="/gallery">Галерея</Link>
          <Link href="/about">Биография</Link>
          <Link href="/catalog">Каталог</Link>
        </div>
        <Link href="/">
          <img src="/" />
        </Link>
        <div className="flex gap-10">
          <Link href="/gallery">Галерея</Link>
          <Link href="/about">Биография</Link>
          <Link href="/catalog">Каталог</Link>
        </div>
      </div>
      <img src="/" />
    </header>
  )
}
