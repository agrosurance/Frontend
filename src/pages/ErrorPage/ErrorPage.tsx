import useError from "../../hooks/useError";

export default function ErrorPage() {
  const error = useError();

  return (
    <>
      <section className="flex min-h-screen   flex-col items-center">
        <div className="my-auto">
          <div className="">
            <img src="/brand.png" className="mb-10 w-[30vw]" />
            <img
              src="/images/sad-farmer.png"
              alt="udaas kisaan"
              className="mx-auto h-[50vh]"
            />
            <p className="my-8 rounded-xl bg-red-500 bg-opacity-90 p-5 text-center font-raleway text-lg font-semibold tracking-tight text-white">
              {error.message}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
