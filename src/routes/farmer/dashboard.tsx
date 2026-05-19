import { createFileRoute, Link } from "@tanstack/react-router";
import { PortalShell, type NavItem } from "@/components/layout/PortalShell";
import { Panel, StatCard, Badge } from "@/components/ui-kit/Panel";
import { IndiaMap } from "@/components/maps/IndiaMap";
import {
  LayoutDashboard, PlusCircle, Leaf, Map, Award, GraduationCap, Settings, FileBarChart,
  Sprout, TreePine, CloudRain, Wifi, IndianRupee, Sun, ArrowRight, MapPin, ShieldCheck, CheckCircle2,
} from "lucide-react";
import { BATCHES, REGIONS } from "@/lib/mock-data";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/farmer/dashboard")({ component: FarmerDashboard });

const nav: NavItem[] = [
  { label: "Dashboard", to: "/farmer/dashboard", icon: LayoutDashboard, i18nKey: "nav.dashboard" },
  { label: "New Collection", to: "/farmer/new-collection", icon: PlusCircle, badge: "+", i18nKey: "nav.new_collection" },
  { label: "My Collections", to: "/farmer/collections", icon: Leaf, i18nKey: "nav.collections" },
  { label: "Harvest Reports", to: "/farmer/harvest-reports", icon: FileBarChart, i18nKey: "nav.reports" },
  { label: "GPS Collection Map", to: "/farmer/map", icon: Map, i18nKey: "nav.map" },
  { label: "Settings", to: "/farmer/settings", icon: Settings, i18nKey: "nav.settings" },
];

const trend = Array.from({ length: 14 }).map((_, i) => ({
  d: `${i + 1}`, kg: 8 + (Math.sin(i / 2) + 1) * 12 + (i % 3) * 2,
}));

function FarmerDashboard() {
  const { t } = useLang();
  return (
    <PortalShell
      portalName="Farmer Portal"
      portalTagline="Geo-tagged collection"
      nav={nav}
      user={{ name: "Ramesh Kumar", role: "Farmer · F-2847", initials: "RK" }}
    >
      {/* Greeting strip */}
      <div className="bg-card/80 backdrop-blur-xl border border-border/60 rounded-[1.5rem] p-8 relative overflow-hidden shadow-card group">
        <div className="absolute -top-32 -right-32 size-96 rounded-full bg-gradient-to-br from-primary/20 to-emerald/20 blur-[80px] pointer-events-none transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute bottom-0 left-0 w-full h-1 gradient-leaf" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-emerald bg-emerald/10 px-2 py-0.5 rounded-full">Farmer ID: F-2847</span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Verified</span>
            </div>
            <h1 className="text-3xl font-bold font-display text-foreground mt-1">{t("dash.greeting")}</h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-md leading-relaxed">
              {t("dash.streak")}
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/farmer/collections" className="h-12 inline-flex items-center px-6 rounded-xl bg-muted/50 border border-border text-foreground font-semibold hover:bg-muted transition-all">
              {t("dash.view_ledger")}
            </Link>
            <Link to="/farmer/new-collection" className="h-12 inline-flex items-center px-6 rounded-xl gradient-hero text-white font-semibold shadow-glow transition-all hover:scale-[1.02]">
              <PlusCircle className="size-4 mr-2" /> {t("dash.record_harvest")}
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <StatCard label={t("dash.today_collections")} value="3 batches" delta="+1 vs yesterday" icon={Sprout} tone="emerald" hint="48 kg total" />
        <StatCard label={t("dash.sustainability_score")} value="94" delta="Top 8% in region" icon={TreePine} tone="emerald" />
        <StatCard label={t("dash.pending_sync")} value="2" icon={Wifi} tone="saffron" hint="Will sync when online" />
        <StatCard label={t("dash.monthly_earnings")} value="₹ 42,180" delta="+18% MoM" icon={IndianRupee} tone="earth" />
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        <Panel title={t("dash.recent_collections")} subtitle="Harvest volume over last 14 days" action={<Link to="/farmer/collections" className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">{t("dash.view_ledger")} <ArrowRight className="size-3" /></Link>} className="lg:col-span-2 flex flex-col">
          <div className="h-56 -mx-2 mt-2">
            <ResponsiveContainer>
              <AreaChart data={trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="far" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.68 0.17 155)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.68 0.17 155)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="d" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'oklch(0.5 0.03 140)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'oklch(0.5 0.03 140)' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'oklch(0.22 0.035 155)', borderRadius: '12px', border: 'none', color: '#fff', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="kg" stroke="oklch(0.68 0.17 155)" fill="url(#far)" strokeWidth={3} activeDot={{ r: 6, fill: 'oklch(0.68 0.17 155)', stroke: '#fff', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-auto border-t border-border pt-2 -mx-5 -mb-5 bg-muted/20">
            {BATCHES.slice(0, 4).map((b, idx) => (
              <div key={b.id} className={`px-5 py-3.5 flex items-center gap-4 transition-colors hover:bg-muted/60 ${idx !== 3 ? 'border-b border-border/50' : ''}`}>
                <div className="size-11 rounded-xl bg-card border border-border flex items-center justify-center text-xl shadow-sm">{b.herb.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-bold text-foreground truncate">{b.herb.name}</div>
                    <div className="text-sm font-bold text-foreground">{b.quantity} {b.unit}</div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="text-[11px] font-mono text-muted-foreground truncate">{b.id}</div>
                    <div className="text-[11px] text-muted-foreground flex items-center gap-1"><MapPin className="size-3" /> {b.region.name}</div>
                  </div>
                </div>
                <Badge tone={b.status === "Verified" ? "success" : "info"}>{b.status}</Badge>
              </div>
            ))}
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel title={t("dash.harvest_env")} subtitle="Kotagiri · Live IoT Feed">
            <div className="flex items-center gap-5 p-2">
              <div className="size-16 rounded-[1.25rem] bg-gradient-to-br from-earth/20 to-saffron/20 border border-saffron/30 flex items-center justify-center shadow-inner">
                <Sun className="size-8 text-saffron drop-shadow-sm" />
              </div>
              <div>
                <div className="text-4xl font-bold font-display tracking-tight text-foreground">22°<span className="text-2xl text-muted-foreground">C</span></div>
                <div className="text-sm font-medium text-emerald mt-0.5">{t("dash.optimal")}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-5">
              {[
                { l: t("dash.humidity"), v: "68%", i: CloudRain },
                { l: t("dash.rainfall"), v: "0 mm", i: CloudRain },
                { l: t("dash.soil"), v: "Moist", i: Sprout }
              ].map((w) => (
                <div key={w.l} className="bg-card border border-border/60 rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-sm hover:border-primary/40 transition-colors">
                  <w.i className="size-4 text-muted-foreground mb-2" />
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{w.l}</div>
                  <div className="text-sm font-bold text-foreground mt-0.5">{w.v}</div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title={t("dash.season_quota")} subtitle="Approved by NMPB">
            <div className="flex items-end justify-between mb-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Ashwagandha Volume</div>
                <div className="text-3xl font-bold font-display text-foreground">320<span className="text-base text-muted-foreground font-semibold"> / 500 kg</span></div>
              </div>
              <Badge tone="success" className="mb-1">64% Utilized</Badge>
            </div>
            <div className="h-3 rounded-full bg-muted/60 overflow-hidden border border-border shadow-inner">
              <div className="h-full gradient-leaf relative">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[scan_1s_linear_infinite]" />
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground mt-3 flex items-center gap-1.5"><CheckCircle2 className="size-3 text-emerald" /> You are well within sustainable limits.</p>
          </Panel>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-6 items-stretch">
        {/* GPS map — fills full card height */}
        <div className="lg:col-span-2 bg-card/70 backdrop-blur-xl rounded-[1.25rem] border border-border/60 shadow-card overflow-hidden flex flex-col hover:border-border transition-all duration-300">
          <div className="flex items-center justify-between p-5 border-b border-border shrink-0">
            <div>
              <h3 className="font-display font-semibold text-base">{t("dash.gps_territorial")}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Verified collection zones</p>
            </div>
          </div>
          <div className="flex-1 w-full min-h-0">
            <IndiaMap markers={REGIONS.slice(0, 3).map((r) => ({ lat: r.lat, lng: r.lng, label: r.name }))} />
          </div>
        </div>

        {/* Ledger Synchronization */}
        <Panel title={t("dash.ledger_sync")}>
          <div className="flex flex-col h-full justify-between">
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-emerald/5 border border-emerald/20">
                <div className="size-8 rounded-full bg-emerald/20 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="size-4 text-emerald" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">{t("dash.fully_synced")}</div>
                  <div className="text-xs text-emerald mt-1 font-medium">Network Latency: 42ms</div>
                </div>
              </div>
              <div className="pt-2">
                <div className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-3">{t("dash.recent_chain")}</div>
                <div className="space-y-2.5">
                  {BATCHES.slice(0, 4).map((b) => (
                    <div key={b.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-card border border-border/50 hover:border-emerald/30 transition-colors">
                      <div className="size-6 rounded bg-muted/50 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="size-3 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0 flex items-center justify-between">
                        <span className="font-mono text-xs text-foreground truncate mr-2">{b.txHash.slice(0, 16)}…</span>
                        <span className="text-[10px] text-emerald bg-emerald/10 px-1.5 py-0.5 rounded font-mono block shrink-0">Blk {b.block.toString().slice(-4)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Link to="/farmer/collections" className="mt-4 block w-full text-center text-xs font-semibold text-primary hover:underline">
              {t("dash.view_ledger")}
            </Link>
          </div>
        </Panel>
      </div>
    </PortalShell>
  );
}
