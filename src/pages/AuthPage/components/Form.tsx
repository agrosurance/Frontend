export default function Form(props: { className?: string }) {
  return (
    <div
      className={`flex flex-col justify-center basis-3/5 px-32 gap-y-8 duration-1000 bg-background ${props.className}`}
    >
      <h1 className="text-4xl font-bold self-center">Register</h1>
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-1">
          <h4 className="text-md font-medium">Email</h4>

          <div className="flex flex-row items-center border-front border border-opacity-50 rounded-xl">
            <span className="material-icons text-4xl py-2 px-2 border border-r-front">
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

          <div className="flex flex-row items-center border-front border border-opacity-50 rounded-lg">
            <span className="material-icons text-4xl py-2 px-2 border border-r-front">
              &#xe897;
            </span>
            <input
              type="password"
              placeholder="Enter your password"
              className="text-md px-2"
            />
          </div>
        </div>
        <button className="btn-2 w-max px-6 py-2 self-center">Connect</button>
      </div>
    </div>
  );
}
