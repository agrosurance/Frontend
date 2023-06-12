import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useForceUpdate } from "../hooks/useForceUpdate";
import { useAuthContext } from "../contexts/AuthContext";

const navItems = [
  { title: "About Us", to: "/about" },
  // { title: "How it works", to: "/dashboard" },
  { title: "Contact", to: "/contact" },
];

const hiddenAt = ["/auth"];

export default function Navbar() {
  const [hideNav, setHideNav] = useState(false);

  const { provider, signer, setSigner } = useAuthContext();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setHideNav(hiddenAt.includes(location.pathname));
  }, [location]);

  async function connect() {
    if (!provider) return;

    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    setSigner(signer);
    navigate("/dashboard");
  }

  async function logout() {
    setSigner(null);
  }

  return (
    <nav
      className={twMerge(
        "p-page flex justify-center py-12 text-[15px] font-medium tracking-tight text-front text-opacity-70",
        hideNav ? "hidden" : ""
      )}
    >
      <div className="flex flex-1 items-center gap-x-14">
        {navItems.map((item, i) => (
          <Link
            key={i}
            to={item.to}
            className="py-2 duration-300 hover:text-primary hover:brightness-75"
          >
            {item.title}
          </Link>
        ))}
      </div>
      <div>
        <Link to={signer ? "/dashboard" : "/"}>
          <img
            src="/brand.png"
            alt="agrosure"
            draggable={false}
            className="aspect-auto max-h-8"
          />
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-end gap-x-14">
        {signer && (
          <Link
            to="/stake"
            className="duration-300 hover:text-primary hover:brightness-75"
          >
            Become a Staker
          </Link>
        )}
        {signer ? (
          <span className="cursor-pointer" onClick={logout}>
            Logout
          </span>
        ) : (
          <button onClick={connect} className="btn-2 px-6 py-2 tracking-normal">
            Connect
          </button>
        )}
      </div>
    </nav>
  );
}
