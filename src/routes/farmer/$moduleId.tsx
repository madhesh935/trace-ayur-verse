import { createFileRoute, Link } from "@tanstack/react-router";
import { PortalShell, type NavItem } from "@/components/layout/PortalShell";
import { Panel, Badge, StatCard } from "@/components/ui-kit/Panel";
import {
  LayoutDashboard, Settings, FileBarChart, Map, PlusCircle, Leaf,
  ShieldCheck, MapPin, TrendingUp, Award, Bell, Moon, Globe, Lock, Wifi, User,
  CheckCircle2, AlertTriangle, Download, Calendar, BarChart3, ArrowRight,
} from "lucide-react";
import { BATCHES, COLLECTION_TREND, HERBS, SUSTAINABILITY_BY_REGION, FARMERS } from "@/lib/mock-data";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/farmer/$moduleId")({ component: FarmerModule });

const nav: NavItem[] = [
  { label: "Dashboard", to: "/farmer/dashboard", icon: LayoutDashboard },
  { label: "New Collection", to: "/farmer/new-collection", icon: PlusCircle, badge: "+" },
  { label: "My Collections", to: "/farmer/collections", icon: Leaf },
  { label: "Harvest Reports", to: "/farmer/harvest-reports", icon: FileBarChart },
  { label: "GPS Collection Map", to: "/farmer/map", icon: Map },
  { label: "Settings", to: "/farmer/settings", icon: Settings },
];

function FarmerModule() {
  const { moduleId } = Route.useParams();

  const pages: Record<string, React.ReactNode> = {
    "harvest-reports": <HarvestReports />,
    "settings": <FarmerSettings />,
  };

  return (
    <PortalShell portalName="Farmer Portal" portalTagline="Geo-tagged collection" nav={nav} user={{ name: "Ramesh Kumar", role: "Farmer · F-2847", initials: "RK" }}>
      {pages[moduleId] ?? <NotFound />}
    </PortalShell>
  );
}

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="size-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
        <AlertTriangle className="size-8 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-bold text-foreground">Page Not Found</h2>
      <p className="text-sm text-muted-foreground mt-2">This module doesn't exist yet.</p>
      <Link to="/farmer/dashboard" className="mt-6 h-11 px-6 rounded-xl gradient-hero text-white font-semibold flex items-center gap-2 shadow-glow"><ArrowRight className="size-4" /> Back to Dashboard</Link>
    </div>
  );
}

// ── HARVEST REPORTS ──────────────────────────────────────────────────────────
function HarvestReports() {
  const myBatches = BATCHES.filter((_, i) => i % 7 === 0 || i % 5 === 1);
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold font-display tracking-tight">Harvest Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">Your complete collection history with sustainability scoring</p>
        </div>
        <button className="h-11 px-5 rounded-xl border border-border font-semibold flex items-center gap-2 hover:bg-muted/50 transition-colors">
          <Download className="size-4" /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Yield (2026)" value="1,840 kg" delta="+22% vs 2025" icon={TrendingUp} tone="emerald" />
        <StatCard label="Verified Batches" value="31" icon={ShieldCheck} tone="primary" hint="All on-chain" />
        <StatCard label="Avg Sustainability" value="92 / 100" delta="Top 12% nationally" icon={Award} tone="emerald" />
        <StatCard label="Zones Harvested" value="6" icon={MapPin} tone="earth" hint="Across Tamil Nadu" />
      </div>

      <Panel title="Monthly Collection Volume" subtitle="Kg harvested vs. NMPB target · 2026">
        <div className="h-60">
          <ResponsiveContainer>
            <AreaChart data={COLLECTION_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="rg1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.68 0.17 155)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="oklch(0.68 0.17 155)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="rg2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.78 0.16 65)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="oklch(0.78 0.16 65)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "oklch(0.5 0.03 140)" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "oklch(0.5 0.03 140)" }} />
              <Tooltip contentStyle={{ backgroundColor: "oklch(0.15 0.03 155)", borderRadius: "12px", border: "none", color: "#fff" }} />
              <Area type="monotone" dataKey="kg" stroke="oklch(0.68 0.17 155)" fill="url(#rg1)" strokeWidth={3} name="Harvested (kg)" />
              <Area type="monotone" dataKey="target" stroke="oklch(0.78 0.16 65)" fill="url(#rg2)" strokeWidth={2} strokeDasharray="4 4" name="Target (kg)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <Panel title="Herb-wise Breakdown" subtitle="Volume per species · this season">
        <div className="h-52">
          <ResponsiveContainer>
            <BarChart data={HERBS.slice(0, 8).map((h, i) => ({ name: h.name, kg: 40 + (i * 83) % 280 }))} margin={{ left: -20 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "oklch(0.5 0.03 140)" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "oklch(0.5 0.03 140)" }} />
              <Tooltip contentStyle={{ backgroundColor: "oklch(0.15 0.03 155)", borderRadius: "12px", border: "none", color: "#fff" }} />
              <Bar dataKey="kg" fill="oklch(0.55 0.15 155)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <Panel title="All Collection Records" className="!p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-muted/50 border-b border-border/60 text-muted-foreground text-xs uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4">Batch ID</th>
                <th className="px-6 py-4">Herb</th>
                <th className="px-6 py-4">Volume</th>
                <th className="px-6 py-4">Sustainability</th>
                <th className="px-6 py-4">Moisture</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {myBatches.map((b) => (
                <tr key={b.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-3.5 font-mono text-xs text-muted-foreground">{b.id}</td>
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-2">
                      <span>{b.herb.emoji}</span>
                      <span className="font-semibold">{b.herb.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 font-bold">{b.quantity} {b.unit}</td>
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-muted max-w-[60px]">
                        <div className="h-full rounded-full bg-emerald" style={{ width: `${b.sustainability}%` }} />
                      </div>
                      <span className="text-emerald font-semibold">{b.sustainability}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5">{b.moisture}%</td>
                  <td className="px-6 py-3.5"><Badge tone={b.status === "Verified" ? "success" : "info"}>{b.status}</Badge></td>
                  <td className="px-6 py-3.5 text-right text-muted-foreground text-xs">{new Date(b.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

// ── SETTINGS ─────────────────────────────────────────────────────────────────
function FarmerSettings() {
  const farmer = FARMERS[0];
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold font-display tracking-tight">Account Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your profile, notifications, and app preferences</p>
      </div>

      {/* Profile */}
      <Panel title="Farmer Profile" subtitle="Your identity on the AyurTrace blockchain">
        <div className="flex items-center gap-5 mb-6">
          <div className="size-20 rounded-2xl gradient-hero flex items-center justify-center text-white text-2xl font-bold shadow-glow">RK</div>
          <div>
            <div className="text-xl font-bold">{farmer.name}</div>
            <div className="text-sm text-muted-foreground">Farmer ID: {farmer.id} · Joined {farmer.joined}</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge tone="success"><ShieldCheck className="size-3" /> NMPB Verified</Badge>
              <Badge tone="info"><Award className="size-3" /> Trust Score: {farmer.score}/100</Badge>
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { l: "Full Name", v: farmer.name, icon: User },
            { l: "Village", v: farmer.village, icon: MapPin },
            { l: "Region", v: `${farmer.region}, Tamil Nadu`, icon: Globe },
            { l: "Farmer ID", v: farmer.id, icon: ShieldCheck },
          ].map((f) => (
            <div key={f.l} className="bg-muted/30 border border-border/40 rounded-xl p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">
                <f.icon className="size-3.5" /> {f.l}
              </div>
              <div className="font-semibold text-foreground">{f.v}</div>
            </div>
          ))}
        </div>
      </Panel>

      {/* Notifications */}
      <Panel title="Notifications" subtitle="Control what alerts you receive">
        <div className="space-y-3">
          {[
            { label: "Batch verification alerts", sub: "When your collection is approved by a lab", on: true },
            { label: "Geo-fence warnings", sub: "Alerts when you approach zone boundaries", on: true },
            { label: "Quota updates", sub: "When NMPB adjusts your seasonal quota", on: true },
            { label: "Blockchain sync status", sub: "Notify when offline records are synced", on: false },
            { label: "Weather & harvest tips", sub: "Daily conditions for your region", on: true },
          ].map((n) => (
            <div key={n.label} className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-card hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-3">
                <Bell className="size-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-semibold">{n.label}</div>
                  <div className="text-xs text-muted-foreground">{n.sub}</div>
                </div>
              </div>
              <button className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${n.on ? "bg-emerald" : "bg-muted"}`}>
                <span className={`inline-block size-5 rounded-full bg-white shadow-sm transition-transform mt-0.5 ${n.on ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </Panel>

      {/* App Preferences */}
      <Panel title="App Preferences">
        <div className="space-y-3">
          {[
            { label: "Dark Mode", sub: "Use dark theme across the app", icon: Moon, on: true },
            { label: "Offline Mode", sub: "Cache data for areas without connectivity", icon: Wifi, on: true },
            { label: "Language", sub: "App interface language", icon: Globe, value: "English (India)" },
            { label: "Privacy Mode", sub: "Hide farmer details from consumer view", icon: Lock, on: false },
          ].map((p) => (
            <div key={p.label} className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-card hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-3">
                <p.icon className="size-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-semibold">{p.label}</div>
                  <div className="text-xs text-muted-foreground">{p.sub}</div>
                </div>
              </div>
              {"value" in p
                ? <span className="text-sm font-medium text-muted-foreground">{p.value}</span>
                : <button className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${p.on ? "bg-primary" : "bg-muted"}`}>
                    <span className={`inline-block size-5 rounded-full bg-white shadow-sm transition-transform mt-0.5 ${p.on ? "translate-x-5" : "translate-x-0.5"}`} />
                  </button>
              }
            </div>
          ))}
        </div>
      </Panel>

      <div className="flex gap-3">
        <button className="h-11 px-8 rounded-xl gradient-hero text-white font-semibold shadow-glow hover:scale-[1.02] transition-transform">Save Changes</button>
        <button className="h-11 px-6 rounded-xl border border-border font-medium hover:bg-muted/50 transition-colors">Cancel</button>
      </div>
    </div>
  );
}
