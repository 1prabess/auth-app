import { NavLink } from "react-router";

type NavbarProps = {
  isAdmin: boolean;
};

const Navbar = ({ isAdmin }: NavbarProps) => {
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
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
