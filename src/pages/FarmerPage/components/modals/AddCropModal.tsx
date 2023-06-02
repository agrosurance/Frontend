interface AddCropModalProps {
  landId: number;
}
import useModal from "../../../../hooks/useModal";
import MaterialIcon from "../../../../common/MaterialIcon";

export default function AddCropModal(props: AddCropModalProps) {
  const modal = useModal();
  return (
    <div className="bg-back min-w-[30%] rounded-2xl relative overflow-hidden flex flex-col">
      <button
        className="absolute right-6 top-6 text-back duration-300 scale-110 hover:scale-125"
        onClick={modal.hide}
      >
        <MaterialIcon codepoint="e5cd" />
      </button>
      <h2 className="text-4xl bg-primary py-10 text-white font-bold font-raleway tracking-tighter text-center mb-10">
        Add Crop
      </h2>
      <div className="flex flex-col items-center pb-8 w-max gap-y-3 self-center">
        What are you growing ? (select one)
        <div className="flex flex-row w-full gap-x-2">
          <select className="px-2 py-2 text-lg border border-front border-opacity-60 rounded-md flex-1">
            {["crop1", "uganunga"].map((item, i) => (
              <option key={i} className="text-sm">
                {item}
              </option>
            ))}
          </select>
          <button
            className="bg-primary px-2 py-3 rounded-xl text-sm text-back font-semibold duration-300 hover:brightness-110 hover:-translate-y-1
          flex items-end gap-x-2"
          >
            Add <MaterialIcon codepoint="f205" />
          </button>
        </div>
      </div>
    </div>
  );
}
