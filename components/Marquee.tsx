const items = [
  "BRAND IDENTITY",
  "ART DIRECTION",
  "TYPOGRAPHY",
  "EDITORIAL DESIGN",
  "PACKAGING",
  "MOTION DESIGN",
  "CAMPAIGNS",
];

function MarqueeItems({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden ? "true" : undefined}>
      {items.map((item, idx) => (
        <span
          key={idx}
          className="flex items-center gap-8 px-8 font-display text-sm font-semibold uppercase tracking-[0.3em] text-bone/70"
        >
          {item}
          <span className="text-blood">✦</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="marquee relative overflow-hidden border-y border-bone/10 bg-coal py-5">
      <div className="marquee-track flex w-max shrink-0 whitespace-nowrap">
        <MarqueeItems />
        <MarqueeItems ariaHidden={true} />
      </div>
    </div>
  );
}

