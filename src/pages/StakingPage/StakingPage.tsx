import Graph from "./components/Graph";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import useModal from "../../hooks/useModal";
import StakingModal from "./components/StakingModal";
import WithdrawModal from "./components/WithdrawModal";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

Chart.register(CategoryScale);

const chartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
  datasets: [
    {
      data: [55, 43, 56, 52, 38, 48],
    },
  ],
};

export default function StakingPage() {
  const modal = useModal();

  return (
    <>
      <section className="p-page">
        <h1 className="text-4xl font-semibold tracking-tight font-raleway flex items-center gap-x-3">
          <span className="material-icons text-5xl">&#xe871;</span> Staking
          Dashboard
        </h1>
        <div className="my-6 flex justify-between">
          <p className="text-sm flex items-center bg-secondary bg-opacity-10 px-3 py-1 rounded-lg gap-x-2">
            <span className="material-icons text-3xl text-primary">
              &#xf8ff;
            </span>
            {"0xcE7ceFc488dC178680af0D0f484356d27CB89725"}
          </p>
          <div className="flex gap-x-6 items-center">
            <button
              onClick={() => modal.show(<WithdrawModal />)}
              className="flex gap-x-1 items-center border border-secondary px-5 py-1 bg-secondary bg-opacity-10 text-secondary rounded-lg tracking-tight font-medium duration-500 hover:bg-opacity-100 hover:text-background"
            >
              <span className="material-icons text-3xl">&#xe8fb;</span> Withdraw
            </button>
            <button
              className="flex gap-x-1 items-center border border-primary px-5 py-1 bg-primary bg-opacity-10 text-primary rounded-lg tracking-tight font-medium duration-500 hover:bg-opacity-100 hover:text-background"
              onClick={() => modal.show(<StakingModal />)}
            >
              <span className="material-icons text-3xl">&#xe147;</span> Stake
            </button>
          </div>
        </div>
      </section>
      <section className="my-14 flex justify-between p-page">
        <div className="flex flex-col items-center w-[49%] bg-foreground bg-opacity-10 p-8 rounded-[3rem]">
          <div
            className="bg-foreground relative bg-opacity-70 aspect-square rounded-full min-w-[60%] flex flex-col items-center gap-y-3 justify-center text-back tracking-tight 
          font-medium font-raleway text-xl text-opacity-80 before:content-visible before:absolute-center before:w-full before:h-full before:rounded-full before:border-primary
          before:scale-110 before:border-[8px] pointer-events-none selection:hidden"
          >
            <p>Staked Value</p>
            <h5 className="text-7xl font-poppins bg-clip-text bg-gradient-to-br text-back text-opacity-100">
              {420.911}
            </h5>
            <p>MATIC</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-[49%] bg-foreground bg-opacity-10 rounded-[3rem] p-8">
          {<Graph chartData={chartData} />}
        </div>
      </section>
      <section className="p-page text-center text-primary tracking-tight font-semibold font-raleway">
        <p>
          You're raking in about
          <span className="text-primary font-poppins text-lg">
            {" "}
            {20} AGRO-COINs{" "}
          </span>
          every months
        </p>
      </section>
    </>
  );
}
