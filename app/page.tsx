import { Suspense } from "react"
import dynamic from 'next/dynamic'
import Hero from "@/components/sections/hero"
import { SectionLoader } from "@/components/ui/section-loader"

// Define a simple loading component function for dynamic imports
const Loading = () => <SectionLoader />;

// Dynamically import sections below the fold with explicit loading component
const About = dynamic(() => import("@/components/sections/about"), { loading: Loading })
const Skills = dynamic(() => import("@/components/sections/skills"), { loading: Loading })
const Projects = dynamic(() => import("@/components/sections/projects"), { loading: Loading })
const AIShowcase = dynamic(() => import("@/components/sections/ai-showcase"), { loading: Loading })
const Contact = dynamic(() => import("@/components/sections/contact"), { loading: Loading })

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

