import useFetch from "../../hooks/useFetch";
import Hero from "./components/Hero";
import Info from "./components/Info";
import Vision from "./components/Vision";

export default function AboutPage() {
  const [infoSections] = useFetch<
    {
      videoUrl: string;
      title: string;
      content: string;
    }[]
  >("/data/about-info.json", { initial: [] });

  return (
    <>
      <div className="absolute left-0 top-0 -z-1 h-screen w-full overflow-hidden">
        <div className="absolute right-0 top-0 -z-1 h-[30vw] w-[30vw] -translate-y-1/4 translate-x-1/4 scale-150 rounded-full bg-gradient-to-bl from-secondary to-transparent opacity-40 saturate-150" />
      </div>
      <Hero />
      <Vision />
      <div className="relative">
        <div className="absolute bottom-0 left-0 -z-1 h-[30vw] w-[30vw] -translate-x-1/2 translate-y-1/4 rounded-full bg-gradient-to-tr from-secondary to-transparent opacity-40 saturate-150" />
        {infoSections.map((sect, i) => (
          <Info
            key={i}
            videoUrl={sect.videoUrl}
            index={i}
            content={sect.content}
            title={sect.title}
          />
        ))}
      </div>
      <section className="p-page mb-20 mt-32 text-center text-xl">
        Join us on this exciting journey as we revolutionize the way farmers
        protect their crops and secure their future. Experience the power of
        transparent and reliable crop insurance with AgroSurance.
        <p className="my-4 text-sm">
          Together, we can cultivate resilience and drive agricultural
          prosperity like never before.
        </p>
      </section>
    </>
  );
}
