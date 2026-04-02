import { PageHeader } from "../components/PageHeader";

/**
 * アバウトページ（自己紹介画面）
 */
export function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <PageHeader title="自己紹介" />
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 transition-colors duration-300">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-2xl">
            👨‍💻
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100">
              F.D
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Full-stack Engineer
            </p>
          </div>
        </div>
        <div className="space-y-4 text-gray-700 dark:text-slate-300 leading-relaxed">
          <p>
            Java (Spring Boot) TypeScriptを中心とした業務システム開発に5年従事。
            現在は Spring Boot と React の技術向上、 AWS
            クラウドインフラを習得し、
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
