# useContext について

Reactの関数コンポーネントで、**Context API** によって提供された「グローバルなデータ（状態や関数）」を受け取るためのフックです。

## なぜ必要なのか？（Propsのバケツリレー解消）

通常、親コンポーネントから深くネストされた子孫コンポーネントへデータを渡すには、中間のコンポーネントすべてに Props を渡す必要があります（Prop Drilling）。
`useContext` を使うと、データが必要なコンポーネントから直接 Context（データの箱）にアクセスし、値を取り出すことができます。

## 基本的な構文

```typescript
const value = useContext(SomeContext);
```

- **`SomeContext`**: `createContext` で作成したコンテキストオブジェクトを指定します。
- **`value`**: 最も近い親の `<SomeContext.Provider>` の `value` プロパティに渡された最新の値が返されます。

---

## 💡 補足：useContext の重要な注意点

### 1. 再レンダリングの発生
`useContext` を呼び出しているコンポーネントは、**Context の値（`value`）が更新されると常に再レンダリング**されます。
頻繁に値が変わるデータを Context に入れると、それを見ている全てのコンポーネントが再レンダリングされ、パフォーマンス低下の原因になるため注意が必要です。

### 2. カスタムフック化の推奨
実務では、`useContext(SomeContext)` を直接コンポーネントに書くよりも、Context を定義したファイル内で **専用のカスタムフック** を作成してエクスポートするのがベストプラクティスです。

```typescript
// ThemeContext.tsx (Context定義ファイル)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ⭕ こうしてカスタムフック化しておく
export function useTheme() {
  const context = useContext(ThemeContext);
  
  // Provider で囲み忘れた場合のエラーを分かりやすくする
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
```

使う側は、以下のように直感的に書けるようになります。
```typescript
// Layout.tsx など
const { theme, toggleTheme } = useTheme();
```
