import { PostList } from "../features/PostList";
import { PageHeader } from "../components/PageHeader";

export function HomePage() {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <PageHeader title="学習ブログ" />

      <section>
        <PostList />
      </section>
    </div>
  );
}
