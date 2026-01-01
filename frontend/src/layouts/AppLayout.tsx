import { Navigate, Outlet } from "react-router";
import Navbar from "../components/ui/Navbar";
import { useAuth } from "../features/auth/hooks/useAuth";

const AppLayout = () => {
  const { data: user, isPending } = useAuth();

  const isAdmin = user?.role === "admin";

  if (isPending) {
    return <div>Checking auth...</div>;
  }

  return (
    <div className="max-w-7xl m-auto px-8">
      {user ? (
        <div>
          <Navbar isAdmin={isAdmin} />
          <Outlet />
        </div>
      ) : (
        <Navigate to={"/login"} />
      )}
    </div>
  );
};

export default AppLayout;
