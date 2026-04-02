import { PostForm } from "../features/PostForm";
import type { PostFormValues } from "../schemas/postSchema";
import { PageHeader } from "../components/PageHeader";

export function CreatePostPage() {
  // 新規記事作成の処理
  const handleCreatePost = async (data: PostFormValues) => {
    // 擬似的なAPI通信（2秒待機）
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Submit data:", data);
    alert("記事を作成しました！（コンソールを確認してください）");
    // TODO: ここでAPI通信や、記事リストへの追加を行う
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <PageHeader title="新規記事作成" />

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 transition-colors duration-300">
        <PostForm onSubmit={handleCreatePost} submitText="Post" />
      </div>
    </div>
  );
}
