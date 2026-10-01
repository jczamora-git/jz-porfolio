import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

const testimonials = [
  {
    quote:
      "Jeizi turned our vague idea into a brand with teeth. Every asset felt intentional — down to the last spacing decision.",
    name: "K. Ocampo",
    role: "Founder, Noir Athletics",
  },
  {
    quote:
      "The sharpest art director we've worked with. Fast, decisive, and the concepts hit from frame one.",
    name: "M. Tan",
    role: "Creative Director, Pulso Media",
  },
  {
    quote:
      "Our rebrand paid for itself in a single quarter. Customers literally comment on the packaging.",
    name: "R. Villanueva",
    role: "CEO, Crimson Coffee",
  },
];

export default function Testimonials() {
  return (
    <section className="border-y border-bone/10 bg-coal px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow index="04" label="Praise" />
        </Reveal>

        <Reveal delay={100}>
          <h2 className="mb-16 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight md:text-7xl">
            What clients <span className="italic text-blood">say.</span>
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <figure className="group flex h-full flex-col justify-between border border-bone/10 bg-ink p-8 transition-colors duration-300 hover:border-blood/60">
                <div>
                  <span className="font-display text-6xl font-bold leading-none text-blood">
                    &ldquo;
                  </span>
                  <blockquote className="mt-2 text-sm leading-relaxed text-bone/90 md:text-base">
                    {t.quote}
                  </blockquote>
                </div>
                <figcaption className="mt-8 flex items-center gap-3 border-t border-bone/10 pt-5">
                  <span className="flex h-9 w-9 items-center justify-center border border-blood/60 font-mono text-xs text-blood">
                    {t.name.charAt(0)}
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold uppercase tracking-wide">
                      {t.name}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash">
                      {t.role}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
