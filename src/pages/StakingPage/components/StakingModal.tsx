import { createRef, useEffect, useState } from "react";
import useModal from "../../../hooks/useModal";
import { useAuthContext } from "../../../contexts/AuthContext";
import { ethers } from "ethers";

export default function StakingModal() {
  const modal = useModal();

  const { stakingManagerContract } = useAuthContext();
  const amountRef = createRef<HTMLInputElement>();
  const [totalStaked, setTotalStaked] = useState<ethers.BigNumber>();
  const [totalRewardRate, setTotalRewardRate] = useState<ethers.BigNumber>();
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    if (!stakingManagerContract) return;

    (async () => {
      const _rewardRateInWei = await stakingManagerContract.totalRewardRate();
      setTotalRewardRate(_rewardRateInWei);
      const _totalStaked = await stakingManagerContract.totalStaked();
      setTotalStaked(_totalStaked);
    })();
  }, [stakingManagerContract]);

  function calculateEarning() {
    if (!totalStaked || !totalRewardRate) return 0;
    const _amount = ethers.utils.parseEther(amountRef.current?.value || "0");

    const finalStaked = _amount.add(totalStaked);
    const reward = totalRewardRate
      .mul(_amount)
      .mul(30 * 60 * 60 * 24)
      .div(finalStaked);
    return Number(ethers.utils.formatEther(reward));
  }

  async function stake(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!stakingManagerContract) return;

    const amount = ethers.utils.formatEther(amountRef.current?.value || "0");
    const tx = await stakingManagerContract.stake({ value: amount });
    await tx.wait(1);
    modal.hide();
  }

  return (
    <div className="relative flex min-w-[30%] flex-col items-center overflow-hidden rounded-xl bg-back pb-8">
      <button
        className="absolute right-4 top-4 scale-110 text-back duration-300 hover:scale-125"
        onClick={() => {
          modal.hide();
        }}
      >
        <span className="material-icons">&#xe5cd;</span>
      </button>
      <h2 className="mb-10 self-stretch bg-primary py-10 text-center font-raleway text-4xl font-bold tracking-tighter text-white">
        Overview
      </h2>
      <h4 className="text-md mb-2 px-10 font-medium">Stake</h4>
      <form
        onSubmit={stake}
        className="flex min-w-[40%] gap-x-2 gap-y-2 rounded-2xl px-10"
      >
        <div className="order-opacity-50 flex flex-row items-center rounded-xl border border-front">
          <span className="border border-r-front px-2 py-2 text-4xl">
            <img src="/logo.png" alt="logo" className="w-[1.5ch]" />
          </span>
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
        </div>
        <button className="w-max self-center rounded-lg border border-primary bg-primary bg-opacity-10 px-6 py-2 font-medium text-primary duration-500 hover:-translate-y-1 hover:bg-opacity-100 hover:text-background">
          Stake
        </button>
      </form>
      <div className="flex flex-col gap-y-2 px-10 py-8">
        <h6>You will recieve:</h6>
        <div className="flex flex-row justify-center gap-x-8">
          <div className="flex aspect-square  flex-col items-center justify-center  rounded-full border-4 border-primary px-2 py-1 text-front">
            <span className="text-3xl font-bold">
              {calculateEarning().toFixed(5)}
            </span>
            <span>Agro-coins</span>
            <span className="text-xs text-front text-opacity-60">/month</span>
          </div>
        </div>
      </div>
    </div>
  );
}
