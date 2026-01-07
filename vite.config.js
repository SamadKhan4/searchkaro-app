import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// NOTE: Removed dev-only `server.proxy` from this file.
// We now use `VITE_API_URL` in the client to point to backend URLs per-environment.
// Keeping `base: '/'` ensures Vercel and React Router work correctly on reloads.
export default defineConfig({
  plugins: [react()],
  base: "/", // IMPORTANT for Vercel SPA routing / page reloads
})
