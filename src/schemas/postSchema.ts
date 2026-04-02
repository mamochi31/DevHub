import { z } from "zod";

// Zod を使ったバリデーションスキーマ定義
export const postFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "タイトルは必須です" })
    .max(100, { message: "タイトルは100文字以内で入力してください" }),
  content: z.string().min(1, { message: "内容は必須です" }),
});

// ZodスキーマからTypeScriptの型を自動生成
export type PostFormValues = z.infer<typeof postFormSchema>;