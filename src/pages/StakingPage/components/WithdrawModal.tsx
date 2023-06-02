import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import MaterialIcon from "../../../common/MaterialIcon";

export default function WithdrawModal() {
  const [enable, loading] = useFetch<{ enabled: boolean }>(
    "https://api.npoint.io/16919b31a418895a7b42",
    { initial: { enabled: false }, cacheTimeout: 1 }
  );

  return (
    <div className="bg-back min-w-[30%] py-20 rounded-2xl px-20 ">
      {loading ? (
        <div className="flex flex-col items-center ">
          <img src="/loading.gif" alt="loading" className="h-48" />
          <p className="text-5xl font-bold text-front">Loading...</p>
        </div>
      ) : enable.enabled ? (
        <div>hAHA</div>
      ) : (
        <div className="flex flex-col items-center">
          <MaterialIcon codepoint="e811" />
          <p className="text-xl text-center text-red-500">
            <span className="text-2xl font-bold">Uhh ohh,</span>
            <br /> You can't withdraw at this moment
          </p>
        </div>
      )}
    </div>
  );
}
