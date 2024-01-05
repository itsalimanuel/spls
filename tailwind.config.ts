import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      'primary': "#0F4C81",
      'secondary': "#202632",
      'tertiary': "#323843",
      'white': "#ffffff",
      'is-pink': "#C02E64",
      'is-orange': "#FC5C4A",
      'is-gray': "#9da5b5",
      'is-light-gray': "#6f7485",
      'is-dark-gray': '#252a33',
      'is-dark': "#15191f",
      'is-label': '#606671',
      'is-light': '#7c859a',
      'none': 'transparent',
      'table': '#191f27',
      'is-green': '#1EB8A4',
      'is-red': '#FC5C4A',
    },
    borderRadius: {
      "sm": "8px",
      "md": "16px",
      "lg": "24px",
    },
    container: {
      center: true,
      padding: "2rem",
    },
  },
  plugins: [],
};
export default config;
