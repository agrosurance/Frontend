export default function Banner(props: { className?: string }) {
  return (
    <div
      className={`relative flex basis-2/5 flex-col items-center justify-center gap-y-8 px-16 duration-1000 before:absolute before:left-0 
  before:top-0 before:-z-1 before:h-full before:w-full before:bg-primary before:brightness-[83%] ${props.className}`}
    >
      <img src="/images/farmer.png" alt="farmer" className="w-[12ch] invert" />
      <div className="flex flex-col gap-y-4">
        <img
          src="/brand.png"
          alt="logo agrosurance"
          className="brightness-0 invert"
        />
        <p className="text-md px-8 text-center text-back">
          Becoming part of the Agrosurance community.
          <br />
          <span className="font-bold text-front">Register today</span> and
          safeguard your farming legacy.
        </p>
      </div>
    </div>
  );
}
