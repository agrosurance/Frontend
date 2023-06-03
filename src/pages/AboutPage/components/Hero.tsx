export default function Hero() {
  return (
    <section className="p-page flex items-center overflow-hidden">
      <video
        className="relative -z-1 basis-1/2 scale-125 object-cover"
        autoPlay
        muted
        loop
      >
        <source src="/videos/happy-farmer1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative flex basis-1/2 flex-col items-center gap-y-8">
        <div className="flex flex-col items-center gap-y-2 text-center font-raleway text-5xl font-semibold text-primary">
          <h1 className="font-bold brightness-75">
            First Farmer-First Initiative
          </h1>
          <h2 className="saturate-150">for provably fair rates on</h2>
          <h2 className="saturate-150">farmland insurance</h2>
        </div>
        <p className="px-2 text-sm">
          At AgroSurance, we are revolutionizing the way farmers protect their
          crops. We understand the challenges and uncertainties that farmers
          face when it comes to safeguarding their livelihoods, and we are
          committed to providing innovative solutions through our decentralized
          application (dApp) powered by Chainlink. <br /> <br /> Our mission is
          simple: to provide farmers with transparent, reliable, and efficient
          crop insurance. We believe that every farmer deserves access to
          affordable insurance that is tailored to their specific needs and
          backed by advanced technology.
        </p>
      </div>
    </section>
  );
}
