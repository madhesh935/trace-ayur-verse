import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { type LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  tone = "primary",
  hint,
}: {
  label: string;
  value: string | number;
  delta?: string;
  icon: LucideIcon;
  tone?: "primary" | "emerald" | "earth" | "saffron" | "destructive";
  hint?: string;
}) {
  const tones: Record<string, string> = {
    primary: "from-primary/10 to-primary/0 text-primary",
    emerald: "from-emerald/15 to-emerald/0 text-emerald",
    earth: "from-earth/15 to-earth/0 text-earth",
    saffron: "from-saffron/20 to-saffron/0 text-saffron",
    destructive: "from-destructive/15 to-destructive/0 text-destructive",
  };
  return (
    <div className="bg-card rounded-2xl border border-border p-5 shadow-card relative overflow-hidden">
      <div className={cn("absolute -top-8 -right-8 size-32 rounded-full bg-gradient-to-br blur-2xl opacity-60", tones[tone])} />
      <div className="flex items-start justify-between relative">
        <div>
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</div>
          <div className="text-2xl font-bold mt-2 font-display">{value}</div>
          {delta && <div className="text-xs text-emerald font-medium mt-1">{delta}</div>}
          {hint && <div className="text-xs text-muted-foreground mt-1">{hint}</div>}
        </div>
        <div className={cn("size-10 rounded-xl flex items-center justify-center bg-gradient-to-br", tones[tone])}>
          <Icon className="size-5" />
        </div>
      </div>
    </div>
  );
}

export function Panel({
  title,
  subtitle,
  action,
  children,
  className,
}: {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("bg-card rounded-2xl border border-border shadow-card", className)}>
      {(title || action) && (
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            {title && <h3 className="font-display font-semibold text-base">{title}</h3>}
            {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

export function Badge({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "success" | "warning" | "danger" | "info";
}) {
  const tones: Record<string, string> = {
    default: "bg-muted text-muted-foreground border-border",
    success: "bg-emerald/10 text-emerald border-emerald/20",
    warning: "bg-saffron/15 text-earth border-saffron/30",
    danger: "bg-destructive/10 text-destructive border-destructive/20",
    info: "bg-primary/10 text-primary border-primary/20",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full border", tones[tone])}>
      {children}
    </span>
  );
}
