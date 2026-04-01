import type { RouteObject } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { SkillsPage } from '../pages/SkillsPage';

/**
 * アプリケーションの全ルート定義
 * ページが増えたら、この配列にオブジェクトを追加するだけで済みます
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />, // 共通のガワ
    children: [
      { index: true, element: <HomePage /> }, // TOPページ (/)
      { path: 'about', element: <AboutPage /> }, // 自己紹介 (/about)
      { path: 'skills', element: <SkillsPage /> }, // 自己紹介 (/about)
      
      // 今後増やしたいページがあれば、ここに行を足すイメージです
      // { path: 'blog/:id', element: <PostDetailPage /> },
    ],
  },
  {
    path: '*',
    element: <HomePage />, // 404の時はとりあえずTOPへ
  },
];