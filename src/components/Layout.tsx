import { NavLink, Outlet } from "react-router-dom";
import { NavigationLink } from "./NavigationLink";
import { useTheme } from "../contexts/ThemeContext";

export function Layout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col font-sans text-slate-900 dark:text-slate-50 transition-colors duration-300">
      <nav className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6 h-16 flex justify-between items-center">
          <NavLink
            to="/"
            className="text-xl font-bold text-blue-600 dark:text-blue-400"
          >
            DevHub
          </NavLink>

          <div className="flex items-center gap-4">
            <NavigationLink to="/">Home</NavigationLink>
            <NavigationLink to="/about">About</NavigationLink>
            <NavigationLink to="/skills">Skills</NavigationLink>
            <NavigationLink to="/posts/new">Create Post</NavigationLink>
            <button
              onClick={toggleTheme}
              className="ml-4 flex items-center gap-1.5 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus:outline-none"
              aria-label="Toggle Dark Mode"
            >
              <span className="text-xs select-none">light</span>
              <div
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 ${
                  theme === "dark" ? "bg-blue-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${
                    theme === "dark" ? "translate-x-4.5" : "translate-x-1"
                  }`}
                />
              </div>
              <span className="text-xs select-none">dark</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="py-10 flex-grow">
        <Outlet />
      </main>

      <footer className="py-8 text-center text-gray-400 dark:text-gray-500 text-sm border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-colors duration-300">
        &copy; 2026 F.D
      </footer>
    </div>
  );
}
