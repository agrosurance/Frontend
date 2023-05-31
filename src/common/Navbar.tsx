import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useForceUpdate } from "../hooks/useForceUpdate";

const navItems = [
  { title: "About Us", to: "/about" },
  { title: "How it works", to: "/methodology" },
  { title: "Contact", to: "/dashboard" },
];

const hiddenAt = ["/auth"];

export default function Navbar() {
  const [hideNav, setHideNav] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setHideNav(hiddenAt.includes(location.pathname));
  }, [location]);

  return (
    <nav
      className={twMerge(
        "p-page py-12 flex justify-center text-front text-opacity-70 font-medium tracking-tight text-[15px]",
        hideNav ? "hidden" : ""
      )}
    >
      <div className="flex-1 flex items-center gap-x-14">
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
        <Link to="/">
          <img
            src="/brand.png"
            alt="agrosure"
            draggable={false}
            className="aspect-auto max-h-8"
          />
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-end gap-x-14">
        <Link
          to="/stake"
          className="duration-300 hover:text-primary hover:brightness-75"
        >
          Become a Staker
        </Link>
        <Link to="/auth" className="btn-2 px-6 py-2 tracking-normal">
          Get Insured
        </Link>
      </div>
    </nav>
  );
}
