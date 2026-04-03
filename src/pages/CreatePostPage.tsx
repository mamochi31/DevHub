import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { PostForm } from "../features/PostForm";
import type { PostFormValues } from "../schemas/postSchema";
import { api } from "../utils/api";

export function CreatePostPage() {
  const navigate = useNavigate(); // 画面遷移用のフックを初期化

  // 新規記事作成の処理
  const handleCreatePost = async (data: PostFormValues) => {
    try {
      // Spring BootのAPIにPOSTリクエストを送信
      const response = await api.post("/api/posts", data);

      if (!response.ok) {
        throw new Error("記事の作成に失敗しました");
      }

      alert("記事を作成しました！");
      navigate("/"); // 成功したらホーム画面へ遷移する
    } catch (error) {
      console.error(error);
      alert("エラーが発生しました。サーバーが起動しているか確認してください。");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <PageHeader title="新規記事作成" />

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 transition-colors duration-300">
        <PostForm onSubmit={handleCreatePost} submitText="Post" />
      </div>
    </div>
  );
}
