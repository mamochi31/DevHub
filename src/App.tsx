// src/App.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { ThemeProvider } from "./contexts/ThemeContext";

// 定義（routes）を元にルーターを作成
const router = createBrowserRouter(routes);

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
