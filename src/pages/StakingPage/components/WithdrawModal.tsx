import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import MaterialIcon from "../../../common/MaterialIcon";
import useModal from "../../../hooks/useModal";

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
        <div>hAHA</div>
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
