export default function Hero() {
  return (
    <section className="p-page flex">
      <video width="320" height="240" autoPlay={true} muted loop>
        <source src="/videos/happy-farmer1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <section className="p-page z-10 m-12 flex bg-red-500 before:bg-black"></section>
    </section>
  );
}
