import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  base: "/genshin-tcg/",

  resolve: {
    tsconfigPaths: true,
  },
});
