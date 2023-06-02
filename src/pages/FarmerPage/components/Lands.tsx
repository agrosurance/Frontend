import { twMerge } from "tailwind-merge";
import { Land } from "../../../interfaces/Data";
import LandCard from "./LandCard";

const lands: Land[] = [
  {
    name: "bekaar zameen",
    insurance: {
      isInsured: false,
    },
    location: {
      latitude: 19.0601,
      longitude: 73.014,
    },
    area: 90,
  },
  {
    name: "Zameen e Virasat",
    crop: { name: "Carrot", imageUrl: "/images/lands/carrot.png" },
    insurance: {
      isInsured: true,
      insuredTill: Date.now() + 31234560000,
    },
    location: {
      latitude: 21.0601,
      longitude: 74.564,
    },
    area: 120,
  },
  {
    name: "Looti hui",
    crop: { name: "Corn", imageUrl: "/images/lands/corn.png" },
    insurance: {
      isInsured: true,
      insuredTill: Date.now() + 8122450000,
    },
    location: {
      latitude: 19.5601,
      longitude: 83.6147,
    },
    area: 20,
  },
  {
    name: "Idhar Farmhouse Banaundga",
    crop: { name: "Maize", imageUrl: "/images/lands/maize.png" },
    insurance: {
      isInsured: false,
    },
    location: {
      latitude: 53.0601,
      longitude: 13.014,
    },
    area: 5,
  },
  {
    name: "as dry as your girl",
    insurance: {
      isInsured: false,
    },
    location: {
      latitude: 49.0601,
      longitude: 23.014,
    },
    area: 100,
  },
];

export default function Lands() {
  return (
    <section className="p-page flex flex-col gap-y-10">
      <h1 className="-mb-3 font-bold font-raleway tracking-tight text-3xl text-center">
        My Lands{" "}
      </h1>
      {lands.map((land, i) => (
        <LandCard land={land} key={i} landId={i} />
      ))}
    </section>
  );
}
