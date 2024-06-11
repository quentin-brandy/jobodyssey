import { red } from '@mui/material/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  
    
    extend: {
      colors: {
        background: "hsl(var(--bg)/<alpha-value>)",
        button: "hsl(var(--boutton)/<alpha-value>)",
        border: "hsl(var(--border)/<alpha-value>)",
        body:"hsl(var(--body)/<alpha-value>)",
        brown:"hsl(var(--brown)/<alpha-value>)",
        rouge:"hsl(var(--red)/<alpha-value>)",
      },
      backgroundImage: {
        stat: "var(--stat-gradient)",    
      },
      },
      fontFamily: {
        "work" : ["Work Sans", "sans-serif"],
      },
      boxShadow: {
        "card": "24px 22px 16px -3px rgba(0,0,0,0.1)",
      },
    },
  plugins: [],
}

