import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postFormSchema, type PostFormValues } from "../schemas/postSchema";

type PostFormProps = {
  onSubmit: (data: PostFormValues) => Promise<void>;
  submitText?: string;
  defaultValues?: PostFormValues;
};

export function PostForm({
  onSubmit,
  submitText = "Post",
  defaultValues,
}: PostFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues,
  });

  // フォーム送信時の内部処理
  const handleFormSubmit = async (data: PostFormValues) => {
    await onSubmit(data); // 親コンポーネントから渡された処理を実行
    reset(); // 成功したらフォームをリセット
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* タイトル入力 */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          {...register("title")}
          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-colors"
          placeholder="記事のタイトル"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* コンテンツ入力 */}
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1"
        >
          Content
        </label>
        <textarea
          id="content"
          rows={8}
          {...register("content")}
          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-colors resize-y"
          placeholder="Markdownで記事を記述..."
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.content.message}
          </p>
        )}
      </div>

      {/* 送信ボタン */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "投稿中..." : submitText}
        </button>
      </div>
    </form>
  );
}
