# React Hook Form と Zod について

モダンな React 開発において、パフォーマンスが高く、型安全なフォームを構築するためのデファクトスタンダードとなっているライブラリの組み合わせです。

## それぞれの役割

*   **React Hook Form**: フォームの状態管理（入力値の監視、送信時の処理、エラー状態の保持など）を行う。**非制御コンポーネント**の仕組みを利用しているため、入力のたびに画面全体が再描画されず、動作が非常に軽いのが特徴。
*   **Zod**: 「タイトルは必須」「100文字以内」といった**データのルール（スキーマ）を定義**し、入力値がそのルールに合っているかチェック（バリデーション）する。また、そのルールから TypeScript の**型を自動生成**できる強力な機能を持つ。

この2つを `@hookform/resolvers/zod` という架け橋を使って連携させます。

---

## React Hook Form の主要な機能 (`useForm` の戻り値)

### `register`
HTMLの入力要素（`<input>` や `<textarea>`）を React Hook Form に認識させるための関数です。
```tsx
<input type="text" {...register("title")} />
```

### `handleSubmit`
フォーム送信時の処理をラップする関数です。Zod のバリデーションを通過した場合のみ、引数に渡した `onSubmit` 関数を実行してくれます。
```tsx
<form onSubmit={handleSubmit(onSubmit)}>
```

### `reset`
フォームの入力内容や状態を初期化、または特定の値で上書きする関数です。
*   引数なし: 初期値（`defaultValues`）に戻す。送信成功後によく使います。
*   引数あり: `reset({ title: "取得した値" })` のように、API等から取得したデータでフォームを初期化する際によく使います。

---

## 🌟 非常に便利な `formState` のプロパティ

`useForm` から取り出せる `formState` オブジェクトには、フォームの「今の状態」を知るための便利なフラグが詰まっています。

### `errors` と `isSubmitting`
*   **`errors`**: バリデーションエラーの情報が入ります（例: `errors.title.message` に Zod で設定したエラー文が入る）。
*   **`isSubmitting`**: `onSubmit` の非同期処理（`await` など）が実行中かどうか。これを使ってボタンを無効化し、二重送信を防ぎます。

### `isDirty` / `dirtyFields`（変更検知）
*   **`isDirty`**: 初期値から1文字でも変更されたら `true` になります。「変更がない場合は保存ボタンを押せないようにする」といった制御に便利です。
*   **`dirtyFields`**: どの項目が変更されたかがオブジェクトで入ります。

### `isValid` / `isValidating`（バリデーション状態）
*   **`isValid`**: エラーがなく、すべてのルールを満たしていれば `true` になります。
    > **補足**: `isValid` をリアルタイム（入力中）に機能させるには、`useForm` の `mode` オプションを `"onChange"` や `"onBlur"` に設定する必要があります。
    > ```tsx
    > useForm({ mode: "onChange" });
    > ```
### `isSubmitSuccessful` / `isSubmitted`（送信結果）
*   **`isSubmitSuccessful`**: エラーなく無事に送信処理が最後まで完了したときに `true` になります。これを使って `useEffect` 内で自動的に `reset()` を呼ぶこともできます。
*   **`isSubmitted`**: フォームが1回でも送信（Submit）されたかどうかがわかります。

---

## Zod の基本的な使い方

まずルールを定義し、そこから型を生成します。

```typescript
import { z } from "zod";

// 1. スキーマ（ルール）の定義
const postFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "タイトルは必須です" })
    .max(100, { message: "100文字以内で入力してください" }),
  content: z
    .string()
    .min(1, { message: "内容は必須です" }),
});

// 2. 型の自動生成（別途 type 宣言を書く必要がなくなります！）
type PostFormValues = z.infer<typeof postFormSchema>;
```

### 代表的な Zod のメソッド
*   `z.string()`: 文字列であることを要求
*   `z.number()`: 数値であることを要求
*   `z.boolean()`: 真偽値であることを要求
*   `z.array(z.string())`: 文字列の配列であることを要求
*   `.min(n)` / `.max(n)`: 最小値 / 最大値の制限（文字列なら文字数、数値ならその数）
*   `.email()`: メールアドレス形式であることを要求
*   `.optional()`: 入力がなくてもOK（undefinedを許容）とする
