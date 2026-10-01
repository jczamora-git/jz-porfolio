export default function Eyebrow({
  index,
  label,
}: {
  index: string;
  label: string;
}) {
  return (
    <p className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-ash">
      <span className="h-2 w-2 bg-blood" />
      ({index}) — {label}
    </p>
  );
}
