import { useState } from "react";

export default function WithdrawModal() {
  const [loading, setLoading] = useState(false);
  const [enable, setEnable] = useState(false);
  return (
    <div className="bg-back min-w-[30%] py-20 rounded-2xl px-20 ">
      {loading ? (
        <div className="flex flex-col items-center ">
          <img src="/loading.gif" alt="loading" className="h-48" />
          <p className="text-5xl font-bold text-front">Loading...</p>
        </div>
      ) : enable ? (
        <div>hAHA</div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-xl text-center text-red-500">
            <span className="text-2xl font-bold">Uhh ohh,</span>
            <br /> You can't withdraw at this moment
          </p>
        </div>
      )}
    </div>
  );
}
