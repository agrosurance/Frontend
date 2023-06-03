import useModal from "../../../../hooks/useModal";
import MaterialIcon from "../../../../common/MaterialIcon";
import { number } from "prop-types";

export default function AddLand() {
  const modal = useModal();

  return (
    <div className="relative flex min-w-[40%] flex-col overflow-hidden rounded-2xl bg-back">
      {" "}
      <button
        className="absolute right-6 top-6 scale-110 text-back duration-300 hover:scale-125"
        onClick={modal.hide}
      >
        <MaterialIcon codepoint="e5cd" />
      </button>
      <h2 className="mb-10 bg-primary py-10 text-center font-raleway text-4xl font-bold tracking-tighter text-white">
        Add Crop
      </h2>
      <div className="flex flex-col gap-y-8 px-10 pb-10">
        <div className="flex flex-col">
          <h2>Name</h2>
          <input
            type="text"
            placeholder="Enter the name of the land"
            className="w-full rounded-lg border border-solid border-front px-4 py-2 active:border"
          />
        </div>
        <div className="flex flex-col">
          <h2>Location</h2>
          <div className="flex flex-row gap-x-4">
            <div className="flex flex-row items-center justify-between overflow-hidden rounded-lg border border-front px-2 py-2">
              <input
                step="0.001"
                type="number"
                placeholder="Enter Latitude here"
              />
              <span>° N</span>
            </div>
            <div className="flex flex-1 flex-row items-center justify-between overflow-hidden rounded-lg border border-front px-2 py-2">
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
            className="w-full rounded-lg border border-solid border-front px-4 py-2 active:border"
            placeholder="Enter area of the land"
          />
        </div>
        <button className="btn w-max self-center rounded-md  bg-primary px-4 py-1 text-back shadow duration-300 hover:-translate-y-1 hover:shadow-lg hover:brightness-110">
          Submit
        </button>
      </div>
    </div>
  );
}
