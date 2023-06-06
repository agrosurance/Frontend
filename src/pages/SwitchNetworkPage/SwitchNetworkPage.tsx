export default function SwitchNetworkPage() {
  const correctNetwork = "Polygon";

  return (
    <>
      <section className="flex min-h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-y-4 border bg-background px-8 py-4 shadow-lg">
          <p className="font-raleway text-3xl font-semibold tracking-tight text-secondary">
            Wrong Network!
          </p>
          <p className="text-front text-opacity-80">
            Please connect to the appropriate {correctNetwork} Network
          </p>
          <button className="rounded-lg bg-secondary px-5 py-2 text-back duration-300 hover:-translate-y-1 hover:saturate-150">
            Switch to {correctNetwork} Chain
          </button>
        </div>
      </section>
    </>
  );
}
