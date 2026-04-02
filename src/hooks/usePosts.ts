import { useEffect, useState } from "react";
import { MOCK_POSTS } from "../data/mock";
import type { Post } from "../types/Post";

// 1秒待ってからモックデータを返す、擬似的なAPI関数
const fetchPosts = (): Promise<Post[]> => {
  console.log("Fetching posts...");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Posts fetched!");
      resolve(MOCK_POSTS);
      
      // エラー時のUIを確認したい場合は、上の resolve(MOCK_POSTS); をコメントアウトし、
      // 下の reject を有効にしてみてください。
      // reject(new Error("サーバーからの応答がありません。"));
    }, 1000);
  });
};

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        console.error("記事の取得に失敗しました:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  return { posts, isLoading, error };
};