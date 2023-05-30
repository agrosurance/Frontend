import { useEffect, useState } from "react";
import Banner from "./components/Banner";
import Form from "./components/Form";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [animFlag, setAnimFlag] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setAnimFlag(true);
    }, 200);
  }, []);

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full -z-1 bg-primary brightness-[83%]"></div>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="material-icons absolute left-5 top-5 z-20 border-2 border-back rounded-full px-2 flex items-center brightness-0 invert text-2xl aspect-square hover:scale-125 hover:cursor-pointer transition-all duration-300"
      >
        &#xe5c4;
      </button>
      <div className="flex flex-row h-screen overflow-hidden">
        <Banner className={animFlag ? "translate-x-0" : "-translate-x-full"} />
        <Form className={animFlag ? "translate-x-0" : "translate-x-full"} />
      </div>
    </>
  );
}
