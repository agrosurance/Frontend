import { twMerge } from "tailwind-merge";
import { Land } from "../../../interfaces/Data";
import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";

interface LandCardProps {
  land: Land;
}

export default function LandCard(props: LandCardProps) {
  const land = props.land;

  const [decodedLocation, loadingDecodedLocation] = useFetch<{
    data: { locality?: string; region: string }[];
  }>(
    `http://api.positionstack.com/v1/reverse?access_key=${
      import.meta.env.VITE_POSITIONSTACK_APIKEY
    }&query=${land.location.latitude},${land.location.longitude}`,
    { cacheTimeout: 24 * 60 * 60 * 1000 }
  );

  return (
    <div className="border border-front border-opacity-30 shadow-md rounded-2xl flex">
      <div className="basis-1/4 flex flex-col h-full self-center lands-center gap-y-5 p-5 border-r border-front border-opacity-30">
        <img
          src={land.crop ? land.crop.imageUrl : "/images/lands/untilled.png"}
          alt={land.crop ? land.crop.name : "empty farmland"}
          className="object-contain"
        />
        <h2 className="text-xl text-center font-semibold font-raleway tracking-tight capitalize bg-front text-front bg-opacity-10 px-4 py-1 rounded-md">
          {land.name}
        </h2>
      </div>
      <div className="flex-1 flex flex-col p-6 gap-y-5 text-lg">
        {
          <div
            className={twMerge(
              "w-max py-2 px-3 rounded-md bg-opacity-10",
              land.insurance.isInsured
                ? "bg-primary text-primary"
                : "bg-red-500 text-red-500"
            )}
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
                ? "px-2 bg-front bg-opacity-20 animate-pulse"
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
      <div className="w-[18%] h-full self-center m-5">
        <button
          className={`aspect-square w-full flex flex-col items-center justify-center gap-y-5 text-2xl rounded-xl bg-opacity-10 duration-300 hover:bg-opacity-100 group hover:text-background ${
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
