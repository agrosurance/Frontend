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

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/stake" element={<StakingPage />} />
        <Route path="/dashboard" element={<FarmerPage />} />
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
          "fixed top-0 left-0 w-full h-screen flex justify-center items-center z-[100] bg-[#00000045] duration-500",
          modal.element ? "opacity-100" : "opacity-0 pointer-events-none"
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
