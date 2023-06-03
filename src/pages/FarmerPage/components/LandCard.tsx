import { twMerge } from "tailwind-merge";
import { Land } from "../../../interfaces/Data";
import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import useModal from "../../../hooks/useModal";
import AddCropModal from "./modals/AddCropModal";
import MakeClaimModal from "./modals/MakeClaimModal";
import GetInsuranceModal from "./modals/GetInsuranceModal";

interface LandCardProps {
  land: Land;
  landId: number;
}

export default function LandCard(props: LandCardProps) {
  const land = props.land;
  const modal = useModal();

  const [decodedLocation, loadingDecodedLocation] = useFetch<{
    data: { locality?: string; region: string }[];
  }>(
    `http://api.positionstack.com/v1/reverse?access_key=${
      import.meta.env.VITE_POSITIONSTACK_APIKEY
    }&query=${land.location.latitude},${land.location.longitude}`,
    { cacheTimeout: 24 * 60 * 60 * 1000 }
  );

  return (
    <div className="flex rounded-2xl border border-front border-opacity-30 shadow-md">
      <div className="lands-center flex h-full basis-1/4 flex-col gap-y-5 self-center border-r border-front border-opacity-30 p-5">
        <img
          src={land.crop ? land.crop.imageUrl : "/images/lands/untilled.png"}
          alt={land.crop ? land.crop.name : "empty farmland"}
          className="object-contain"
          draggable={false}
        />
        <h2 className="rounded-md bg-front bg-opacity-10 px-4 py-1 text-center font-raleway text-xl font-semibold capitalize tracking-tight text-front">
          {land.name}
        </h2>
      </div>
      <div className="flex flex-1 flex-col gap-y-5 p-6 text-lg">
        {
          <div
            className={twMerge(
              "pointer-events-none w-max rounded-md bg-opacity-10 px-3 py-2 selection:hidden",
              land.insurance.isInsured
                ? "bg-primary text-primary"
                : "bg-red-500 text-red-500"
            )}
            draggable={false}
          >
            {land.insurance.isInsured ? (
              <p className="flex items-center gap-x-1">
                <span className="material-icons">&#xe8e8;</span>
                This land is insured till{" "}
                {new Date(land.insurance.insuredTill).toLocaleDateString()}
              </p>
            ) : (
              <p className="flex items-center gap-x-1">
                <span className="material-icons">&#xe99a;</span>
                This land is not insured
              </p>
            )}
          </div>
        }
        <p className="text-xl">Crop : {land.crop ? land.crop.name : "None"}</p>
        <p className="text-xl">
          Location :{" "}
          <span
            className={`${
              loadingDecodedLocation
                ? "animate-pulse bg-front bg-opacity-20 px-2"
                : ""
            }`}
          >
            {" "}
            {`${
              !loadingDecodedLocation &&
              decodedLocation &&
              decodedLocation.data &&
              decodedLocation.data[0]
                ? decodedLocation.data[0].locality ||
                  decodedLocation.data[0].region
                : "loading"
            }`}
          </span>{" "}
          <span className="text-sm">
            {land.location.latitude}° N, {land.location.longitude}° E{" "}
          </span>
        </p>
        <p className="text-xl">Area : {land.area} Acres</p>
      </div>
      <div className="m-5 h-full w-[18%] self-center">
        <button
          onClick={() => {
            !land.crop
              ? modal.show(<AddCropModal landId={props.landId} />)
              : land.insurance.isInsured
              ? modal.show(<MakeClaimModal landId={props.landId} />)
              : modal.show(<GetInsuranceModal landId={props.landId} />);
          }}
          className={`group flex aspect-square w-full flex-col items-center justify-center gap-y-5 rounded-xl bg-opacity-10 text-2xl duration-300 hover:bg-opacity-100 hover:text-background ${
            !land.crop
              ? "bg-primary text-primary"
              : land.insurance.isInsured
              ? "bg-red-500 text-red-500"
              : " bg-blue-500 text-blue-500"
          }
        `}
        >
          {!land.crop ? (
            <>
              <span className="material-icons text-6xl group-hover:animate-pulse">
                &#xe146;
              </span>
              <p>Add Crop</p>
            </>
          ) : land.insurance.isInsured ? (
            <>
              <span className="material-icons text-6xl group-hover:animate-pulse">
                &#xe002;
              </span>
              <p>Make Claim</p>
            </>
          ) : (
            <>
              <span className="material-icons text-6xl group-hover:animate-pulse">
                &#xe146;
              </span>
              <p>Get Insured</p>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
