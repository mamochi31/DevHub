const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * 認証トークンを自動で付与して fetch を実行するラッパー関数
 */
async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");
  const headers = new Headers(options.headers);

  // トークンがあれば Authorization ヘッダーに追加
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // デフォルトで JSON 形式を指定
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  return response;
}

// HTTPメソッドごとの便利関数をエクスポート
export const api = {
  get: (url: string, options?: RequestInit) => fetchWithAuth(url, { ...options, method: "GET" }),
  post: (url: string, body: unknown, options?: RequestInit) => fetchWithAuth(url, { ...options, method: "POST", body: JSON.stringify(body) }),
  put: (url: string, body: unknown, options?: RequestInit) => fetchWithAuth(url, { ...options, method: "PUT", body: JSON.stringify(body) }),
  delete: (url: string, options?: RequestInit) => fetchWithAuth(url, { ...options, method: "DELETE" }),
};