import useError from "../../../hooks/useError";

export default function Hero() {
  return (
    <section className="p-page flex">
      <div className="flex flex-col gap-y-5 py-12">
        <h1 className="text-7xl font-semibold leading-snug">
          Insure your crops
          <br />
          the <span className="border-sketch mr-4 border-secondary">smart</span>
          way
        </h1>
        <p className="text-lg text-front text-opacity-60">
          Insurance can be complicated but it doesn't have to be <br />
          You can rely on{" "}
          <span className="font-semibold text-primary">Agrosurance</span> to
          provide you with the best terms
        </p>
        <div className="my-10">
          <button className="relative flex items-center text-2xl font-semibold">
            Get a quote{" "}
            <span
              className="material-icons relative mx-3 aspect-square rounded-full bg-front p-3 text-5xl text-back duration-500 before:absolute before:left-0 before:top-0
            before:h-full before:w-full before:scale-110 before:rounded-full before:border-2 before:border-primary before:content-visible group-hover:before:bg-primary"
            >
              &#xf1b6;
            </span>
          </button>
        </div>
        <div className="my-3 flex max-w-[45vw] gap-x-8">
          <div className="flex max-w-[45%] gap-x-5">
            <img
              draggable={false}
              src="https://cryptologos.cc/logos/chainlink-link-logo.png?v=025"
              alt="chainlink"
              className="aspect-square w-14 opacity-50 brightness-0"
            />
            <p className="text-sm text-front text-opacity-50">
              We calculate our quotes based on real time data collected ON CHAIN
            </p>
          </div>
          <div className="flex max-w-[45%] gap-x-5">
            <img
              draggable={false}
              src="/logo.png"
              alt="chainlink"
              className="aspect-square w-14 opacity-50 brightness-0"
            />
            <p className="text-sm text-front text-opacity-50">
              Our stakers help us maintain liquidity and get duely REWARDED
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div
          className="h-[95%] w-[80%] rounded-t-full rounded-bl-full rounded-br-[145rem] bg-primary 
        bg-[url('https://images.unsplash.com/photo-1536147210925-5cb7a7a4f9fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZW4lMjBwbGFudHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80')]"
        ></div>
      </div>
    </section>
  );
}
