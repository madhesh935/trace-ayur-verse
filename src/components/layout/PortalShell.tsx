import { ReactNode, useState } from "react";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Bell, Search, LogOut, type LucideIcon, ChevronDown, Check, Globe } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useLang, LANGUAGES, type Lang } from "@/lib/i18n";
import { AIAssistant, type PortalContext } from "@/components/ai/AIAssistant";

export type NavItem = { label: string; to: string; icon: LucideIcon; badge?: string; i18nKey?: string };

interface Props {
  portalName: string;
  portalTagline: string;
  nav: NavItem[];
  user: { name: string; role: string; initials: string };
  accent?: string;
  children?: ReactNode;
}

/* Portal accent colors */
const PORTAL_ACCENTS: Record<string, { from: string; icon: string; glow: string }> = {
  "Farmer Portal":     { from: "from-emerald/20",  icon: "bg-emerald/20 text-emerald",   glow: "shadow-emerald/20" },
  "Regulator Portal":  { from: "from-primary/20",  icon: "bg-primary/20 text-primary",   glow: "shadow-primary/20" },
  "Laboratory Portal": { from: "from-blue-500/20", icon: "bg-blue-500/20 text-blue-400", glow: "shadow-blue-500/20" },
  "Processing Portal": { from: "from-saffron/20",  icon: "bg-saffron/20 text-saffron",   glow: "shadow-saffron/20" },
  "Consumer Portal":   { from: "from-leaf/20",     icon: "bg-leaf/20 text-leaf",         glow: "shadow-leaf/20" },
};

function LangSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find((l) => l.code === lang)!;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 h-9 px-3 rounded-xl bg-sidebar-accent/40 hover:bg-sidebar-accent transition-colors border border-sidebar-border/40"
      >
        <Globe className="size-3.5 text-sidebar-foreground/60" />
        <span className="text-xs font-bold text-sidebar-foreground/90">{current.native}</span>
        <ChevronDown className={`size-3 text-sidebar-foreground/50 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute bottom-full left-0 mb-2 w-52 rounded-2xl border border-sidebar-border/60 bg-sidebar/95 backdrop-blur-xl shadow-2xl overflow-hidden z-50">
          <div className="px-3 py-2.5 border-b border-sidebar-border/40">
            <div className="text-[10px] uppercase tracking-widest text-sidebar-foreground/40 font-bold">Select Language</div>
          </div>
          <div className="p-1.5 space-y-0.5">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code as Lang); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${lang === l.code ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50"}`}
              >
                <span className="text-base">{l.flag}</span>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-sm">{l.native}</div>
                  <div className="text-[10px] opacity-60">{l.label}</div>
                </div>
                {lang === l.code && <Check className="size-3.5" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LangSwitcherHeader() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find((l) => l.code === lang)!;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 h-10 px-3 rounded-xl bg-muted/50 hover:bg-muted/80 border border-border/40 transition-colors"
      >
        <Globe className="size-3.5 text-muted-foreground" />
        <span className="text-xs font-bold text-foreground">{current.flag} {current.native}</span>
        <ChevronDown className={`size-3 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-2 w-52 rounded-2xl border border-border/60 bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden z-50">
          <div className="px-3 py-2.5 border-b border-border/40">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Language / भाषा</div>
          </div>
          <div className="p-1.5 space-y-0.5">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code as Lang); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${lang === l.code ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:bg-muted/60"}`}
              >
                <span className="text-base">{l.flag}</span>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-sm">{l.native}</div>
                  <div className="text-[10px] opacity-60">{l.label}</div>
                </div>
                {lang === l.code && <Check className="size-3.5" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function PortalShell({ portalName, portalTagline, nav, user, children }: Props) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { t } = useLang();
  const accent = PORTAL_ACCENTS[portalName] ?? PORTAL_ACCENTS["Farmer Portal"];

  return (
    <div className="min-h-screen flex bg-background/95">

      {/* ── Sidebar ─────────────────────────────────────────────── */}
      <aside className="w-64 m-3 rounded-3xl shrink-0 bg-sidebar/95 backdrop-blur-xl text-sidebar-foreground flex flex-col fixed inset-y-0 left-0 shadow-2xl border border-sidebar-border/40 overflow-hidden z-40">

        {/* Logo */}
        <div className="px-5 pt-5 pb-4 border-b border-sidebar-border/40">
          <Logo variant="light" />
        </div>

        {/* Portal badge */}
        <div className={`mx-3 mt-3 mb-1 rounded-2xl bg-gradient-to-r ${accent.from} to-transparent border border-sidebar-border/30 px-4 py-3`}>
          <div className="text-[10px] uppercase tracking-[0.18em] text-sidebar-foreground/50 font-bold">{portalName}</div>
          <div className="text-xs font-semibold text-sidebar-foreground/80 mt-0.5">{portalTagline}</div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          {nav.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            const label = item.i18nKey ? t(item.i18nKey) : item.label;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                    : "text-sidebar-foreground/65 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                }`}
              >
                {/* Icon with accent background when active */}
                <div className={`size-7 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                  active ? "bg-white/20" : `group-hover:${accent.icon}`
                }`}>
                  <Icon className={`size-4 transition-transform duration-200 ${active ? "" : "group-hover:scale-110"}`} />
                </div>
                <span className="flex-1 truncate">{label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold min-w-[18px] text-center ${
                    active ? "bg-white/25 text-white" : "bg-sidebar-primary/20 text-sidebar-primary"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom: user only */}
        <div className="p-3 border-t border-sidebar-border/40">
          <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-sidebar-accent/50 cursor-pointer transition-colors group">
            <div className={`size-9 rounded-xl ${accent.icon} flex items-center justify-center text-sm font-bold shrink-0`}>
              {user.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-sidebar-foreground truncate">{user.name}</div>
              <div className="text-[10px] text-sidebar-foreground/50 truncate">{user.role}</div>
            </div>
            <Link to="/login" className="text-sidebar-foreground/40 hover:text-sidebar-foreground transition-colors">
              <LogOut className="size-4" />
            </Link>
          </div>
        </div>
      </aside>

      {/* ── Main area ───────────────────────────────────────────── */}
      <div className="flex-1 ml-[17rem] flex flex-col min-w-0">

        {/* Topbar */}
        <header className="h-16 border-b border-border/40 bg-background/60 backdrop-blur-xl sticky top-0 z-30 flex items-center px-6 gap-4">
          <div className="flex-1 max-w-lg relative group">
            <Search className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              placeholder={t("common.search")}
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-muted/50 border border-border/40 focus:border-primary/40 focus:bg-card focus:ring-4 focus:ring-primary/5 outline-none text-sm transition-all"
            />
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs px-3 py-1.5 rounded-full bg-emerald/10 text-emerald font-semibold border border-emerald/20 flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald animate-pulse" />
              {t("common.blockchain_live")}
            </span>
            <button className="relative size-10 rounded-xl hover:bg-muted/60 flex items-center justify-center transition-colors border border-transparent hover:border-border/40">
              <Bell className="size-4" />
              <span className="absolute top-2 right-2 size-1.5 rounded-full bg-destructive" />
            </button>
            <LangSwitcherHeader />
          </div>
        </header>

        <main className="flex-1 p-7 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children ?? <Outlet />}
        </main>
      </div>
      <AIAssistant context={portalContextMap[portalName] ?? "farmer"} />
    </div>
  );
}

const portalContextMap: Record<string, PortalContext> = {
  "Farmer Portal":     "farmer",
  "Regulator Portal":  "regulator",
  "Laboratory Portal": "laboratory",
  "Processing Portal": "processing",
  "Consumer Portal":   "consumer",
};
