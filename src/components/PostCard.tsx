import type { Post } from "../types/Post";

type PostCardProps = {
  key: number;
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 p-4 rounded-lg shadow-sm bg-white dark:bg-slate-800 transition-colors duration-300">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-100">
        {post.title}
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm">{post.date}</p>
      <p className="mt-2 text-gray-700 dark:text-slate-300">{post.content}</p>
    </div>
  );
}
