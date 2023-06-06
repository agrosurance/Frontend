import { useEffect } from "react";
import useError from "../../hooks/useError";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const error = useError();
  const navigate = useNavigate();

  useEffect(() => {
    if (!error.message) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <section className="flex min-h-screen flex-col items-center">
        <img
          src="/images/sad-farmer.png"
          alt="udaas kisaan"
          className="ml-10 h-[50vh]"
        />
        <p className="my-8 max-w-[50%] rounded-xl bg-red-500 bg-opacity-90 p-5 text-center font-raleway text-lg font-semibold tracking-tight text-white">
          {error.message}
        </p>
        <button
          className="rounded-lg border-2 border-red-500 border-opacity-90 px-8 py-2 font-medium text-red-500 duration-300 hover:bg-red-500 hover:text-white"
          onClick={error.clear}
        >
          Okay
        </button>
      </section>
    </>
  );
}
