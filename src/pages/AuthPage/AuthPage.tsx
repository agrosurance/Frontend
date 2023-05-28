import { useEffect, useState } from "react";
import Banner from "./components/Banner";
import Form from "./components/Form";

export default function AuthPage() {
  const [animFlag, setAnimFlag] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimFlag(true);
    }, 200);
  }, []);

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full -z-1 bg-primary brightness-[83%]"></div>
      <div className="flex flex-row h-screen overflow-hidden">
        <Banner className={animFlag ? "translate-x-0" : "-translate-x-full"} />
        <Form className={animFlag ? "translate-x-0" : "translate-x-full"} />
      </div>
    </>
  );
}
