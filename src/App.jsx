import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import FrontPage from "./pages/FrontPage";
import LoginPage from "./pages/LoginPage";
import AppPage from "./pages/AppPage";
import PageNotFound from "./pages/PageNotFound";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SignupPage from "./pages/SignupPage";
import ForgotPass from "./pages/ForgotPass";
import { ScreenSize } from "./context/ScreenContext";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/forex/" replace />,
  },
  {
    path: "forex",
    children: [
      {
        path: "",
        element: <FrontPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "forgot",
        element: <ForgotPass />,
      },
      {
        path: "app",
        element: <AppPage />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <ScreenSize>
      <RouterProvider router={router} />
    </ScreenSize>
  );
}

export default App;
