import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Premium Green/Cream Theme Colors
        "deep-teal": "#0A2E2A",
        "cream": "#F5F1E6",
        "soft-cream": "#EEE8D9",
        "emerald": "#06D6A0",
        // Category Colors
        "cloud": "#4ECDC4",
        "dev": "#34BE82", 
        "ai": "#268980",
        "support": "#F4A261",
        // Elevation System
        "elevation-1": "#0C302C",
        "elevation-2": "#0E3230",
        "elevation-3": "#103634",
        "elevation-4": "#123A38",
        "elevation-5": "#143E3C",
      },
      fontFamily: {
        body: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-outfit)", "sans-serif"],
        accent: ["var(--font-caveat)", "cursive"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "typing": {
          "0%": { width: "0%" },
          "100%": { width: "100%" }
        },
        "blink": {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "hsl(var(--foreground))" }
        },
        "progress": {
          "0%": { width: "0%" },
          "100%": { width: "100%" }
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(-1deg)" },
          "50%": { transform: "rotate(1deg)" }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        "typing": "typing 3.5s steps(40, end)",
        "blink": "blink 0.7s step-end infinite",
        "progress": "progress 2s ease-out",
        "wiggle": "wiggle 1s ease-in-out infinite",
      },
      perspective: {
        "1000": "1000px",
      },
      transformStyle: {
        "preserve-3d": "preserve-3d",
      },
      backfaceVisibility: {
        hidden: "hidden",
      },
      rotate: {
        "y-180": "rotateY(180deg)",
      },
      boxShadow: {
        'premium-sm': '0 2px 5px rgba(10, 46, 42, 0.1), 0 1px 3px rgba(6, 214, 160, 0.05)',
        'premium-md': '0 4px 8px rgba(10, 46, 42, 0.12), 0 2px 4px rgba(6, 214, 160, 0.08)',
        'premium-lg': '0 8px 16px rgba(10, 46, 42, 0.14), 0 4px 8px rgba(6, 214, 160, 0.1)',
        'premium-xl': '0 12px 24px rgba(10, 46, 42, 0.16), 0 6px 12px rgba(6, 214, 160, 0.12)',
        'premium-2xl': '0 20px 32px rgba(10, 46, 42, 0.18), 0 10px 20px rgba(6, 214, 160, 0.14)',
        'premium-inner': 'inset 0 2px 4px rgba(10, 46, 42, 0.06)',
        'premium-glow': '0 0 15px rgba(6, 214, 160, 0.4)',
      },
      backdropBlur: {
        'premium': '10px',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    ({ addUtilities }: { addUtilities: Function }) => {
      const newUtilities = {
        ".perspective-1000": {
          perspective: "1000px",
        },
        ".preserve-3d": {
          transformStyle: "preserve-3d",
        },
        ".backface-hidden": {
          backfaceVisibility: "hidden",
        },
        ".rotate-y-180": {
          transform: "rotateY(180deg)",
        },
        ".backdrop-blur-premium": {
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        },
      }
      addUtilities(newUtilities)
    },
  ],
} satisfies Config

export default config

