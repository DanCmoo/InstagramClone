import { Routes } from "react-router";
import Routers from "./Pages/Router/Routers";
import { ThemeProvider } from "./Context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Routers />
      </div>
    </ThemeProvider>
  );
}

export default App;
