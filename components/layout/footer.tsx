"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, ArrowUp, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <footer className="relative bg-elevation-2 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-emerald/5 blur-3xl"></div>
        <div className="absolute top-1/4 right-1/3 w-64 h-64 rounded-full bg-emerald/3 blur-3xl"></div>
        <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-emerald/5 blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-12 mb-16">
          {/* About Column */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-xl font-bold font-heading mb-4 text-cream">Anshuman</h3>
              <p className="text-soft-cream/70 mb-6">
                Cloud Engineer, Web Developer, and AI Automation Enthusiast focused on building efficient solutions.
              </p>
              <div className="flex space-x-4 mt-4">
                <motion.a
                  href="https://github.com/anshuman"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-emerald/10 flex items-center justify-center text-emerald hover:bg-emerald/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/anshuman"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-emerald/10 flex items-center justify-center text-emerald hover:bg-emerald/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="mailto:contact@anshuman.dev"
                  className="w-10 h-10 rounded-full bg-emerald/10 flex items-center justify-center text-emerald hover:bg-emerald/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Mail className="h-5 w-5" />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-xl font-bold font-heading mb-5 text-cream">Navigation</h3>
              <ul className="space-y-3">
                {["Home", "About", "Skills", "Projects", "AI Showcase", "Contact"].map((item, index) => (
                  <motion.li 
                    key={item}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link 
                      href={`#${item.toLowerCase().replace(" ", "-")}`} 
                      className="flex items-center text-soft-cream/70 hover:text-emerald transition-colors group"
                    >
                      <span className="w-2 h-0.5 bg-emerald/50 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-xl font-bold font-heading mb-5 text-cream">Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-start group">
                  <div className="w-8 h-8 rounded-full bg-emerald/10 flex-shrink-0 flex items-center justify-center mr-3 group-hover:bg-emerald/20 transition-colors">
                    <Mail className="h-4 w-4 text-emerald" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-cream/90">Email</h4>
                    <a
                      href="mailto:contact@anshuman.dev"
                      className="text-soft-cream/70 hover:text-emerald transition-colors text-sm flex items-center"
                    >
                      contact@anshuman.dev
                    </a>
                  </div>
                </li>
                <li className="flex items-start group">
                  <div className="w-8 h-8 rounded-full bg-emerald/10 flex-shrink-0 flex items-center justify-center mr-3 group-hover:bg-emerald/20 transition-colors">
                    <Github className="h-4 w-4 text-emerald" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-cream/90">GitHub</h4>
                    <a
                      href="https://github.com/anshuman"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-soft-cream/70 hover:text-emerald transition-colors text-sm flex items-center"
                    >
                      <span>github.com/anshuman</span>
                      <ExternalLink className="h-3 w-3 ml-1 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </li>
                <li className="flex items-start group">
                  <div className="w-8 h-8 rounded-full bg-emerald/10 flex-shrink-0 flex items-center justify-center mr-3 group-hover:bg-emerald/20 transition-colors">
                    <Linkedin className="h-4 w-4 text-emerald" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-cream/90">LinkedIn</h4>
                    <a
                      href="https://linkedin.com/in/anshuman"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-soft-cream/70 hover:text-emerald transition-colors text-sm flex items-center"
                    >
                      <span>linkedin.com/in/anshuman</span>
                      <ExternalLink className="h-3 w-3 ml-1 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom footer with copyright */}
        <div className="pt-8 border-t border-elevation-1 flex flex-col md:flex-row justify-between items-center">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-sm text-soft-cream/60"
          >
            © {currentYear} Anshuman. All rights reserved.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex items-center mt-4 md:mt-0"
          >
            <span className="text-xs text-soft-cream/50 mr-2">Designed & Developed with</span>
            <span className="text-emerald text-sm">❤️</span>
          </motion.div>
        </div>
      </div>

      {/* Scroll to top button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0.5,
          pointerEvents: showScrollTop ? "auto" : "none"
        }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={scrollToTop}
          size="icon"
          className="h-10 w-10 rounded-full bg-emerald hover:bg-emerald/90 text-deep-teal shadow-[0_2px_10px_rgba(6,214,160,0.3)]"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </motion.div>
    </footer>
  )
}

