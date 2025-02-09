import ForgotPasswordPage from "./forgot-password";
import LoginPage from "./login";
import RegisterPage from "./register";
import ResetPasswordPage from "./reset-password";
import VerifyPage from "./verify";

export const authRoutes = [
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
  {
    path: "verify",
    element: <VerifyPage />,
  },
  {
    path: "forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "reset-password",
    element: <ResetPasswordPage />,
  },
];
