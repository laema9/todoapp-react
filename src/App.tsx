import { ThemeProvider } from "@/components/theme-provider"
import { FontProvider } from "@/components/font-provider" // ajuste le chemin si besoin
import TodoCard from "./components/TodoCard"

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
            <TodoCard />
          </div>

        </div>
            
        </>
      </FontProvider>
    </ThemeProvider>
  )
}

export default App
