import { Land } from "../../../interfaces/Data";
import LandCard from "./LandCard";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { InsuranceManager } from "../../../typechain";

async function checkInsuranceStatus(
  insuranceManagerContract: InsuranceManager,
  landId: ethers.BigNumber
) {
  const totalInsuranceRequests = await insuranceManagerContract.totalInsurances(
    landId
  );
  if (totalInsuranceRequests.eq(0)) return { isInsured: false, insuredTill: 0 };
  const lastInsuranceRequestId =
    await insuranceManagerContract.insuranceHistory(
      landId,
      totalInsuranceRequests.sub(1)
    );
  const lastInsuranceRequest = await insuranceManagerContract.quoteRequests(
    lastInsuranceRequestId
  );
  const validity = new Date(Number(lastInsuranceRequest.insuranceTo) * 1000);
  if (!lastInsuranceRequest.isInsured || validity <= new Date())
    return { isInsured: false, insuredTill: 0 };
  return {
    isInsured: true,
    insuredTill: validity.getTime(),
  };
}

export default function Lands() {
  const { agroSuranceLandContract, insuranceManagerContract, signer } =
    useAuthContext();
  const [lands, setLands] = useState<any[]>([]);

  useEffect(() => {
    if (!agroSuranceLandContract || !signer || !insuranceManagerContract)
      return;

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
        const insurance = await checkInsuranceStatus(
          insuranceManagerContract,
          landId
        );
        const landObj: Land = {
          name: land.name,
          insurance,
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
  }, [agroSuranceLandContract, signer, insuranceManagerContract]);

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
