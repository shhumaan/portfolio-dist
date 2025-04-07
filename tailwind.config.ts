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
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Theme Colors (Keep these)
        emerald: "hsl(var(--emerald))",
        ruby: "hsl(var(--ruby))",
        amber: "hsl(var(--amber))",
        sapphire: "hsl(var(--sapphire))",
        onyx: "hsl(var(--onyx))",
        amethyst: "hsl(var(--amethyst))",
        "muted-gold": "hsl(var(--muted-gold))",
        
        // General Semantic Colors (Keep these)
        cream: "#F5F1E6",
        "soft-cream": "#EEE8D9",
        theme: "hsl(var(--theme-color))", // Dynamic theme color
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
      backdropBlur: {
        'premium': '10px',
      },
      boxShadow: {
        "premium-sm": "var(--shadow-premium-sm)",
        "premium-md": "var(--shadow-premium-md)",
        "premium-lg": "var(--shadow-premium-lg)",
        "premium-xl": "var(--shadow-premium-xl)",
        "premium-2xl": "var(--shadow-premium-2xl)",
        "theme-sm": "0 1px 3px hsla(var(--theme-color), 0.3)",
        "theme-md": "0 4px 8px hsla(var(--theme-color), 0.35)",
        "theme-lg": "0 6px 12px hsla(var(--theme-color), 0.4)",
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

