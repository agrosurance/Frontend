import { createRef, useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import MaterialIcon from "../../../common/MaterialIcon";
import useModal from "../../../hooks/useModal";
import { clamp } from "../../../utils";
import { useAuthContext } from "../../../contexts/AuthContext";
import { ethers } from "ethers";

export default function WithdrawModal() {
  const [enable, loading] = useFetch<{ enabled: boolean }>("/dummy.json", {
    initial: { enabled: false },
    cacheTimeout: 1,
  });

  return (
    <div className="relative min-w-[30%] overflow-hidden rounded-2xl bg-back">
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
      <p className="animate-pulse text-5xl font-bold text-front">Loading...</p>
    </div>
  );
}

function DisabledState() {
  const modal = useModal();

  return (
    <div className="text-red-500">
      <button
        className="absolute right-6 top-6 scale-110 text-white duration-300 hover:scale-125"
        onClick={modal.hide}
      >
        <MaterialIcon codepoint="e5cd" />
      </button>
      <h2 className="mb-10 bg-red-500 py-10 text-center font-raleway text-4xl font-bold tracking-tighter text-white">
        Oh No!
      </h2>
      <div className="flex items-center px-20 pb-10">
        <MaterialIcon codepoint="e811" className="text-8xl" />
        <div className="ml-4 flex flex-1 flex-col items-center gap-y-1 text-front">
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
  const amountRef = createRef<HTMLInputElement>();

  const { signer, stakingManagerContract } = useAuthContext();

  useEffect(() => {
    if (!stakingManagerContract) return;

    (async () => {})();
  }, [stakingManagerContract]);

  async function unstake(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!stakingManagerContract) return;

    const amount = ethers.utils.parseEther(amountRef.current?.value || "0");

    if (amount.eq(0)) return;

    const tx = await stakingManagerContract.unstake(amount);
    await tx.wait(1);
    modal.hide();
  }

  return (
    <div>
      <button
        className="absolute right-6 top-6 scale-110 text-white duration-300 hover:scale-125"
        onClick={modal.hide}
      >
        <MaterialIcon codepoint="e5cd" />
      </button>
      <h2 className="mb-10 bg-secondary py-10 text-center font-raleway text-4xl font-bold tracking-tighter text-white">
        Withdraw?
      </h2>
      <div className="flex flex-col justify-center px-6 pb-10">
        <form
          onSubmit={unstake}
          className="mx-auto flex flex-row items-center gap-x-4 "
        >
          <div className="flex flex-row items-center rounded-xl border border-front">
            <MaterialIcon
              codepoint="e8fb"
              className="w-max scale-125 self-center border border-transparent border-r-front px-1 text-4xl  text-secondary"
            />
            <input
              required
              type="number"
              ref={amountRef}
              placeholder="Enter the number of stakes"
              className="text-md w-full px-2"
              step={0.00001}
              min={0.00001}
              max={9999}
            />
            <span className="whitespace-nowrap border border-transparent border-l-front px-3 py-3">
              MATIC
            </span>
          </div>
          <button className="text-md rounded-xl bg-secondary px-2 py-3 font-semibold text-back duration-300 hover:-translate-y-1 hover:brightness-110">
            Unstake
          </button>
        </form>
      </div>
    </div>
  );
}
