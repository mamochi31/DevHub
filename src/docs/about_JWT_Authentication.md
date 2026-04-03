# JWT (JSON Web Token) と 認証機能

モダンな SPA (Single Page Application) において、状態をサーバーに持たせない（ステートレスな）認証方式として最も標準的に使われる技術です。

## 1. JWT の仕組み

1.  **ログイン**: ユーザーがメールアドレスとパスワードをサーバー（Spring Boot）に送る。
2.  **発行**: サーバーは認証に成功すると、ユーザー情報（メールアドレス等）と「有効期限」を含み、**秘密鍵で署名**した文字列（JWT トークン）を作成して返す。
3.  **保存**: ブラウザ（React）はそのトークンを `localStorage` 等に保存する。
4.  **通信**: 以降、認証が必要な API を叩く際、リクエストヘッダーにトークンを付けて送る（`Authorization: Bearer <token>`）。
5.  **検証**: サーバーはトークンの署名を検証し、改ざんされておらず期限内であればアクセスを許可する。

## 2. Spring Security によるバックエンドの保護

Spring Boot では `SecurityConfig` クラスを作成し、アプリケーション全体のアクセスルールを定義します。

```java
http
    .csrf(csrf -> csrf.disable()) // REST API のため CSRF は無効化
    .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // セッションを使わない
    .authorizeHttpRequests(auth -> auth
        .requestMatchers("/api/auth/**").permitAll() // ログイン・登録は誰でもOK
        .requestMatchers(HttpMethod.GET, "/api/posts/**").permitAll() // 取得(GET)は誰でもOK
        .anyRequest().authenticated() // それ以外はすべて認証(トークン)必須
    )
    // 独自の JWT 検証フィルターを組み込む
    .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
```

## 3. JwtAuthenticationFilter (門番)

API にアクセスが来るたびに実行される自作のフィルターです。
リクエストのヘッダーから `Authorization: Bearer eyJhb...` というトークンを取り出し、署名をチェックします。正しいトークンであれば、Spring Security のコンテキストに「このユーザーは認証済みである」という情報をセットし、後続の Controller へと処理を流します。

## 4. React 側でのトークン管理 (AuthContext)

React では、Context API を使ってアプリ全体でログイン状態とトークンを管理します。
ページをリロードしてもログアウトしないように、取得したトークンはブラウザの `localStorage` に保存します。

## 5. API 通信の共通化 (api.ts)

毎回 `fetch` を書き、手動で `localStorage` からトークンを取り出してヘッダーに詰めるのは冗長でバグの元になります。
これを解決するために、認証トークンを自動付与するラッパー関数（または `axios` のインターセプター）を作成します。

```typescript
// src/utils/api.ts の例
async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");
  const headers = new Headers(options.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  
  return fetch(`${BASE_URL}${url}`, { ...options, headers });
}
```
これにより、各コンポーネントからは `api.post("/api/posts", data)` のように非常に簡潔にセキュアな通信が行えるようになります。