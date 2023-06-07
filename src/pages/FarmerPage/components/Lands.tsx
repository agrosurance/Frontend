import { Land } from "../../../interfaces/Data";
import LandCard from "./LandCard";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

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
