interface Land {
  name: string;
  crop?: {
    name: string;
    imageUrl: string;
  };
  isInsured: boolean;
  insuredTill: number;
}

const lands: Land[] = [
  {
    name: "bekaar zameen",
    isInsured: true,
    insuredTill: Date.now() + 360000,
  },
  {
    name: "bekaar zameen",
    crop: { name: "", imageUrl: "/images/lands/untilled.png" },
    isInsured: true,
    insuredTill: Date.now() + 360000,
  },
];

export default function Lands() {
  return (
    <section className="p-page flex flex-col gap-y-10">
      <h1 className="-mb-3 font-bold font-raleway tracking-tight text-3xl text-center">
        My Lands{" "}
      </h1>
      {lands.map((item, i) => (
        <div
          key={i}
          className="border border-front border-opacity-30 shadow-md rounded-2xl flex"
        >
          <div className="basis-1/4 flex flex-col items-center gap-y-5 p-5 border-r border-front">
            <img
              src={
                item.crop ? item.crop.imageUrl : "/images/lands/untilled.png"
              }
              alt={item.crop ? item.crop.name : "empty farmland"}
              className="object-contain"
            />
            <h2 className="text-xl font-semibold font-raleway tracking-tight capitalize bg-front text-front bg-opacity-10 px-4 py-1 rounded-md">
              {item.name}
            </h2>
          </div>
          <div className="flex-1 flex flex-col p-6 text-lg">
            {[
              {
                title: "Crop",
                content: item.crop ? item.crop.name : "None",
              },
            ].map((info, index) => (
              <p key={index} className="text-xl">
                {info.title} : <span>{info.content}</span>
              </p>
            ))}
          </div>
          <div className="flex flex-col"></div>
        </div>
      ))}
    </section>
  );
}
