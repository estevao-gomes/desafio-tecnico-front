import { Roboto } from "next/font/google"

import { Menu } from "@/components/menu/Menu"
import { Navbar } from "@/components/navbar/Navbar"
import { FilterContext } from "@/contexts/filterContext"

import "./globals.css"

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata = {
  title: "Rick and Morty Characters",
  description: "Rick and Morty interactive characters list",
  icons: {
    icon: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <Navbar />
        <FilterContext>
          <div id="container">
            <Menu />
            <main>{children}</main>
          </div>
        </FilterContext>
      </body>
    </html>
  )
}
