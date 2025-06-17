import { ThemeProvider } from "@/components/theme-provider"
import { FontProvider } from "@/components/font-provider" // ajuste le chemin si besoin

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <FontProvider defaultFont="Outfit" storageKey="app-font">
        <>
          <div>
            <h1>TEST</h1>
          </div>
        </>
      </FontProvider>
    </ThemeProvider>
  )
}

export default App
