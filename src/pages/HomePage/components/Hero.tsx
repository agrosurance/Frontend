export default function Hero() {
  return (
    <section className="h-screen p-page flex">
      <div className="flex flex-col">
        <h1 className="text-7xl font-semibold leading-snug py-12">
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
      </div>
      <div className="flex-1"></div>
    </section>
  );
}
