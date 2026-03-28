import React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"

import "./globals.css"
import { AppProvider } from "@/lib/store"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const _playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "SmartTravels - Your Personalized Travel Companion",
  description:
    "Discover destinations, plan personalized trips, track expenses, and create unforgettable memories with SmartTravels.",
}

export const viewport: Viewport = {
  themeColor: "#1a8a6e",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AppProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  )
}
