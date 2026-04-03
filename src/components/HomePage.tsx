import { Link } from "react-router-dom";
import { PostList } from "../features/PostList";
import { PageHeader } from "../components/PageHeader";

export function HomePage() {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <PageHeader title="DevHub" />

      <div className="flex justify-end mb-6">
        <Link
          to="/posts/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          新規記事作成
        </Link>
      </div>

      <section>
        <PostList />
      </section>
    </div>
  );
}
