import { Outlet, Navigate } from "react-router";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Navbar from "@/components/ui/Navbar";

const AdminLayout = () => {
  const { data: user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Checking permissions...</div>;
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-7xl mx-auto px-8">
      <Navbar isAdmin={true} />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
