import Hero from "./components/Hero";

export default function AboutPage() {
  return (
    <>
      <div className="absolute left-0 top-0 -z-1 h-screen w-full overflow-hidden">
        <div className="absolute right-0 top-0 -z-1 h-[30vw] w-[30vw] -translate-y-1/4 translate-x-1/4 scale-150 rounded-full bg-gradient-to-bl from-secondary to-transparent opacity-40 saturate-150" />
      </div>
      <Hero />
      <section className="relative flex aspect-video flex-col items-center justify-center bg-[url('/images/illustrations/farmland.png')] bg-cover bg-fixed bg-top">
        <div className="absolute left-0 top-0 z-0 flex h-full w-full flex-col items-center bg-gradient-to-b from-transparent via-[#00000099] to-[#00000088] leading-snug tracking-wide" />
        {/* <img
          src="/images/illustrations/farmland.png"
          alt="farmland"
          className="relative aspect-video w-full object-cover object-top"
        /> */}
        <div className="p-page relative z-1 flex flex-col items-center gap-y-3 text-center text-white drop-shadow-lg">
          <h1 className="my-8 text-7xl font-bold">OUR VISION</h1>
          <p>
            AgroSurance envisions a future where farmers worldwide have seamless
            access to transparent and reliable crop insurance. Through the
            utilization of advanced technologies such as blockchain and
            Chainlink, we aim to revolutionize the insurance industry and
            empower farmers to protect their livelihoods effectively. By
            simplifying the insurance process, fostering transparency, and
            promoting sustainable practices, we strive to contribute to the
            resilience and prosperity of the global agricultural community.
          </p>
          <p>
            We aspire to create a user-friendly dApp that enables farmers to
            easily manage their insurance needs, from selecting crops to
            receiving real-time quotes based on precise risk assessments. By
            leveraging blockchain's immutability, we ensure transparency and
            trust throughout the insurance journey, while our strategic
            collaborations with agricultural experts and stakeholders drive
            ongoing innovation and improvement. With our transformative approach
            to agricultural insurance, we aim to provide farmers with the
            confidence and financial stability necessary to make informed
            decisions, invest in their operations, and thrive in an
            ever-changing world. Together, we can shape a future where
            agriculture flourishes, and farmers are equipped with the tools they
            need to cultivate a sustainable and prosperous world.
          </p>
        </div>
      </section>
      <section className="p-page">
        <video src="/videos/application-ease.mp4" autoPlay muted loop></video>
      </section>
    </>
  );
}
