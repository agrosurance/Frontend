import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import MaterialIcon from "../../../common/MaterialIcon";
import useModal from "../../../hooks/useModal";
import { clamp } from "../../../utils";

export default function WithdrawModal() {
  const [enable, loading] = useFetch<{ enabled: boolean }>("/dummy.json", {
    initial: { enabled: false },
    cacheTimeout: 1,
  });

  return (
    <div className="bg-back min-w-[30%] rounded-2xl relative overflow-hidden">
      {loading ? (
        <LoadingState />
      ) : !enable.enabled ? (
        <DisabledState />
      ) : (
        <WithdrawState />
      )}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center p-20">
      <img src="/loading.gif" alt="loading" className="h-48" />
      <p className="text-5xl font-bold text-front animate-pulse">Loading...</p>
    </div>
  );
}

function DisabledState() {
  const modal = useModal();

  return (
    <div className="text-red-500">
      <button
        className="absolute right-6 top-6 text-white duration-300 scale-110 hover:scale-125"
        onClick={modal.hide}
      >
        <MaterialIcon codepoint="e5cd" />
      </button>
      <h2 className="text-4xl bg-red-500 py-10 text-white font-bold font-raleway tracking-tighter text-center mb-10">
        Oh No!
      </h2>
      <div className="flex items-center px-20 pb-10">
        <MaterialIcon codepoint="e811" className="text-8xl" />
        <div className="flex flex-1 flex-col items-center gap-y-1 ml-4 text-front">
          <p>Unfortunately, you can't withdraw right now</p>
          <p>Don't worry, your MATIC is safe with us</p>
          <p>meanwhite you can use your LMATIC</p>
        </div>
      </div>
    </div>
  );
}

function WithdrawState() {
  const modal = useModal();

  const [amount, setAmount] = useState<number>(0);

  return (
    <div className="">
      <button
        className="absolute right-6 top-6 text-white duration-300 scale-110 hover:scale-125"
        onClick={modal.hide}
      >
        <MaterialIcon codepoint="e5cd" />
      </button>
      <h2 className="text-4xl bg-secondary py-10 text-white font-bold font-raleway tracking-tighter text-center mb-10">
        Withdraw?
      </h2>
      <div className="px-6 flex flex-col justify-center">
        <div className="flex flex-row gap-x-4 items-center">
          <div className="flex flex-row items-center border-front border rounded-xl">
            <MaterialIcon
              codepoint="e8fb"
              className="scale-125 text-4xl self-center text-secondary w-max border border-r-front px-1  border-transparent"
            />
            <input
              type="number"
              placeholder="Enter the number of stakes"
              className="text-md px-4 w-[90%]"
              step={0.00001}
              value={amount}
              onChange={(e) => {
                setAmount(clamp(Number(e.target.value), { min: 0, max: 9999 }));
              }}
            />
            <span className="border border-l-front px-3 border-transparent whitespace-nowrap py-3">
              L-Matic
            </span>
          </div>
          <button className="bg-secondary px-2 py-3 rounded-xl text-md text-back font-semibold duration-300 hover:brightness-110 hover:-translate-y-1">
            Claim
          </button>
        </div>
        <div className="flex flex-row justify-around py-6">
          <div className="flex flex-col items-center gap-y-2">
            <div className="text-xl font-semibold">You will get</div>
            <div className="border-4 border-secondary text-front py-1 px-2 rounded-full aspect-square flex flex-col justify-center items-center">
              <span className="font-bold text-3xl">{amount.toFixed(4)}</span>
              <span>Matic</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
