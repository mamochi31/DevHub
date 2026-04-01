/**
 * アバウトページ（自己紹介画面）
 */
export function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">About Me</h1>
        <p className="text-gray-500 mt-3 text-lg">挑戦の記録</p>
      </header>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
            👨‍💻
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">F.D</h2>
            <p className="text-sm text-gray-500">Full-stack Engineer</p>
          </div>
        </div>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            Java (Spring Boot) TypeScriptを中心とした業務システム開発に5年従事。
            現在は Spring Boot と React の技術向上、 AWS クラウドインフラを習得し、
            一人でフルスタックにサービスを構築できるエンジニアを目指しています。
          </p>
          <p>
            このブログは、学んだことのアウトプットの場として自作しています。
          </p>
        </div>
      </div>
    </div>
  );
}