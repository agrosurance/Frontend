import { useEffect, useRef, useState } from "react";
import useModal from "../../../hooks/useModal";

export default function StakingModal() {
  const stakeRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const modal = useModal();

  return (
    <div className="w-[33%] px-10 py-10 flex flex-col rounded-2xl gap-y-8 bg-back relative">
      <button
        className="absolute right-10"
        onClick={() => {
          modal.hide();
        }}
      >
        <span className="material-icons">&#xe5cd;</span>
      </button>
      <h1 className="self-center text-2xl font-bold text-primary">Overview</h1>
      <div>
        <h4 className="text-md font-medium">Stakes</h4>
        <div className="flex flex-row items-center border-front border border-opacity-50 rounded-xl">
          <span className="text-4xl py-2 px-2 border border-r-front">
            <img src="/logo.png" alt="logo" className="w-[1.5ch]" />
          </span>
          <input
            type="number"
            placeholder="Enter the number of stakes"
            className="text-md px-2 w-full"
            step={0.0001}
            ref={stakeRef}
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <h6>You will recieve:</h6>
        <div className="flex flex-row gap-x-8 justify-center">
          <div className="border-4 border-primary text-front px-5 py-1 rounded-full aspect-square flex flex-col justify-center items-center">
            <span className="font-bold text-3xl">{stakeRef.current.value}</span>
            <span>L-matic</span>
          </div>
          <div className="border-4 border-primary text-front py-1 px-2 rounded-full aspect-square flex flex-col justify-center items-center">
            <span className="font-bold text-3xl">{stakeRef.current.value}</span>
            <span>Agro-coins</span>
          </div>
        </div>
      </div>
      <button className="border border-primary px-5 py-1 bg-primary bg-opacity-10 text-primary rounded-lg font-medium duration-500 hover:bg-opacity-100 hover:text-background">
        Grant
      </button>
    </div>
  );
}
