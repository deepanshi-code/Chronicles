export default function BackgroundGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <div className="glow-blob glow-blob-a absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-accent/10 blur-[140px]" />
      <div className="glow-blob glow-blob-b absolute -right-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-accent/5 blur-[140px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_75%)]" />
    </div>
  );
}
