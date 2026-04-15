import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "480px",
      },
    },
    extend: {
      fontFamily: {
        display: ['Nunito', 'sans-serif'],
      },
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
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        danger: {
          DEFAULT: "hsl(var(--danger))",
          foreground: "hsl(var(--danger-foreground))",
        },
        earth: {
          DEFAULT: "hsl(var(--earth))",
          foreground: "hsl(var(--earth-foreground))",
        },
        sky: {
          DEFAULT: "hsl(var(--sky))",
          foreground: "hsl(var(--sky-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
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
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 hsl(0 72% 51% / 0.4)" },
          "50%": { boxShadow: "0 0 0 12px hsl(0 72% 51% / 0)" },
        },
        "mic-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 hsl(142 50% 32% / 0.5)" },
          "50%": { boxShadow: "0 0 0 18px hsl(142 50% 32% / 0)" },
        },
        "mic-ripple": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "sway": {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "soft-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "drift-cloud": {
          "0%": { transform: "translateX(-120px)" },
          "100%": { transform: "translateX(calc(100vw + 120px))" },
        },
        "sun-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.6" },
          "50%": { transform: "scale(1.15)", opacity: "1" },
        },
        "wind-sway": {
          "0%, 100%": { transform: "rotate(-4deg)" },
          "25%": { transform: "rotate(3deg)" },
          "75%": { transform: "rotate(-2deg)" },
        },
        "sound-bar-bounce": {
          "0%": { transform: "scaleY(0.4)" },
          "100%": { transform: "scaleY(1)" },
        },
        "leaf-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "slide-up-fade": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "glow-blink": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "mic-pulse": "mic-pulse 2s ease-in-out infinite",
        "mic-ripple": "mic-ripple 1.5s ease-out infinite",
        "float": "float 3s ease-in-out infinite",
        "sway": "sway 4s ease-in-out infinite",
        "soft-glow": "soft-glow 2.5s ease-in-out infinite",
        "drift-cloud": "drift-cloud 40s linear infinite",
        "sun-pulse": "sun-pulse 4s ease-in-out infinite",
        "wind-sway": "wind-sway 3s ease-in-out infinite",
        "sound-bar-bounce": "sound-bar-bounce 0.6s ease-in-out infinite alternate",
        "leaf-spin": "leaf-spin 1.2s linear infinite",
        "slide-up-fade": "slide-up-fade 0.4s ease-out",
        "glow-blink": "glow-blink 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
