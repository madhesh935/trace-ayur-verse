import { createFileRoute, Link } from "@tanstack/react-router";
import { PortalShell, type NavItem } from "@/components/layout/PortalShell";
import { Panel, Badge } from "@/components/ui-kit/Panel";
import {
  LayoutDashboard, PlusCircle, Leaf, Map, Award, GraduationCap, Settings, FileBarChart,
  Search, Filter, QrCode, MapPin, ShieldCheck,
} from "lucide-react";
import { BATCHES } from "@/lib/mock-data";

export const Route = createFileRoute("/farmer/collections")({ component: Collections });

const nav: NavItem[] = [
  { label: "Dashboard", to: "/farmer/dashboard", icon: LayoutDashboard },
  { label: "New Collection", to: "/farmer/new-collection", icon: PlusCircle },
  { label: "My Collections", to: "/farmer/collections", icon: Leaf },
  { label: "Harvest Reports", to: "/farmer/dashboard", icon: FileBarChart },
  { label: "GPS Collection Map", to: "/farmer/dashboard", icon: Map },
  { label: "Rewards & Incentives", to: "/farmer/dashboard", icon: Award },
  { label: "Training Center", to: "/farmer/dashboard", icon: GraduationCap },
  { label: "Settings", to: "/farmer/dashboard", icon: Settings },
];

function Collections() {
  return (
    <PortalShell portalName="Farmer Portal" portalTagline="Geo-tagged collection" nav={nav} user={{ name: "Ramesh Kumar", role: "Farmer · F-2847", initials: "RK" }}>
      <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold font-display">My Collections</h1>
          <p className="text-sm text-muted-foreground">{BATCHES.length} verified harvest records · all on-chain</p>
        </div>
        <Link to="/farmer/new-collection" className="h-11 px-5 rounded-xl gradient-hero text-white font-semibold shadow-glow flex items-center gap-2"><PlusCircle className="size-4" /> New Collection</Link>
      </div>

      <Panel className="!p-0">
        <div className="p-5 flex flex-wrap gap-3 border-b border-border">
          <div className="flex-1 min-w-64 relative">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Search by batch ID, herb, location..." className="w-full h-10 pl-9 pr-3 rounded-lg bg-muted/60 border border-transparent focus:border-ring focus:bg-card outline-none text-sm" />
          </div>
          <select className="h-10 px-3 rounded-lg border border-border bg-card text-sm">
            <option>All herbs</option><option>Ashwagandha</option><option>Tulsi</option>
          </select>
          <select className="h-10 px-3 rounded-lg border border-border bg-card text-sm">
            <option>All statuses</option><option>Verified</option><option>In Transit</option>
          </select>
          <button className="h-10 px-4 rounded-lg border border-border bg-card text-sm font-medium flex items-center gap-2"><Filter className="size-4" /> More filters</button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
          {BATCHES.map((b) => (
            <div key={b.id} className="border border-border rounded-2xl p-4 hover:shadow-card hover:border-primary/30 transition-all bg-card group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-xl bg-emerald/10 flex items-center justify-center text-2xl">{b.herb.emoji}</div>
                  <div>
                    <div className="font-semibold">{b.herb.name}</div>
                    <div className="text-xs text-muted-foreground font-mono">{b.id}</div>
                  </div>
                </div>
                <Badge tone={b.status === "Verified" ? "success" : "info"}>{b.status}</Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <div className="bg-muted/40 rounded-lg py-2">
                  <div className="text-[10px] text-muted-foreground">Quantity</div>
                  <div className="text-sm font-bold mt-0.5">{b.quantity}{b.unit}</div>
                </div>
                <div className="bg-muted/40 rounded-lg py-2">
                  <div className="text-[10px] text-muted-foreground">Sustain</div>
                  <div className="text-sm font-bold text-emerald mt-0.5">{b.sustainability}</div>
                </div>
                <div className="bg-muted/40 rounded-lg py-2">
                  <div className="text-[10px] text-muted-foreground">Moisture</div>
                  <div className="text-sm font-bold mt-0.5">{b.moisture}%</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="size-3" /> {b.region.name}</span>
                <span className="flex items-center gap-1 text-emerald"><ShieldCheck className="size-3" /> #{b.block.toString().slice(-5)}</span>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="flex-1 h-9 rounded-lg bg-muted hover:bg-muted/70 text-xs font-medium flex items-center justify-center gap-1.5"><QrCode className="size-3.5" /> QR</button>
                <button className="flex-1 h-9 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90">Open</button>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </PortalShell>
  );
}
