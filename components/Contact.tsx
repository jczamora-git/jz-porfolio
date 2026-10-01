import ContactForm from "./ContactForm";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

const socials = [
  { label: "BEHANCE", href: "https://behance.net" },
  { label: "INSTAGRAM", href: "https://instagram.com" },
  { label: "DRIBBBLE", href: "https://dribbble.com" },
  { label: "LINKEDIN", href: "https://linkedin.com" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden px-6 py-28 md:px-10 md:py-40"
    >
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-blood/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow index="05" label="Contact" />
        </Reveal>

        <Reveal delay={100}>
          <h2 className="font-display text-[clamp(3rem,9vw,9rem)] font-bold uppercase leading-[0.9] tracking-tight">
            Let&apos;s make
            <br />
            something <span className="italic text-blood">loud.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:grid-cols-2">
          <Reveal delay={200}>
            <div>
              <p className="max-w-md text-lg leading-relaxed text-ash">
                Have a project that needs a sharp eye and a louder idea? Tell me
                about it. I&apos;m currently booking for{" "}
                <span className="text-bone">Q3 2026</span>.
              </p>

              <a
                href="mailto:hello@jeiziproductions.com"
                className="link-underline mt-8 inline-block font-display text-2xl font-bold tracking-tight md:text-3xl"
              >
                hello@jeiziproductions.com
              </a>

              <div className="mt-10 flex flex-wrap gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-bone/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ash transition-colors hover:border-blood hover:text-blood"
                  >
                    {s.label} ↗
                  </a>
                ))}
              </div>

              <div className="mt-10 flex items-center gap-3 border border-blood/40 bg-blood/5 p-4 font-mono text-[11px] uppercase tracking-[0.2em] text-bone">
                <span className="h-2 w-2 animate-pulse-dot bg-blood" />
                Available for freelance — 2 slots left this quarter
              </div>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
