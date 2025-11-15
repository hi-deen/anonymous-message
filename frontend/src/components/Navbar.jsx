import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 shadow-md bg-white dark:bg-gray-900 dark:text-white">
      <Link to="/" className="text-2xl font-bold text-emerald-600">
        AnonymousApp
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/login" className="hover:text-emerald-600">
          Login
        </Link>
        <Link to="/register" className="hover:text-emerald-600">
          Register
        </Link>

        <ThemeToggle />
      </div>
    </nav>
  );
}
