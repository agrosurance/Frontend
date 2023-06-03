import useModal from "../../../../hooks/useModal";
import MaterialIcon from "../../../../common/MaterialIcon";
import { number } from "prop-types";

export default function AddLand() {
  const modal = useModal();

  return (
    <div className="bg-back min-w-[40%] rounded-2xl relative overflow-hidden flex flex-col">
      {" "}
      <button
        className="absolute right-6 top-6 text-back duration-300 scale-110 hover:scale-125"
        onClick={modal.hide}
      >
        <MaterialIcon codepoint="e5cd" />
      </button>
      <h2 className="text-4xl bg-primary py-10 text-white font-bold font-raleway tracking-tighter text-center mb-10">
        Add Crop
      </h2>
      <div className="px-10 flex flex-col gap-y-8 pb-10">
        <div className="flex flex-col">
          <h2>Name</h2>
          <input
            type="text"
            placeholder="Enter the name of the land"
            className="w-full py-2 border border-solid border-front rounded-lg active:border px-4"
          />
        </div>
        <div className="flex flex-col">
          <h2>Location</h2>
          <div className="flex flex-row gap-x-4">
            <div className="border-front border rounded-lg overflow-hidden px-2 py-2 flex flex-row items-center justify-between">
              <input
                step="0.001"
                type="number"
                placeholder="Enter Latitude here"
              />
              <span>° N</span>
            </div>
            <div className="flex-1 border-front border rounded-lg overflow-hidden px-2 py-2 flex flex-row items-center justify-between">
              <input
                step="0.001"
                type="number"
                placeholder="Enter Latitude here"
              />
              <span>
                <span>° E</span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h2>Area</h2>
          <input
            type="text"
            className="py-2 border border-solid border-front rounded-lg active:border px-4 w-full"
            placeholder="Enter area of the land"
          />
        </div>
        <button className="bg-primary btn w-max self-center  px-4 py-1 rounded-md shadow duration-300 hover:brightness-110 hover:-translate-y-1 hover:shadow-lg text-back">
          Submit
        </button>
      </div>
    </div>
  );
}
