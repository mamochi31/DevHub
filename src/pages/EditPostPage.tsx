import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { PostForm } from "../features/PostForm";
import type { PostFormValues } from "../schemas/postSchema";
import type { Post } from "../types/Post";
import { api } from "../utils/api";

export function EditPostPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      try {
        const response = await api.get(`/api/posts/${id}`);
        if (!response.ok) {
          throw new Error("記事の取得に失敗しました");
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "不明なエラー");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdatePost = async (data: PostFormValues) => {
    try {
      const response = await api.put(`/api/posts/${id}`, data);
      if (!response.ok) throw new Error("記事の更新に失敗しました");
      alert("記事を更新しました！");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("エラーが発生しました。");
    }
  };

  if (isLoading) return <div className="text-center py-10">読み込み中...</div>;
  if (error)
    return (
      <div className="text-center text-red-500 py-10">エラー: {error}</div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4">
      <PageHeader title="記事編集" />
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
        {post && (
          <PostForm
            onSubmit={handleUpdatePost}
            defaultValues={{ title: post.title, content: post.content }}
            submitText="Update"
          />
        )}
      </div>
    </div>
  );
}
