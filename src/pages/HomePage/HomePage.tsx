import Hero from "./components/Hero";

export default function HomePage() {
  return (
    <>
      <div className="absolute left-0 top-0 -z-1 h-[30vw] w-[30vw] -translate-x-1/4 -translate-y-1/4 scale-150 rounded-full bg-gradient-to-br from-secondary to-transparent opacity-40" />
      <Hero />
    </>
  );
}
