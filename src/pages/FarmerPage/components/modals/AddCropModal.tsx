interface AddCropModalProps {
  landId: number;
}
import useModal from "../../../../hooks/useModal";
import MaterialIcon from "../../../../common/MaterialIcon";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { createRef } from "react";
import { useDataContext } from "../../../../contexts/DataContext";

export default function AddCropModal(props: AddCropModalProps) {
  const modal = useModal();
  const selectorRef = createRef<HTMLSelectElement>();
  const { crops } = useDataContext();
  const { agroSuranceLandContract } = useAuthContext();

  async function growCrop(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agroSuranceLandContract) return;

    const cropId = selectorRef.current?.value as string;
    const from = Math.round(new Date().getTime() / 1000);
    const to = from + 90 * 24 * 60 * 60;
    const estimatedGas =
      await agroSuranceLandContract.estimateGas.addCurrentCycle(
        props.landId,
        cropId,
        from,
        to
      );
    const tx = await agroSuranceLandContract.addCurrentCycle(
      props.landId,
      cropId,
      from,
      to,
      { gasLimit: estimatedGas.mul(11).div(10) }
    );
    await tx.wait(1);
    modal.hide();
  }

  return (
    <div className="relative flex min-w-[30%] flex-col overflow-hidden rounded-2xl bg-back">
      <button
        className="absolute right-6 top-6 scale-110 text-back duration-300 hover:scale-125"
        onClick={modal.hide}
      >
        <MaterialIcon codepoint="e5cd" />
      </button>
      <h2 className="mb-10 bg-primary py-10 text-center font-raleway text-4xl font-bold tracking-tighter text-white">
        Add Crop
      </h2>
      <div className="flex w-max flex-col items-center gap-y-3 self-center pb-8">
        What are you growing ? (select one)
        <form onSubmit={growCrop} className="flex w-full flex-row gap-x-2">
          <select
            required
            ref={selectorRef}
            className="flex-1 rounded-md border border-front border-opacity-60 px-2 py-2 text-lg"
          >
            {Object.keys(crops).map((cropId: any) => (
              <option key={cropId} value={cropId} className="text-sm">
                {crops[cropId].name}
              </option>
            ))}
          </select>
          <button
            className="flex items-end gap-x-2 rounded-xl bg-primary px-2 py-3 text-sm font-semibold text-back
          duration-300 hover:-translate-y-1 hover:brightness-110"
          >
            Add <MaterialIcon codepoint="f205" />
          </button>
        </form>
      </div>
    </div>
  );
}
