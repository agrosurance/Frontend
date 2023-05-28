import Hero from "./components/Hero";

export default function HomePage() {
  return (
    <>
      <div className="absolute top-0 left-0 w-[30vw] h-[30vw] bg-gradient-to-br from-secondary to-transparent opacity-40 scale-150 -translate-x-1/4 -translate-y-1/4 rounded-full -z-1" />
      <Hero />
    </>
  );
}
