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
      <div className="absolute left-0 top-0 -z-1 h-full w-full bg-primary brightness-[83%]"></div>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="material-icons absolute left-5 top-5 z-20 flex aspect-square items-center rounded-full border-2 border-back px-2 text-2xl brightness-0 invert transition-all duration-300 hover:scale-125 hover:cursor-pointer"
      >
        &#xe5c4;
      </button>
      <div className="flex h-screen flex-row overflow-hidden">
        <Banner className={animFlag ? "translate-x-0" : "-translate-x-full"} />
        <Form className={animFlag ? "translate-x-0" : "translate-x-full"} />
      </div>
    </>
  );
}
