import { PageHeader } from "../components/PageHeader";

/**
 * スキルページ
 */
export function SkillsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <PageHeader title="スキルセット" />
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
          <p>■言語</p>
          <p>
            Java17（4年9ヵ月） / TypeScript（3年） / JavaScript（3年） /
            SQL（4年9ヵ月）
          </p>
          <p>■FW</p>
          <p>Spring Boot（4年9ヵ月） / React（3年） / Express（3年）</p>
          <p>■DB</p>
          <p>PostgreSQL</p>
          <p>■その他</p>
          <p>
            Git / Visual Studio Code / nginx / Google Apps Script / Karate /
            Docker / Jenkins
          </p>
        </div>
      </div>
    </div>
  );
}
