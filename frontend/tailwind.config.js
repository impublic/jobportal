// Use ESM syntax instead of require
import { defineConfig } from "tailwindcss";

export default defineConfig({
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
});
