import { ThemeProvider } from "@/components/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <>
        <p>@laema9 - todoapp</p>
      </>
    </ThemeProvider>
  )
}

export default App