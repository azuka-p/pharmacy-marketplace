import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Root from "./layout/rootLayout";
import { authRoutes } from "./pages/auth";
import { NonVerifiedRoutes, userRoutes, VerifiedRoutes } from "./pages/user";
import { adminRoutes } from "./pages/admin";
import { pharmacistRoutes } from "./pages/pharmacist";
import PrivateLayoutAdmin from "./layout/privateLayoutAdmin";
import NotFoundPage from "./pages/notFoundPage";
import UserLayout from "./layout/userLayout";
import VerifiedLayout from "./layout/verifiedLayout";
import NonVerifiedLayout from "./layout/nonVerifiedLayout";
import PrivateLayoutPharmacist from "./layout/privateLayoutPharmacist";

const base = "/"

const router = createBrowserRouter([
  {
    path: base,
    element: <Root />,
    children: [
      {
        path: `${base}/auth`,
        children: authRoutes,
      },
      {
        path: base,
        element: <UserLayout />,
        children: [
          {
            path: "",
            children: userRoutes,
          },
          {
            path: `${base}/user`,
            element: <NonVerifiedLayout />,
            children: [
              {
                path: "",
                children: NonVerifiedRoutes,
              },
            ],
          },
          {
            path: `${base}/user`,
            element: <VerifiedLayout />,
            children: [
              {
                path: "",
                children: VerifiedRoutes,
              },
            ],
          },
        ],
      },
      {
        path: base,
        element: <PrivateLayoutAdmin />,
        children: [
          {
            path: `${base}/admin`,
            children: adminRoutes,
          },
        ],
      },
      {
        path: base,
        element: <PrivateLayoutPharmacist />,
        children: [
          {
            path: `${base}/pharmacist`,
            children: pharmacistRoutes,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
