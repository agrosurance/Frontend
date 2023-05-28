import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const navItems = [
  { title: "About Us", to: "/abo  ut" },
  { title: "How it works", to: "/methodology" },
  { title: "Contact", to: "/contact" },
];

const hiddenAt = ['/auth']

export default function Navbar() {
  const [hideNav,setHideNav] = useState(false)


  useEffect(()=>{
    setHideNav(hiddenAt.includes(location.pathname))
  },[])

  return (
    <nav className={twMerge("p-page py-12 flex justify-center text-front text-opacity-70 font-medium tracking-tight text-[15px]",hideNav ? 'hidden' :"")}>
      <div className="flex-1 flex items-center gap-x-14">
        {navItems.map((item, i) => (
          <Link key={i} to={item.to} className="py-2">
            {item.title}
          </Link>
        ))}
      </div>
      <div>
        <img src="/brand.png" alt="agrosure" className="aspect-auto max-h-8" />
      </div>
      <div className="flex-1 flex items-center justify-end gap-x-14">
        <Link to="/lands">Manage Lands</Link>
        <Link to="/auth" className="btn-2 px-6 py-2 tracking-normal">
          Get Insured
        </Link>
      </div>
    </nav>
  );
}
