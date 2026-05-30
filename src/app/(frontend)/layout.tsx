import React from "react"
import "./styles.css"
import { Header } from "@/components/layout/Header"

export const metadata = {
  description: "Iris Art — curated art collection for private interiors and collections.",
  title: "Iris Art Gallery Boutique",
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="ru">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
