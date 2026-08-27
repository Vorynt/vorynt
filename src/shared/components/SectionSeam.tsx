export function SectionSeam() {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative z-10 h-20 overflow-visible sm:h-28"
    >
      <div className="absolute inset-x-0 -top-16 h-40 bg-linear-to-b from-transparent via-background/70 to-background/90" />
      <div
        className="absolute top-1/2 left-1/2 h-20 w-[min(70%,42rem)] -translate-x-1/2 -translate-y-1/2 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.72 0.12 250 / 0.28), transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 h-px w-[min(78%,52rem)] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.68 0.16 250 / 0.55) 30%, oklch(0.92 0.045 240 / 0.9) 50%, oklch(0.68 0.16 250 / 0.55) 70%, transparent)",
        }}
      />
    </div>
  );
}
