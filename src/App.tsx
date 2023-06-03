import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
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

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/stake" element={<StakingPage />} />
        <Route path="/dashboard" element={<FarmerPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
    )
  );

  return (
    <GlobalContextProvider>
      <RouterProvider router={router} />
    </GlobalContextProvider>
  );
}

// Riya
// 2012419177

function Root() {
  const modal = useModal();

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
