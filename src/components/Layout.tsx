import { NavLink, Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      
      {/* --- 共通ナビゲーション（ここに移動） --- */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex justify-between items-center">
          <NavLink to="/" className="text-xl font-bold text-blue-600">
            TechBlog UI
          </NavLink>
          
          <div className="flex gap-4">
            <NavLink 
              to="/"
              className={({ isActive }) => 
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-blue-600 font-bold border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/about"
              className={({ isActive }) => 
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-blue-600 font-bold border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'
                }`
              }
            >
              About
            </NavLink>
            <NavLink 
              to="/skills"
              className={({ isActive }) => 
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-blue-600 font-bold border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'
                }`
              }
            >
              Skills
            </NavLink>
          </div>
        </div>
      </nav>

      {/* --- ここに各ページ（HomeやAbout）が流し込まれる --- */}
      <main className="py-10 flex-grow">
        <Outlet /> 
      </main>

      {/* --- 共通フッター（ここに移動） --- */}
      <footer className="py-8 text-center text-gray-400 text-sm border-t bg-white">
        &copy; 2026 F.D
      </footer>
    </div>
  );
}