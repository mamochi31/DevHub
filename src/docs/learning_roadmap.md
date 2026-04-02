# F.D's Full-stack Learning Roadmap 2026

## 1. プロフィール & 目標

- **名前**: F.D

- **バックグラウンド**: Java (Spring Boot) を中心とした業務システム開発 5年。

- **現在の役割**: Java Backend Engineer / TypeScript 学習中。

- **最終目標**:
  - Spring Boot + React + AWS を駆使し、一人でフルスタックにサービスを構築できるエンジニアになる。
  - 自作の Dev Hub を通じて、学習プロセスを外部へアウトプットする。

## 2. 現在のフェーズ: React Frontend (Foundation)

React を用いたフロントエンド構築の基礎を固めている段階。

### ✅ 完了したマイルストーン

- [x] **環境構築**: Vite + React + TypeScript + Tailwind CSS のセットアップ。

- [x] **コンポーネント設計**: 役割に応じたファイル分割（components, features, pages）。

- [x] **ルーティング (Advanced)**:
  - react-router-dom の導入。
  - Layout コンポーネントによる共通テンプレート化（Outlet の活用）。
  - App.tsx の肥大化を防ぐための RouteObject 配列によるルーティング定義の切り出し。

- [x] **Git/GitHub 連携**: リポジトリ作成とソースコード管理の開始。

## 3. 今後の学習計画 (Upcoming Modules)

### Phase 1: 動的データと非同期処理 (完了 ✅)

- [x] **Hooks 深掘り**: useState だけではなく useEffect を使ったライフサイクル管理。

- [x] **API 通信**: fetch または axios を用いたモックデータ（または外部API）からの記事取得。

- [x] **ローディング・エラー状態**: 通信中のローディング表示やエラーハンドリングの UI 実装。

### Phase 2: 状態管理とフォーム処理 (完了 ✅)

- [x] **グローバル状態管理**: Context API を用いた、ページを跨ぐデータの共有。

- [x] **フォーム入力**: React Hook Form 等を使った記事投稿・編集機能。

- [x] **バリデーション**: Zod を用いた入力値の型安全な検証。

### Phase 3: バックエンド連携 (Spring Boot) (Next Step 🚀)

- [ ] **REST API 構築**: 記事 (Post) に対する CRUD (作成・読み取り・更新・削除) 機能の実装。

- [ ] **CORS 対策**: フロントエンド (Vite) とバックエンドの接続設定。

- [ ] **認証機能**: JWT (JSON Web Token) 等を用いたログイン機能の実装。

### Phase 4: インフラ & デプロイ (AWS)

- [ ] **静的配信**: AWS S3 + CloudFront による React の配信。

- [ ] **コンテナ化**: Docker を用いた Spring Boot の環境構築。

- [ ] **デプロイ**: AWS App Runner または ECS へのデプロイ。
