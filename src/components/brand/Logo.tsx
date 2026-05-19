import { Leaf } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Logo({ variant = "default" }: { variant?: "default" | "light" }) {
  const text = variant === "light" ? "text-white" : "text-foreground";
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="relative">
        <div className="size-9 rounded-xl gradient-leaf flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
          <Leaf className="size-5 text-white" strokeWidth={2.5} />
        </div>
      </div>
      <div className={`font-display font-bold text-lg leading-none ${text}`}>
        AyurTrace
        <div className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground mt-0.5 uppercase">
          Botanical Provenance
        </div>
      </div>
    </Link>
  );
}
