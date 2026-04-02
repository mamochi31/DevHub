import { NavLink } from "react-router-dom";

type NavigationLinkProps = {
  to: string;
  children: React.ReactNode;
};

export const NavigationLink = ({ to, children }: NavigationLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-sm font-medium transition-colors ${
          isActive
            ? "text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 dark:border-blue-400"
            : "text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-300"
        }`
      }
    >
      {children}
    </NavLink>
  );
};
