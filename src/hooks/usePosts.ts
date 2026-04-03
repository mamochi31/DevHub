import { useEffect, useState } from "react";
import type { Post } from "../types/Post";
import { api } from "../utils/api";

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Spring BootのAPIからデータを取得
      const response = await api.get("/api/posts");

      if (!response.ok) {
        throw new Error("データの取得に失敗しました");
      }

      const fetchedPosts = await response.json();
      setPosts(fetchedPosts);
    } catch (err) {
      console.error("記事の取得に失敗しました:", err);
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 記事を削除する関数
  const deletePost = async (id: number) => {
    try {
      const response = await api.delete(`/api/posts/${id}`);

      if (!response.ok) {
        throw new Error("記事の削除に失敗しました");
      }

      // Stateから削除された記事を即座に反映
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (err) {
      console.error(err);
      alert("記事の削除中にエラーが発生しました。");
    }
  };

  return { posts, isLoading, error, deletePost };
};