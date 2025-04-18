import type React from "react"
import type { Metadata } from "next"
import { Inter, Cinzel, Cinzel_Decorative, Great_Vibes, IM_Fell_English, Almendra} from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import {} from 'next/font/google'

// Define fonts with proper subsets and weights
const inter = Inter({ subsets: ["latin"] })

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
})

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
})

const almendra = Almendra({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-almendra",
})

const fell = IM_Fell_English({
  subsets: ['latin'],
  weight: '400', // adjust as needed
})

const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cinzel-decorative",
})

// We'll use a local font fallback for Parisienne since it's not in next/font/google
// The actual styling will be handled in globals.css

export const metadata: Metadata = {
  title: "Nova - Your Magical Guide",
  description: "Explore the mysteries of fate with Nova, your magical guide to the realms beyond.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${greatVibes.variable} ${fell.className} ${almendra.variable} ${cinzelDecorative.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'