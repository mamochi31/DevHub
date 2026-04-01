/**
 * スキルページ
 */
export function SkillsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">
          My Skills
        </h1>
        <p className="text-gray-500 mt-3 text-lg">技術スタック</p>
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
