interface InfoProps {
  index: number;
  videoUrl: string;
  title: string;
  content: string;
}

export default function Info(props: InfoProps) {
  return (
    <section
      className={`p-page my-5 flex items-center
     gap-x-2 overflow-hidden ${props.index % 2 == 0 ? "" : "flex-row-reverse"}`}
    >
      <video
        className="relative -z-1 w-1/3 -translate-x-[10%] scale-[120%]"
        src={props.videoUrl}
        autoPlay
        muted
        loop
      />
      <div className="flex flex-1 flex-col gap-y-3 p-8 text-center">
        <h1 className="font-raleway text-3xl font-bold tracking-tight text-primary">
          {props.title}
        </h1>
        <p>{props.content}</p>
      </div>
    </section>
  );
}
