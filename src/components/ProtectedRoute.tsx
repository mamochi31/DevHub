import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // 未ログインの場合はログイン画面へ強制リダイレクト
    return <Navigate to="/login" replace />;
  }

  // ログイン済みの場合は子ルート（目的のページ）をレンダリング
  return <Outlet />;
}
