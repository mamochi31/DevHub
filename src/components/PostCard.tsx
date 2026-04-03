import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import type { Post } from "../types/Post";
import { useAuth } from "../contexts/AuthContext";

type PostCardProps = {
  post: Post;
  onDelete: (id: number) => Promise<void>;
};

export function PostCard({ post, onDelete }: PostCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // 記事の開閉状態
  const { isAuthenticated } = useAuth(); // ログイン状態を取得
  const menuRef = useRef<HTMLDivElement>(null);

  // メニューの外側をクリックしたら閉じる処理
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 削除ボタンが押された時の処理
  const handleDelete = async () => {
    setIsMenuOpen(false); // メニューを閉じる
    if (window.confirm(`「${post.title}」を本当に削除しますか？`)) {
      await onDelete(post.id);
    }
  };

  return (
    <article className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 transition-colors duration-300 hover:shadow-md relative">
      <div className="flex justify-between items-start mb-2">
        {/* タイトル（クリックで開閉） */}
        <h2
          className="text-2xl font-bold text-gray-900 dark:text-slate-100 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group"
          onClick={() => setIsExpanded(!isExpanded)}
          title="クリックで内容を開閉"
        >
          {post.title}
          <svg
            className={`w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </h2>

        {/* 三点メニュー（ログイン状態の時のみ表示） */}
        {isAuthenticated && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors focus:outline-none"
              aria-label="メニューを開く"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14a2 2 0 100-4 2 2 0 000 4zm-6 0a2 2 0 100-4 2 2 0 000 4zm12 0a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </button>

            {/* ドロップダウンメニュー */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-100 dark:border-slate-700 z-10 py-1 overflow-hidden">
                <Link
                  to={`/posts/${post.id}/edit`}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                >
                  編集
                </Link>
                <button
                  onClick={handleDelete}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                >
                  削除
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 日付表示（カレンダーアイコン付き） */}
      <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          ></path>
        </svg>
        <time dateTime={post.updatedAt}>
          {new Date(post.updatedAt).toLocaleDateString("ja-JP")}
        </time>
      </div>

      {/* 本文（isExpandedがtrueの時だけ表示） */}
      {isExpanded && (
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-700 prose prose-slate dark:prose-invert max-w-none text-gray-700 dark:text-slate-300">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      )}
    </article>
  );
}
