export default function Header() {
  return (
    <header className="p-page my-3 flex items-stretch">
      <div
        className="basis-2/3 h-max flex items-end relative before:absolute before:content-visible before:bottom-0 before:left-0 before:h-[90%] before:w-[95%] before:bg-primary before:-z-1
      before:bg-opacity-70 before:rounded-3xl"
      >
        <div className="flex">
          <div className="pl-10 pt-12 pb-8 w-min">
            <h1 className="text-back font-semibold whitespace-nowrap text-xl tracking-wider">
              Welcome, {"Darinda Besharam"} !
            </h1>
            <p className="text-back text-xs my-3 text-opacity-80 font-medium">
              We hope you and your crops are doing absolutely wonderful ! Just
              in case anything has went south, do make a claim for it.
              <br />
              Make sure you have all your farmlands registered and insured with
              us
            </p>
            <button className="bg-secondary font-medium text-back px-4 py-1 rounded-md shadow duration-300 hover:brightness-110 hover:-translate-y-1 hover:shadow-lg">
              Claim
            </button>
          </div>
        </div>
        <div
          className="flex-1 relative h-full pointer-events-none selection:hidden"
          draggable={false}
        >
          <div className="absolute z-1 top-0 left-0 h-full w-full content-visible" />
          <img
            src="/images/dashboard-banner-cutout.png"
            alt="farmers USA INDIA CHINA"
            className="object-bottom pointer-events-none selection:hidden"
            draggable={false}
          />
        </div>
      </div>
      <div className="flex-1 min-h-full max-h-full flex flex-col justify-between gap-y-2 items-center py-10 px-14">
        <button className="bg-primary p-3 bg-opacity-20 rounded-xl flex items-center text-primary px-6 justify-between text-2xl duration-300 hover:bg-opacity-70 hover:text-back">
          <img
            src="/images/placeholder-land.png"
            alt="land"
            className="w-[38%]"
          />
          <h3 className="font-raleway font-semibold tracking-tight">
            Add Land
          </h3>
        </button>
        <button className="bg-secondary relative p-3 bg-opacity-20 rounded-xl flex items-center text-secondary px-6 justify-between text-2xl duration-300 hover:bg-opacity-70 hover:text-back">
          <img src="/images/ruined-land.png" alt="land" className="w-[38%]" />
          <h3 className="font-raleway font-semibold tracking-tight">
            Make Claim
          </h3>
        </button>
      </div>
    </header>
  );
}
