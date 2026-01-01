import { createBrowserRouter } from "react-router";
import RegisterPage from "./features/auth/pages/RegisterPage";
import LoginPage from "./features/auth/pages/LoginPage";
import ProfilePage from "./features/user/pages/ProfilePage";
import SessionPage from "./features/session/pages/SessionPage";
import AdminLayout from "./layouts/AdminLayout";
import AdminPage from "./features/admin/pages/AdminPage";
import AppLayout from "./layouts/AppLayout";
import VerificationPage from "./features/auth/pages/VerificationPage";
import ForgotPasswordPage from "./features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "./features/auth/pages/ResetPasswordPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        index: true,
        element: <ProfilePage />,
      },
      {
        path: "/sessions",
        element: <SessionPage />,
      },
      {
        path: "/email/verify/:code",
        element: <VerificationPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        index: true,
        element: <AdminPage />,
      },
    ],
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/password/forgot",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/password/reset/",
    element: <ResetPasswordPage />,
  },
]);

export default router;
