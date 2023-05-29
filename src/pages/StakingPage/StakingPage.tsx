import useFetch from "../../hooks/useFetch";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

export default function StakingPage() {
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
            <button className="flex gap-x-1 items-center border border-secondary px-5 py-1 bg-secondary bg-opacity-10 text-secondary rounded-lg tracking-tight font-medium duration-500 hover:bg-opacity-100 hover:text-background">
              <span className="material-icons text-3xl">&#xe8fb;</span> Withdraw
            </button>
            <button className="flex gap-x-1 items-center border border-primary px-5 py-1 bg-primary bg-opacity-10 text-primary rounded-lg tracking-tight font-medium duration-500 hover:bg-opacity-100 hover:text-background">
              <span className="material-icons text-3xl">&#xe147;</span> Stake
            </button>
          </div>
        </div>
      </section>
      <section className="my-3 flex">
        <div className=""></div>
      </section>
    </>
  );
}
