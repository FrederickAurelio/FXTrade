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
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ScreenSize>
        <RouterProvider router={router} />
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "white",
              color: "var(--color-grey-700)",
            },
          }}
        />
        <ReactQueryDevtools initialIsOpen={true} />
      </ScreenSize>
    </QueryClientProvider>
  );
}

export default App;
