export default function Banner(props: { className?: string }) {
  return (
    <div
      className={`basis-2/5 flex flex-col justify-center px-16 relative items-center gap-y-8 before:absolute before:top-0 before:left-0 
  before:w-full before:h-full before:-z-1 before:bg-primary before:brightness-[83%] duration-1000 ${props.className}`}
    >
      <img src="/images/farmer.png" alt="farmer" className="w-[12ch] invert" />
      <div className="flex flex-col gap-y-4">
        <img
          src="/brand.png"
          alt="logo agrosurance"
          className="brightness-0 invert"
        />
        <p className="px-8 text-center text-back text-md">
          Becoming part of the Agrosurance community.
          <br />
          <span className="font-bold text-front">Register today</span> and
          safeguard your farming legacy.
        </p>
      </div>
    </div>
  );
}
