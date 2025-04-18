import type React from "react"
import type { Metadata } from "next"
import { Inter, Outfit, Caveat } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import GlobalBackground from "@/components/ui/global-background"
import { ThemeProvider } from "@/context/ThemeContext"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Anshuman | Cloud Engineer & Web Developer",
  description: "Portfolio of Anshuman - Cloud Engineer, Web Developer and AI Automation Enthusiast",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning={true}>
      <body className={`${inter.variable} ${outfit.variable} ${caveat.variable} font-body`} suppressHydrationWarning={true}>
        <ThemeProvider>
          <GlobalBackground />
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}