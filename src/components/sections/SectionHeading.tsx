export function SectionHeading({
  id,
  index,
  title,
}: {
  id: string;
  index: string;
  title: string;
}) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-static">
        [track {index}]
      </p>
      <h2 id={id} className="glow mt-1 text-[2.25rem] leading-tight text-crt sm:text-5xl">
        {title}
      </h2>
    </div>
  );
}
