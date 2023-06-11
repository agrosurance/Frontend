import useModal from "../../../../hooks/useModal";
import MaterialIcon from "../../../../common/MaterialIcon";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { createRef } from "react";
import { ethers } from "ethers";

export default function AddLand() {
  const modal = useModal();
  const nameRef = createRef<HTMLInputElement>();
  const latRef = createRef<HTMLInputElement>();
  const longRef = createRef<HTMLInputElement>();
  const areaRef = createRef<HTMLInputElement>();

  const { agroSuranceLandContract } = useAuthContext();

  async function addLand(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!agroSuranceLandContract) return;
    const name = nameRef.current?.value || "";
    const lat = ethers.utils.parseUnits(
      (latRef.current?.value || 0).toString(),
      6
    );
    const long = ethers.utils.parseUnits(
      (longRef.current?.value || 0).toString(),
      6
    );
    const area = ethers.utils.parseUnits(
      (areaRef.current?.value || 0).toString(),
      6
    );

    const estimatedGas = await agroSuranceLandContract.estimateGas.addLand(
      name,
      lat,
      long,
      area
    );
    const tx = await agroSuranceLandContract.addLand(name, lat, long, area, {
      gasLimit: estimatedGas.mul(11).div(10),
    });
    await tx.wait(1);

    modal.hide();
  }

  return (
    <div className="relative flex min-w-[40%] flex-col overflow-hidden rounded-2xl bg-back">
      <button
        className="absolute right-6 top-6 scale-110 text-back duration-300 hover:scale-125"
        onClick={modal.hide}
      >
        <MaterialIcon codepoint="e5cd" />
      </button>
      <h2 className="mb-10 bg-primary py-10 text-center font-raleway text-4xl font-bold tracking-tighter text-white">
        Add Land
      </h2>
      <form onSubmit={addLand} className="flex flex-col gap-y-8 px-10 pb-10">
        <div className="flex flex-col">
          <h2>Name</h2>
          <input
            ref={nameRef}
            required
            type="text"
            placeholder="Enter the name of the land"
            className="w-full rounded-lg border border-solid border-front px-4 py-2 active:border"
          />
        </div>
        <div className="flex flex-col">
          <h2>Location</h2>
          <div className="flex flex-row gap-x-4">
            <div className="flex w-full basis-1/2 flex-row items-center justify-between overflow-hidden rounded-lg border border-front px-2 py-2">
              <input
                ref={latRef}
                required
                min="-90"
                max="90"
                step="0.000001"
                type="number"
                placeholder="Enter Latitude here"
                className="basis-2/3"
              />
              <span>° N</span>
            </div>
            <div className="flex flex-1 flex-row items-center justify-between overflow-hidden rounded-lg border border-front px-2 py-2">
              <input
                ref={longRef}
                required
                min="-180"
                max="180"
                step="0.000001"
                type="number"
                placeholder="Enter Latitude here"
              />
              <span>
                <span>° E</span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h2>Area</h2>
          <input
            ref={areaRef}
            required
            step="0.000001"
            min="0.000001"
            type="number"
            className="w-full rounded-lg border border-solid border-front px-4 py-2 active:border"
            placeholder="Enter area of the land in Acre"
          />
        </div>
        <button className="btn w-max self-center rounded-md  bg-primary px-4 py-1 text-back shadow duration-300 hover:-translate-y-1 hover:shadow-lg hover:brightness-110">
          Submit
        </button>
      </form>
    </div>
  );
}
