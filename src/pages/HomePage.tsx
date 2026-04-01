import { PostList } from '../features/PostList';

export function HomePage() {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">Tech Blog</h1>
        <p className="text-gray-600 mt-2">F.Dの学習ログ</p>
      </header>
      
      <section>
        <PostList />
      </section>
    </div>
  );
}