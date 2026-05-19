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

export const Route = createFileRoute("/farmer/dashboard")({ component: FarmerDashboard });

const nav: NavItem[] = [
  { label: "Dashboard", to: "/farmer/dashboard", icon: LayoutDashboard },
  { label: "New Collection", to: "/farmer/new-collection", icon: PlusCircle, badge: "+" },
  { label: "My Collections", to: "/farmer/collections", icon: Leaf },
  { label: "Harvest Reports", to: "/farmer/dashboard", icon: FileBarChart },
  { label: "GPS Collection Map", to: "/farmer/dashboard", icon: Map },
  { label: "Rewards & Incentives", to: "/farmer/dashboard", icon: Award },
  { label: "Training Center", to: "/farmer/dashboard", icon: GraduationCap },
  { label: "Settings", to: "/farmer/dashboard", icon: Settings },
];

const trend = Array.from({ length: 14 }).map((_, i) => ({
  d: `${i + 1}`, kg: 8 + (Math.sin(i / 2) + 1) * 12 + (i % 3) * 2,
}));

function FarmerDashboard() {
  return (
    <PortalShell
      portalName="Farmer Portal"
      portalTagline="Geo-tagged collection"
      nav={nav}
      user={{ name: "Ramesh Kumar", role: "Farmer · F-2847", initials: "RK" }}
    >
      {/* Greeting strip */}
      <div className="gradient-hero rounded-2xl p-6 text-white relative overflow-hidden shadow-card">
        <div className="absolute -top-20 -right-20 size-64 rounded-full bg-leaf/30 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider opacity-80">Namaste, Ramesh</div>
            <div className="text-2xl font-bold font-display mt-1">You're on a 12-day streak 🌱</div>
            <div className="text-sm text-white/80 mt-1">Kotagiri, Nilgiris · Tamil Nadu</div>
          </div>
          <Link to="/farmer/new-collection" className="h-11 inline-flex items-center px-5 rounded-xl bg-white text-primary font-semibold shadow-soft hover:bg-white/95">
            <PlusCircle className="size-4 mr-2" /> Record New Collection
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <StatCard label="Today's Collections" value="3 batches" delta="+1 vs yesterday" icon={Sprout} tone="emerald" hint="48 kg total" />
        <StatCard label="Sustainability Score" value="94" delta="Top 8% in region" icon={TreePine} tone="emerald" />
        <StatCard label="Pending Sync" value="2" icon={Wifi} tone="saffron" hint="Will sync when online" />
        <StatCard label="Monthly Earnings" value="₹ 42,180" delta="+18% MoM" icon={IndianRupee} tone="earth" />
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-5 mt-6">
        <Panel title="Recent Collections" subtitle="Last 14 days" action={<Link to="/farmer/collections" className="text-xs text-primary font-medium flex items-center gap-1">View all <ArrowRight className="size-3" /></Link>} className="lg:col-span-2">
          <div className="h-48 -mx-2">
            <ResponsiveContainer>
              <AreaChart data={trend}>
                <defs>
                  <linearGradient id="far" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.68 0.17 155)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="oklch(0.68 0.17 155)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="d" axisLine={false} tickLine={false} fontSize={11} />
                <YAxis hide />
                <Tooltip />
                <Area type="monotone" dataKey="kg" stroke="oklch(0.55 0.15 155)" fill="url(#far)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="divide-y divide-border -mx-5 -mb-5">
            {BATCHES.slice(0, 4).map((b) => (
              <div key={b.id} className="px-5 py-3 flex items-center gap-3 hover:bg-muted/50">
                <div className="size-10 rounded-lg bg-emerald/10 flex items-center justify-center text-xl">{b.herb.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{b.herb.name} · {b.quantity} {b.unit}</div>
                  <div className="text-xs text-muted-foreground truncate">{b.id} · {b.region.name}</div>
                </div>
                <Badge tone={b.status === "Verified" ? "success" : "info"}>{b.status}</Badge>
              </div>
            ))}
          </div>
        </Panel>

        <div className="space-y-5">
          <Panel title="Weather" subtitle="Kotagiri · Today">
            <div className="flex items-center gap-4">
              <div className="size-16 rounded-2xl gradient-earth flex items-center justify-center">
                <Sun className="size-8 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold font-display">22°C</div>
                <div className="text-sm text-muted-foreground">Partly cloudy · Good for harvesting</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              {[{ l: "Humidity", v: "68%" }, { l: "Rainfall", v: "0 mm" }, { l: "Soil", v: "Moist" }].map((w) => (
                <div key={w.l} className="bg-muted/50 rounded-lg py-2">
                  <div className="text-xs text-muted-foreground">{w.l}</div>
                  <div className="text-sm font-semibold mt-0.5">{w.v}</div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Harvest Quota" subtitle="Ashwagandha · This season">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold font-display">320 <span className="text-base text-muted-foreground">/ 500 kg</span></div>
                <div className="text-xs text-muted-foreground mt-1">NMPB approved quota</div>
              </div>
              <Badge tone="success">64% used</Badge>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden mt-3">
              <div className="h-full gradient-leaf" style={{ width: "64%" }} />
            </div>
          </Panel>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-5">
        <Panel title="GPS Activity" subtitle="Verified collection zones" className="lg:col-span-2">
          <div className="max-w-sm mx-auto">
            <IndiaMap markers={REGIONS.slice(0, 3).map((r) => ({ lat: r.lat, lng: r.lng, label: r.name }))} />
          </div>
        </Panel>
        <Panel title="Blockchain Sync Status">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald/5 border border-emerald/20">
              <CheckCircle2 className="size-5 text-emerald shrink-0" />
              <div className="flex-1">
                <div className="text-sm font-medium">All records synced</div>
                <div className="text-xs text-muted-foreground">Last sync: 2 minutes ago</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">Recent transactions</div>
            {BATCHES.slice(0, 3).map((b) => (
              <div key={b.id} className="flex items-center gap-2 text-xs">
                <ShieldCheck className="size-3 text-emerald" />
                <span className="font-mono truncate flex-1">{b.txHash.slice(0, 20)}…</span>
                <span className="text-muted-foreground">#{b.block.toLocaleString().slice(-4)}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </PortalShell>
  );
}
