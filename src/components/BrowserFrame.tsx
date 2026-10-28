import type { ReactNode } from "react";

export default function BrowserFrame({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-surface-border bg-[#17171d] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-1.5 border-b border-surface-border/80 bg-[#1c1c23] px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
