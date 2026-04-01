// src/App.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';

// 定義（routes）を元にルーターを作成
const router = createBrowserRouter(routes);

export default function App() {
  // RouterProvider に渡すだけで完了
  return <RouterProvider router={router} />;
}