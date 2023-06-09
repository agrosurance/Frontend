import LandCard from "./LandCard";
import { useDataContext } from "../../../contexts/DataContext";

export default function Lands() {
  const { lands } = useDataContext();
  console.log(lands);

  return (
    <section className="p-page flex flex-col gap-y-10">
      <h1 className="-mb-3 text-center font-raleway text-3xl font-bold tracking-tight">
        My Lands
      </h1>
      {lands.length ? (
        lands.map((land, i) => <LandCard land={land} key={i} landId={i} />)
      ) : (
        <p className="mt-8 text-center text-lg italic text-front text-opacity-70">
          You have no lands <br /> Lands you add will be listed here
        </p>
      )}
    </section>
  );
}
