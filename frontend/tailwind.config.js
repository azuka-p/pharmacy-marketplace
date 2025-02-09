import { transform } from "typescript";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        primBlue: "#1A86C6",
        primDarkBlue: "#125d8a",
        primGreen: "#8FC641",
        darkGray: "#777777",
        midGray: "#BEBEBE",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "capsul-left": {
          "0%": {
            left: "0%",
          },
          "40%": {
            left: "-14%",
            transform: "rotate(30deg)",
          },
          "50%": {
            left: "-14%",
            transform: "rotate(30deg)",
          },
          "60%": {
            left: "-14%",
            transform: "rotate(30deg)",
          },
          "70%": {
            left: "-14%",
            transform: "rotate(30deg)",
          },
          "80%": {
            left: "0%",
          },
          "90%": {
            left: "0%",
          },
          "100%": {
            left: "0%",
          },
        },
        "capsul-right": {
          "0%": {
            right: "0%",
          },
          "40%": {
            right: "-14%",
            transform: "rotate(-30deg)",
          },
          "50%": {
            right: "-14%",
            transform: "rotate(-30deg)",
          },
          "60%": {
            right: "-14%",
            transform: "rotate(-30deg)",
          },
          "70%": {
            right: "-14%",
            transform: "rotate(-30deg)",
          },
          "80%": {
            right: "0%",
          },
          "90%": {
            right: "0%",
          },
          "100%": {
            right: "0%",
          },
        },
        "drugBall-left": {
          "0%": {
            top: "0%",
            left: "0%",
            opacity: "0%",
          },
          "30%": {
            top: "0%",
            left: "0%",
            opacity: "0%",
          },
          "40%": {
            top: "54%",
            left: "40%",
            opacity: "50%",
          },
          "50%": {
            top: "59%",
            left: "51%",
            opacity: "0%",
          },
          "60%": {
            top: "51%",
            left: "60%",
            opacity: "0%",
          },
          "70%": {
            top: "20%",
            left: "72%",
            opacity: "0%",
          },
          "80%": {
            top: "0%",
            left: "78%",
            opacity: "0",
          },
          "90%": {
            top: "0%",
            left: "90%",
            opacity: "0",
          },
          "100%": {
            top: "0%",
            left: "0%",
            opacity: "0",
          },
        },
        "drugBall-right": {
          "0%": {
            top: "0%",
            right: "0%",
            opacity: "0%",
          },
          "30%": {
            top: "0%",
            right: "0%",
            opacity: "0%",
          },
          "40%": {
            top: "54%",
            right: "40%",
            opacity: "100%",
          },
          "50%": {
            top: "59%",
            right: "51%",
          },
          "60%": {
            top: "51%",
            right: "60%",
          },
          "70%": {
            top: "20%",
            right: "72%",
            opacity: "5%",
          },
          "80%": {
            top: "0%",
            right: "78%",
            opacity: "0",
          },
          "90%": {
            top: "0%",
            right: "90%",
            opacity: "0",
          },
          "100%": {
            top: "0%",
            right: "0%",
            opacity: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "capsul-left": "capsul-left infinite 1.5s",
        "capsul-right": "capsul-right infinite 1.5s",
        "drugBall-left": "drugBall-left infinite linear 1.5s",
        "drugBall-right": "drugBall-right infinite linear 1.5s",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
