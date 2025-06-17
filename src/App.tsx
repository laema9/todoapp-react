import { ThemeProvider } from "@/components/theme-provider"
import { FontProvider } from "@/components/font-provider" // ajuste le chemin si besoin
import Dashboard from "./components/Dashboard"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <FontProvider defaultFont="Outfit" storageKey="app-font">
        <>
        <header className="p-5">
          <h1 className="text-xl font-medium">@laema9 todo app</h1>
        </header>

        <div className="flex p-5 justify-center">
          
          <div className="w-full">
            <Dashboard />
          </div>

        </div>
            
        </>
      </FontProvider>
    </ThemeProvider>
  )
}

export default App
