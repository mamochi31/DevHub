# Spring Boot による REST API 構築

React などのフロントエンドと通信するためのバックエンドサーバーを、Java の Spring Boot フレームワークを使って構築する際の基礎知識です。

## 1. 3層アーキテクチャ

Spring Boot では、役割を明確に分けるために主に以下の3つの層（レイヤー）でクラスを作成します。

*   **Controller（コントローラー）**
    *   **役割**: API の窓口。ブラウザや React からの HTTP リクエスト（GET, POSTなど）を受け取り、適切な Service を呼び出し、その結果を JSON などで返します。
    *   **アノテーション**: `@RestController`, `@RequestMapping("/api/...")`
*   **Service（サービス）**
    *   **役割**: ビジネスロジック（具体的な処理）。「パスワードを暗号化する」「データが存在しなければエラーを出す」といった複雑な処理を担当します。
    *   **アノテーション**: `@Service`
*   **Repository（リポジトリ）**
    *   **役割**: データベースとのやり取り。SQL を意識することなく、データの保存・検索・削除などを行います。
    *   **アノテーション**: `@Repository` (インターフェースとして `JpaRepository` を継承して作成する)

## 2. Entity と DTO

データを格納するクラスですが、用途によって明確に分けます。

### Entity（エンティティ）
*   **データベースのテーブルと1対1で結びつくクラス**です。
*   `@Entity`, `@Table(name = "users")`, `@Id` などの JPA アノテーションをつけて定義します。
*   データベースに保存されるすべての情報（パスワードのハッシュ値など、外部に見せてはいけないものも含む）を持ちます。

### DTO (Data Transfer Object)
*   **ネットワーク通信（リクエストとレスポンス）専用の「データの運び屋」クラス**です。
*   例えばログイン時、React からは「メールアドレス」と「パスワード」だけが送られてきます。データベースの `User` Entity には `id` などもありますが、通信には不要です。
*   このように**「通信に必要なデータだけ」**をまとめた箱を作ることで、セキュリティを高め、コードの意図を明確にします（例：`AuthRequest.java`, `AuthResponse.java`）。

## 3. 主要なアノテーション

*   `@GetMapping` / `@PostMapping` / `@PutMapping` / `@DeleteMapping`: HTTP メソッドと URL をメソッドに紐付けます。
*   `@RequestBody`: リクエストの JSON データを Java のオブジェクトに変換して受け取ります。
*   `@PathVariable`: URL の一部（例: `/api/posts/{id}` の `id` 部分）を変数として受け取ります。
*   `@RequiredArgsConstructor` (Lombok): `final` がついたフィールドのコンストラクタを自動生成します。これを利用して、**コンストラクタインジェクション**（依存性の注入）を簡潔に書くのが現在のベストプラクティスです。

## 4. CORS (Cross-Origin Resource Sharing) 対策

デフォルトでは、ブラウザは異なるポート（例: フロントエンド `5173` と バックエンド `8080`）間の通信をセキュリティの観点からブロックします。
これを許可するために、Spring Boot 側で設定を行います。

### グローバル設定 (WebConfig.java)
```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
    }
}
```
*※ 認証（JWTなど）を使う場合は、Spring Security 側 (`SecurityConfig`) でも `.cors(Customizer.withDefaults())` を有効にする必要があります。*