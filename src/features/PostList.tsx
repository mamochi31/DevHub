import { PostCard } from "../components/PostCard";
import { usePosts } from "../hooks/usePosts";

export const PostList = () => {
  const { posts, isLoading, error, deletePost } = usePosts();

  if (isLoading) {
    return (
      <div className="text-center py-12 text-gray-500">
        記事を読み込んでいます...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p className="font-bold">エラーが発生しました</p>
        <p className="text-sm mt-2">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onDelete={deletePost} />
      ))}
    </div>
  );
};
