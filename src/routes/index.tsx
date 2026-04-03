import type { RouteObject } from "react-router-dom";
import { Layout } from "../components/Layout";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { AboutPage } from "../pages/AboutPage";
import { SkillsPage } from "../pages/SkillsPage";
import { CreatePostPage } from "../pages/CreatePostPage";
import { EditPostPage } from "../pages/EditPostPage";
import { ProtectedRoute } from "../components/ProtectedRoute";

/**
 * アプリケーションの全ルート定義
 * ページが増えたら、この配列にオブジェクトを追加するだけで済みます
 */
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />, // 共通のガワ
    children: [
      { index: true, element: <HomePage /> }, // TOPページ (/)
      { path: "about", element: <AboutPage /> }, // 自己紹介 (/about)
      { path: "login", element: <LoginPage /> }, // ログイン (/login)
      { path: "skills", element: <SkillsPage /> }, // スキル (/skills)

      // ログイン必須のルートを ProtectedRoute で囲む
      {
        element: <ProtectedRoute />,
        children: [
          { path: "posts/new", element: <CreatePostPage /> }, // 記事作成 (/posts/new)
          { path: "/posts/:id/edit", element: <EditPostPage /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <HomePage />, // 404の時はとりあえずTOPへ
  },
];
