import { useLogout } from "@/features/auth/hooks/useLogout";
import { NavLink } from "react-router";
import { Button } from "./button";
import { useAuth } from "@/features/auth/hooks/useAuth";

const Navbar = () => {
  const { data: user } = useAuth();

  const isAdmin = user?.role === "admin";

  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    logout();
  };
  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto flex  items-center justify-between py-4">
        {/* Brand */}
        <span className="text-lg font-semibold text-gray-900">AuthApp</span>

        {/* Links */}
        <ul className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition-colors hover:text-gray-900 ${
                  isActive ? "text-gray-900" : ""
                }`
              }
            >
              Profile
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/sessions"
              className={({ isActive }) =>
                `transition-colors hover:text-gray-900 ${
                  isActive ? "text-gray-900" : ""
                }`
              }
            >
              Sessions
            </NavLink>
          </li>

          {isAdmin && (
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `transition-colors hover:text-gray-900 ${
                    isActive ? "text-gray-900" : ""
                  }`
                }
              >
                Admin
              </NavLink>
            </li>
          )}

          <li>
            <Button type="button" disabled={isPending} onClick={handleLogout}>
              Logout
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
