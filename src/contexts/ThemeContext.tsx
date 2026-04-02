import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

// Contextを作成(初期値undefined)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Providerの定義
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // useStateの引数に関数を渡すことで、初回レンダリング時のみこのロジックが実行されます（Lazy Initialization）
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      return savedTheme;
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light"; // どちらもなければデフォルトはlight
  });

  // テーマが変更されたら html タグに class を付与し、状態を保存する
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Theme切り替え用の関数(現在がlightならdark、darkならlightへ)
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // <ThemeProvider>で囲んだコンポーネントがchildrenとなり、valueで渡した値にアクセス可能になる
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
