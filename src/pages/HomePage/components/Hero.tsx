export default function Hero() {
  return (
    <section className="p-page flex">
      <div className="flex flex-col py-12 gap-y-5">
        <h1 className="text-7xl font-semibold leading-snug">
          Insure your crops
          <br />
          the <span className="border-secondary border-sketch mr-4">smart</span>
          way
        </h1>
        <p className="text-front text-opacity-60 text-lg">
          Insurance can be complicated but it doesn't have to be <br />
          You can rely on{" "}
          <span className="text-primary font-semibold">Agrosurance</span> to
          provide you with the best terms
        </p>
        <div className="my-10">
          <button className="font-semibold text-2xl flex items-center relative">
            Get a quote{" "}
            <span
              className="material-icons text-5xl bg-front text-back mx-3 p-3 aspect-square rounded-full relative before:content-visible before:absolute before:top-0 duration-500
            before:left-0 before:w-full before:h-full before:scale-110 before:border-2 before:rounded-full before:border-primary group-hover:before:bg-primary"
            >
              &#xf1b6;
            </span>
          </button>
        </div>
        <div className="my-3 flex max-w-[45vw] gap-x-8">
          <div className="flex max-w-[45%] gap-x-5">
            <img
              src="https://cryptologos.cc/logos/chainlink-link-logo.png?v=025"
              alt="chainlink"
              className="aspect-square brightness-0 opacity-50 w-14"
            />
            <p className="text-sm text-front text-opacity-50">
              We calculate our quotes based on real time data collected ON CHAIN
            </p>
          </div>
          <div className="flex max-w-[45%] gap-x-5">
            <img
              src="https://cryptologos.cc/logos/chainlink-link-logo.png?v=025"
              alt="chainlink"
              className="aspect-square brightness-0 opacity-50 w-14"
            />
            <p className="text-sm text-front text-opacity-50">
              We calculate our quotes based on real time data collected ON CHAIN
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div
          className="w-[80%] h-[90%] bg-primary rounded-t-full rounded-bl-full rounded-br-[130rem] 
        bg-[url('https://images.unsplash.com/photo-1536147210925-5cb7a7a4f9fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZW4lMjBwbGFudHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80')]"
        ></div>
      </div>
    </section>
  );
}
