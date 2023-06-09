import useModal from "../../../../hooks/useModal";
import MaterialIcon from "../../../../common/MaterialIcon";
import useFetch from "../../../../hooks/useFetch";

interface MakeClaimModalProps {
  landId: number;
}

export default function MakeClaimModal(props: MakeClaimModalProps) {
  const modal = useModal();

  return (
    <div className="relative min-w-[30%] overflow-hidden rounded-2xl bg-back">
      <button
        className="absolute right-6 top-6 scale-110 text-back duration-300 hover:scale-125"
        onClick={modal.hide}
      >
        <MaterialIcon codepoint="e5cd" />
      </button>

      <h2 className="mb-10 bg-red-500 py-10 text-center font-raleway text-4xl font-bold tracking-tighter text-white">
        Make Claim
      </h2>
      {/* <InitialState /> */}
      {/* <LoadingState /> */}
      <FailedState />
      {/* <SuccessState /> */}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="mb-10 flex flex-col items-center gap-y-4 px-10">
      <p>Your request is been processed, You may come back later.</p>
      <button className="text-md flex w-[6ch] items-center justify-center rounded-xl border-2 border-red-500 px-2 py-2 font-semibold text-red-500 duration-300 hover:-translate-y-1 hover:brightness-110">
        <MaterialIcon codepoint="e5d5" />
      </button>
    </div>
  );
}

function InitialState() {
  const modal = useModal();

  return (
    <div className="mb-10 flex flex-col gap-y-4 px-10">
      <p>Do you really want to make a claim for this piece of land?</p>
      <div className=" flex flex-row justify-around">
        <button className="text-md w-[6ch] rounded-xl bg-red-500 px-2 py-2 font-semibold text-white duration-300 hover:-translate-y-1 hover:brightness-110">
          Yes
        </button>
        <button
          onClick={modal.hide}
          className="text-md w-[6ch] rounded-xl border-2 border-red-500 px-2 py-2 font-semibold text-red-500 duration-300 hover:-translate-y-1 hover:brightness-110"
        >
          No
        </button>
      </div>
    </div>
  );
}

function FailedState() {
  const modal = useModal();
  return (
    <div className="mb-10 flex flex-col gap-y-4 px-10">
      <p>your request was declined, You can't make a claim right now.</p>
      <div className=" flex flex-row justify-around">
        <div className="flex gap-x-10">
          <button
            onClick={() => modal.hide()}
            className="text-md w-[6ch] rounded-xl bg-red-500 px-2 py-2 font-semibold text-white duration-300 hover:-translate-y-1 hover:brightness-110"
          >
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
      <button
        onClick={() =>
          alert(
            "Under Construction!!! Will integrate Kleros Protocol for dispute resolution"
          )
        }
        className="mr-8 w-max self-end rounded-xl border-2 border-red-500 px-4 py-1 text-sm text-red-500 duration-300 hover:border-background hover:bg-red-500 hover:text-white"
      >
        Report
      </button>
    </div>
  );
}

function SuccessState() {
  return (
    <div className="flex flex-col items-center px-10">
      <p>
        You can successfully claim
        <span className="mx-1 font-medium text-red-500">{90}</span>
        MATIC for this farmland
      </p>
      <button className="my-3 w-max rounded-lg bg-red-500 px-6 py-2 text-white duration-300 hover:-translate-y-1 hover:saturate-150">
        Claim
      </button>
    </div>
  );
}
