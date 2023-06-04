import Hero from "./components/Hero";
import Info from "./components/Info";
import Vision from "./components/Vision";

const infoSections = [
  {
    title: "Easy to use",
    content:
      "Using our intuitive platform, farmers can easily navigate the process of insuring their crops. They can add their land, select the desired crops, and receive accurate insurance quotes in real time. Our proprietary algorithm assesses the suitability of the land for the chosen crops, taking into account factors such as soil conditions, climate patterns, and historical data. This ensures that farmers receive fair and customized insurance premiums based on the unique risks associated with their agricultural operations.",
    videoUrl: "/videos/application-ease.mp4",
  },
  {
    title: "Everything on chain with ChainLink",
    content:
      "At AgroSurance, we leverage Chainlink's secure and decentralized oracle network to gather real-time environmental data. Our algorithm cross-references this data with the coordinates of the insured land to determine whether the reported crop damage aligns with the prevailing conditions. If the conditions indicate that the crop loss was indeed caused by factors beyond the farmer's control, we promptly provide insurance coverage. However, if the algorithm's assessment is disputed, our judge protocol comes into action to resolve any discrepancies and ensure a fair outcome.",
    videoUrl: "/videos/chainlink-blur-bg.mp4",
  },
  {
    title: "Trust, inspired by our past endavours",
    content:
      "Transparency and trust are at the core of our values. By leveraging the power of blockchain technology, we bring transparency to the insurance process. Every step, from the initial insurance request to claim settlement, is recorded on the blockchain, creating an immutable and auditable record of transactions. Our use of Chainlink's reliable and secure oracle network further enhances the transparency and integrity of our platform, ensuring that farmers can have complete confidence in the insurance services we provide.",
    videoUrl: "/videos/trust-security.mp4",
  },
  {
    title: "Empowerment done right, action without words",
    content:
      "At AgroSurance, we are committed to empowering farmers, mitigating risks, and fostering sustainable agriculture. We believe that by harnessing the potential of blockchain and smart contract technology, we can transform the agricultural insurance landscape, making it more accessible, efficient, and inclusive for farmers worldwide.",
    videoUrl: "/videos/farmer-rich.mp4",
  },
];

export default function AboutPage() {
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
