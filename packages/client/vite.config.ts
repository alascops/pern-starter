import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import { resolve } from "path"

export default defineConfig({
   plugins: [
      react()
   ],
   resolve: {
      alias: [{
         find: "@",
         replacement: resolve(__dirname, "src")
      }, {
         find: "@apis",
         replacement: resolve(__dirname, "src/features/apis")
      }, {
         find: "@stores",
         replacement: resolve(__dirname, "src/features/stores")
      }, {
         find: "@components",
         replacement: resolve(__dirname, "src/components")
      }, {
         find: "@config",
         replacement: resolve(__dirname, "src/config")
      }, {
         find: "@middlewares",
         replacement: resolve(__dirname, "src/middlewares")
      }, {
         find: "@pages",
         replacement: resolve(__dirname, "src/pages")
      }]
   }
})
