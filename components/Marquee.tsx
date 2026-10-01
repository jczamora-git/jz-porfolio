const items = [
  "BRAND IDENTITY",
  "ART DIRECTION",
  "TYPOGRAPHY",
  "EDITORIAL DESIGN",
  "PACKAGING",
  "MOTION DESIGN",
  "CAMPAIGNS",
];

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-bone/10 bg-coal py-5">
      <div className="animate-marquee flex w-max whitespace-nowrap">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center">
            {items.map((item) => (
              <span
                key={`${dup}-${item}`}
                className="flex items-center gap-8 px-8 font-display text-sm font-semibold uppercase tracking-[0.3em] text-bone/70"
              >
                {item}
                <span className="text-blood">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
