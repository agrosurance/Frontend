export default function Form(props: { className?: string }) {
  return (
    <div
      className={`flex basis-3/5 flex-col justify-center gap-y-8 bg-background px-32 duration-1000 ${props.className}`}
    >
      <h1 className="self-center text-4xl font-bold">Register</h1>
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-1">
          <h4 className="text-md font-medium">Email</h4>

          <div className="flex flex-row items-center rounded-xl border border-front border-opacity-50">
            <span className="material-icons border border-r-front px-2 py-2 text-4xl">
              &#xe158;
            </span>
            <input
              type="email"
              placeholder="joe@gmail.com"
              className="text-md px-2"
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-1">
          <h4 className="text-md font-medium">Password</h4>

          <div className="flex flex-row items-center rounded-lg border border-front border-opacity-50">
            <span className="material-icons border border-r-front px-2 py-2 text-4xl">
              &#xe897;
            </span>
            <input
              type="password"
              placeholder="Enter your password"
              className="text-md px-2"
            />
          </div>
        </div>
        <button className="btn-2 w-max self-center px-6 py-2">Connect</button>
      </div>
    </div>
  );
}
