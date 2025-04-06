import { Suspense } from "react"
import Hero from "@/components/sections/hero"
import About from "@/components/sections/about"
import Skills from "@/components/sections/skills"
import Projects from "@/components/sections/projects"
import AIShowcase from "@/components/sections/ai-showcase"
import Contact from "@/components/sections/contact"
import { SectionLoader } from "@/components/ui/section-loader"

export const metadata = {
  title: "Anshuman | Cloud Engineer & Web Developer",
  description: "Portfolio of Anshuman - Cloud Engineer, Web Developer and AI Automation Enthusiast",
  openGraph: {
    title: "Anshuman | Cloud Engineer & Web Developer",
    description: "Portfolio of Anshuman - Cloud Engineer, Web Developer and AI Automation Enthusiast",
    type: "website",
    locale: "en_US",
    url: "https://anshuman-portfolio.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anshuman | Cloud Engineer & Web Developer",
    description: "Portfolio of Anshuman - Cloud Engineer, Web Developer and AI Automation Enthusiast",
  },
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Hero />

      <Suspense fallback={<SectionLoader />}>
        <About />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Skills />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Projects />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <AIShowcase />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>
    </main>
  )
}

