import { Land } from "../../../interfaces/Data";
import LandCard from "./LandCard";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

// const lands: Land[] = [
//   {
//     name: "bekaar zameen",
//     insurance: {
//       isInsured: false,
//     },
//     location: {
//       latitude: 19.0601,
//       longitude: 73.014,
//     },
//     area: 90,
//   },
//   {
//     name: "Zameen e Virasat",
//     crop: { name: "Carrot", imageUrl: "/images/lands/carrot.png" },
//     insurance: {
//       isInsured: true,
//       insuredTill: Date.now() + 31234560000,
//     },
//     location: {
//       latitude: 21.0601,
//       longitude: 74.564,
//     },
//     area: 120,
//   },
//   {
//     name: "Looti hui",
//     crop: { name: "Corn", imageUrl: "/images/lands/corn.png" },
//     insurance: {
//       isInsured: true,
//       insuredTill: Date.now() + 8122450000,
//     },
//     location: {
//       latitude: 19.5601,
//       longitude: 83.6147,
//     },
//     area: 20,
//   },
//   {
//     name: "Idhar Farmhouse Banaundga",
//     crop: { name: "Maize", imageUrl: "/images/lands/maize.png" },
//     insurance: {
//       isInsured: false,
//     },
//     location: {
//       latitude: 53.0601,
//       longitude: 13.014,
//     },
//     area: 5,
//   },
//   {
//     name: "as dry as your girl",
//     insurance: {
//       isInsured: false,
//     },
//     location: {
//       latitude: 49.0601,
//       longitude: 23.014,
//     },
//     area: 100,
//   },
// ];

export default function Lands() {
  const { agroSuranceLandContract, signer } = useAuthContext();
  const [lands, setLands] = useState<any[]>([]);

  useEffect(() => {
    if (!agroSuranceLandContract || !signer) return;

    (async () => {
      const address = await signer.getAddress();

      const totalLands = await agroSuranceLandContract.balanceOf(address);
      const _lands = [];

      for (let i = 0; i < Number(totalLands); i++) {
        const landId = await agroSuranceLandContract.tokenOfOwnerByIndex(
          address,
          i
        );
        const land = await agroSuranceLandContract.landDetails(landId);
        const landObj: Land = {
          name: land.name,
          insurance: {
            isInsured: false,
          },
          location: {
            latitude: Number(ethers.utils.formatUnits(land.lat, 6)),
            longitude: Number(ethers.utils.formatUnits(land.long, 6)),
          },
          area: Number(ethers.utils.formatUnits(land.area, 6)),
        };

        if (new Date(Number(land.currentCycleTo) * 1000) > new Date()) {
          const crop = await agroSuranceLandContract.cropDetails(
            land.currentCycleCropId
          );
          landObj.crop = { name: crop.name, imageUrl: crop.image };
        }
        _lands.push(landObj);
        console.log("A");
      }
      setLands(_lands);
    })();
  }, [agroSuranceLandContract, signer]);

  return (
    <section className="p-page flex flex-col gap-y-10">
      <h1 className="-mb-3 text-center font-raleway text-3xl font-bold tracking-tight">
        My Lands
      </h1>
      {lands.map((land, i) => (
        <LandCard land={land} key={i} landId={i} />
      ))}
    </section>
  );
}
