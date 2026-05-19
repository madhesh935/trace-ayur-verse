import { ReactNode } from "react";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Search,
  ChevronDown,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";

export type NavItem = { label: string; to: string; icon: LucideIcon; badge?: string };

interface Props {
  portalName: string;
  portalTagline: string;
  nav: NavItem[];
  user: { name: string; role: string; initials: string };
  accent?: string;
  children?: ReactNode;
}

export function PortalShell({ portalName, portalTagline, nav, user, children }: Props) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-sidebar text-sidebar-foreground flex flex-col fixed inset-y-0 left-0">
        <div className="px-5 py-5 border-b border-sidebar-border">
          <Logo variant="light" />
        </div>
        <div className="px-5 py-4 border-b border-sidebar-border">
          <div className="text-[10px] uppercase tracking-[0.18em] text-sidebar-foreground/50 font-semibold">
            {portalName}
          </div>
          <div className="text-sm font-medium text-sidebar-foreground/90 mt-1">{portalTagline}</div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {nav.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow"
                    : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                }`}
              >
                <Icon className="size-4" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] bg-accent/20 text-accent px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent cursor-pointer">
            <div className="size-9 rounded-full gradient-leaf flex items-center justify-center text-sm font-semibold text-white">
              {user.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{user.name}</div>
              <div className="text-xs text-sidebar-foreground/60 truncate">{user.role}</div>
            </div>
            <Link to="/login" className="text-sidebar-foreground/60 hover:text-sidebar-foreground">
              <LogOut className="size-4" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 ml-64 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card/60 backdrop-blur-md sticky top-0 z-30 flex items-center px-6 gap-4">
          <div className="flex-1 max-w-md relative">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search batches, farmers, transactions..."
              className="w-full h-9 pl-9 pr-3 rounded-lg bg-muted/60 border border-transparent focus:border-ring focus:bg-card outline-none text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 rounded-full bg-emerald/10 text-emerald font-medium border border-emerald/20 flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald animate-pulse" /> Blockchain Live · Block 18,420,{(Math.random() * 999).toFixed(0).padStart(3, "0")}
            </span>
            <button className="relative size-9 rounded-lg hover:bg-muted flex items-center justify-center">
              <Bell className="size-4" />
              <span className="absolute top-2 right-2 size-1.5 rounded-full bg-destructive" />
            </button>
            <button className="h-9 px-3 rounded-lg hover:bg-muted flex items-center gap-2 text-sm font-medium">
              EN <ChevronDown className="size-3" />
            </button>
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-8">{children ?? <Outlet />}</main>
      </div>
    </div>
  );
}
