import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Footer from "./common/Footer";
import Navbar from "./common/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import { GlobalContextProvider } from "./contexts/globalContext";
import StakingPage from "./pages/StakingPage/StakingPage";
import useModal from "./hooks/useModal";
import { twMerge } from "tailwind-merge";
import FarmerPage from "./pages/FarmerPage/FarmerPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import { useEffect } from "react";
import { AuthContextProvider } from "./contexts/AuthContext";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import SwitchNetworkPage from "./pages/SwitchNetworkPage/SwitchNetworkPage";
import useError from "./hooks/useError";
import { DataContextProvider } from "./contexts/DataContext";
import AuthRequired from "./common/AuthRequired";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/stake"
          element={
            <AuthRequired>
              <StakingPage />
            </AuthRequired>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AuthRequired>
              <FarmerPage />
            </AuthRequired>
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/network-error" element={<SwitchNetworkPage />} />
        <Route path="/error" element={<ErrorPage />} />
      </Route>
    )
  );

  return (
    <GlobalContextProvider>
      <AuthContextProvider>
        <DataContextProvider>
          <RouterProvider router={router} />
        </DataContextProvider>
      </AuthContextProvider>
    </GlobalContextProvider>
  );
}

function Root() {
  const modal = useModal();

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location]);

  return (
    <main className="relative">
      <div
        className={twMerge(
          "fixed left-0 top-0 z-[100] flex h-screen w-full items-center justify-center bg-[#00000045] duration-500",
          modal.element ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        {modal.element}
      </div>
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}
