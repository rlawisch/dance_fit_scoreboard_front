import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const cherryPickingEnvKeysBecauseViteDoNotSupportProcessDotEnvAndIFuckingHateMyLife = [
  'API_PROD'
]

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const processEnv = {}
  cherryPickingEnvKeysBecauseViteDoNotSupportProcessDotEnvAndIFuckingHateMyLife.forEach(key => processEnv[key] = env[key])
  
  return {
    define: {
      'process.env': processEnv
    },
    plugins: [react()]
  }

})
