import { useState } from "react";
import useModal from "../../../hooks/useModal";
import { clamp } from "../../../utils";

export default function StakingModal() {
  const modal = useModal();

  const [amount, setAmount] = useState<number>(0);

  return (
    <div className="relative flex min-w-[30%] flex-col overflow-hidden rounded-xl bg-back pb-8">
      <button
        className="absolute right-4 top-4 scale-110 text-back duration-300 hover:scale-125"
        onClick={() => {
          modal.hide();
        }}
      >
        <span className="material-icons">&#xe5cd;</span>
      </button>
      <h2 className="mb-10 bg-primary py-10 text-center font-raleway text-4xl font-bold tracking-tighter text-white">
        Overview
      </h2>
      <div className=" flex min-w-[40%] flex-col gap-y-2 rounded-2xl  px-10">
        <h4 className="text-md font-medium">Stake</h4>
        <div className="order-opacity-50 flex flex-row items-center rounded-xl border border-front">
          <span className="border border-r-front px-2 py-2 text-4xl">
            <img src="/logo.png" alt="logo" className="w-[1.5ch]" />
          </span>
          <input
            type="number"
            placeholder="Enter the number of stakes"
            className="text-md w-full px-2"
            step={0.00001}
            value={amount}
            onChange={(e) => {
              setAmount(clamp(Number(e.target.value), { min: 0, max: 9999 }));
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 px-10 py-8">
        <h6>You will recieve:</h6>
        <div className="flex flex-row justify-center gap-x-8">
          <div className="flex aspect-square w-[48%] flex-col items-center  justify-center rounded-full border-4 border-primary px-2 py-1 text-front">
            <span className="text-3xl font-bold">{amount.toFixed(5)}</span>
            <span>LMATIC</span>
            <span className="text-xs text-front text-opacity-60">now</span>
          </div>
          <div className="flex aspect-square w-[48%] flex-col items-center justify-center  rounded-full border-4 border-primary px-2 py-1 text-front">
            <span className="text-3xl font-bold">
              {(amount * 0.2).toFixed(5)}
            </span>
            <span>Agro-coins</span>
            <span className="text-xs text-front text-opacity-60">/month</span>
          </div>
        </div>
      </div>
      <button className="w-max self-center rounded-lg border border-primary bg-primary bg-opacity-10 px-6 py-2 font-medium text-primary duration-500 hover:bg-opacity-100 hover:text-background">
        Grant
      </button>
    </div>
  );
}
