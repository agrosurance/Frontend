import useModal from "../../../../hooks/useModal";
import MaterialIcon from "../../../../common/MaterialIcon";
import { createRef, useEffect, useState } from "react";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { ethers } from "ethers";
import { useDataContext } from "../../../../contexts/DataContext";

interface GetInsuranceModalProps {
  landId: number;
}
export default function GetInsuranceModal(props: GetInsuranceModalProps) {
  const modal = useModal();
  const { lands } = useDataContext();

  const land = lands.filter((land) => land.id === props.landId)[0];

  let currentState = 0;
  if (land.insurance && land.insurance.insuredTill > new Date()) {
    if (land.insurance.isInsured) {
      modal.hide();
    }

    if (
      land.insurance.insuredFrom >=
      new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
    ) {
      currentState = land.insurance.requestFulfilled ? 2 : 1;
    }
  }

  return (
    <div className="relative min-w-[30%] overflow-hidden rounded-2xl bg-back">
      <button
        className="absolute right-6 top-6 scale-110 text-back duration-300 hover:scale-125"
        onClick={modal.hide}
      >
        <MaterialIcon codepoint="e5cd" />
      </button>

      <h2 className="mb-10 bg-blue-500 py-10 text-center font-raleway text-4xl font-bold tracking-tighter text-white">
        Get Insurance
      </h2>
      {currentState === 0 && <InitialState land={land} />}
      {currentState === 1 && <LoadingState />}
      {currentState === 2 && <SuccessState land={land} />}
      {currentState === 3 && <FailedState />}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="mb-10 flex flex-col items-center gap-y-4 px-10">
      <p>Your request is been processed, You may come back later.</p>
      <button className="text-md flex w-[6ch] items-center justify-center rounded-xl border-2 border-blue-500 px-2 py-2 font-semibold text-blue-500 duration-300 hover:-translate-y-1 hover:brightness-110">
        <MaterialIcon codepoint="e5d5" />
      </button>
    </div>
  );
}

function InitialState({ land }: { land: Land }) {
  const { insuranceManagerContract } = useAuthContext();
  const [maxDate, setMaxDate] = useState("");
  const [minDate, setMinDate] = useState("");
  const coverageRef = createRef<HTMLInputElement>();
  const dateRef = createRef<HTMLInputElement>();

  useEffect(() => {
    const today = new Date();
    const tenDaysLater = new Date();
    tenDaysLater.setDate(today.getDate() + 10);

    const minDateStr = today.toISOString().slice(0, 10);
    const maxDateStr = tenDaysLater.toISOString().slice(0, 10);

    setMinDate(minDateStr);
    setMaxDate(maxDateStr);
  }, []);

  async function getQuotes(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!insuranceManagerContract) return;
    const coverage = ethers.utils.parseEther(coverageRef.current?.value || "0");
    if (!coverage) return;
    if (!dateRef.current || !dateRef.current.value) return;
    const date = Math.round(new Date(dateRef.current.value).getTime() / 1000);
    const estimatedGas =
      await insuranceManagerContract.estimateGas.getInsuranceQuotes(
        land.id,
        date,
        coverage
      );
    const tx = await insuranceManagerContract.getInsuranceQuotes(
      land.id,
      date,
      coverage,
      { gasLimit: estimatedGas.mul(11).div(10) }
    );
    await tx.wait(1);
  }

  return (
    <form onSubmit={getQuotes} className="mb-10 flex flex-col gap-y-6 px-10">
      <div className="flex flex-col gap-y-2">
        <p>How much Insurance do you want to have for this peice of land?</p>
        <div className="flex w-full flex-row justify-between rounded-xl border border-front px-2 py-2">
          <input
            required
            ref={coverageRef}
            type="number"
            step={0.001}
            min={0.001}
            placeholder="Enter amount here"
            className="w-full"
          />
          <MaterialIcon codepoint="e227" />
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <p>Till when you would like to have the Insurance?</p>
        <div className="rounded-xl border border-front px-2 py-2">
          <input
            type="date"
            required
            ref={dateRef}
            className="w-full"
            max={maxDate}
            min={minDate}
          />
        </div>
      </div>

      <div className=" flex flex-row justify-around">
        <button className="text-md whitespace-nowrap rounded-xl bg-blue-500 px-2 py-2 font-semibold text-white duration-300 hover:-translate-y-1 hover:brightness-110">
          Get Quote
        </button>
      </div>
    </form>
  );
}

function FailedState() {
  return (
    <div className="mb-10 flex flex-col gap-y-4 px-10">
      <p className="text-center">
        By our Algorithm, We won't be able to provide you insurance if you grow
        <br />
        this crop on this land
      </p>
      <div className=" flex flex-row justify-around">
        <div className="flex gap-x-10">
          <button className="text-md w-[6ch] rounded-xl bg-blue-500 px-2 py-2 font-semibold text-white duration-300 hover:-translate-y-1 hover:brightness-110">
            Okay
          </button>
        </div>
      </div>
      <p className="w-full text-justify text-sm">
        If you believe this was a mistake, you may raise a case against it.{" "}
        <br />
        our judge protocol will jump into action to ensure your issue is
        resolved
      </p>
      <button className="mr-8 w-max self-end rounded-xl border-2 border-blue-500 px-4 py-1 text-sm text-blue-500 duration-300 hover:border-background hover:bg-blue-500 hover:text-white">
        Report
      </button>
    </div>
  );
}

function SuccessState({ land }: { land: Land }) {
  const { insuranceManagerContract } = useAuthContext();
  const modal = useModal();

  async function buyInsurance() {
    if (!insuranceManagerContract) return;

    const estimatedGas =
      await insuranceManagerContract.estimateGas.buyInsurance(
        (land.insurance as any).requestId,
        {
          value: (land.insurance as any).premium,
        }
      );

    const tx = await insuranceManagerContract.buyInsurance(
      (land.insurance as any).requestId,
      {
        value: (land.insurance as any).premium,
        gasLimit: estimatedGas.mul(11).div(10),
      }
    );
    await tx.wait(1);
    modal.hide();
  }

  return (
    <div className="flex flex-col items-center px-10 text-center">
      <p>
        You need to pay
        <span className="mx-1 font-medium text-blue-500">
          {ethers.utils.formatEther((land.insurance as any).premium)}
        </span>
        dollars for this farmland <br />
        if you opt for a Insurance till
        <span className="mx-1 font-medium text-blue-500">
          {(land.insurance as any).insuredTill.toLocaleDateString()}
          {/* 22/6/2023 */}
        </span>
      </p>
      <button
        onClick={buyInsurance}
        className="my-3 w-max rounded-lg bg-blue-500 px-6 py-2 text-white duration-300 hover:-translate-y-1 hover:saturate-150"
      >
        Confirm
      </button>
    </div>
  );
}
