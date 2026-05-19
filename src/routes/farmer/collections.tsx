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
  { label: "Harvest Reports", to: "/farmer/harvest-reports", icon: FileBarChart },
  { label: "GPS Collection Map", to: "/farmer/map", icon: Map },
  { label: "Settings", to: "/farmer/settings", icon: Settings },
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

      <Panel className="!p-0 border-none shadow-none bg-transparent">
        <div className="p-4 mb-4 flex flex-wrap gap-3 bg-card/80 backdrop-blur-xl border border-border/60 rounded-[1.25rem] shadow-sm">
          <div className="flex-1 min-w-[240px] relative group">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input placeholder="Search by batch ID, herb, location..." className="w-full h-11 pl-9 pr-4 rounded-xl bg-muted/30 border border-transparent hover:bg-muted/50 focus:border-primary/50 focus:bg-card focus:ring-4 focus:ring-primary/5 outline-none text-sm transition-all" />
          </div>
          <select className="h-11 px-4 rounded-xl border border-border/60 bg-card text-sm font-medium hover:border-border transition-colors outline-none focus:border-primary">
            <option>All species</option><option>Ashwagandha</option><option>Tulsi</option>
          </select>
          <select className="h-11 px-4 rounded-xl border border-border/60 bg-card text-sm font-medium hover:border-border transition-colors outline-none focus:border-primary">
            <option>Any status</option><option>Verified</option><option>Processing</option><option>In Transit</option>
          </select>
          <button className="h-11 px-5 rounded-xl border border-border/60 bg-card text-sm font-medium flex items-center gap-2 hover:bg-muted/50 transition-colors"><Filter className="size-4" /> Filters</button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BATCHES.map((b) => (
            <div key={b.id} className="border border-border/60 rounded-[1.25rem] p-5 hover:shadow-card hover:border-primary/30 transition-all duration-300 bg-card/80 backdrop-blur-md group flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3.5">
                  <div className="size-12 rounded-[0.85rem] bg-gradient-to-br from-muted to-muted/50 border border-border/50 flex items-center justify-center text-2xl shadow-sm group-hover:scale-105 transition-transform">{b.herb.emoji}</div>
                  <div>
                    <div className="font-bold text-foreground text-[15px] leading-tight">{b.herb.name}</div>
                    <div className="text-xs text-muted-foreground font-mono mt-0.5">{b.id}</div>
                  </div>
                </div>
                <Badge tone={b.status === "Verified" ? "success" : b.status === "Processing" ? "warning" : "info"}>{b.status}</Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-auto text-center mb-4">
                <div className="bg-muted/30 rounded-xl py-2.5 border border-border/30">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Volume</div>
                  <div className="text-sm font-bold text-foreground mt-1">{b.quantity}<span className="text-xs text-muted-foreground ml-0.5">{b.unit}</span></div>
                </div>
                <div className="bg-muted/30 rounded-xl py-2.5 border border-border/30">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Sustain</div>
                  <div className="text-sm font-bold text-emerald mt-1">{b.sustainability}<span className="text-[10px] text-emerald/70 ml-0.5">/100</span></div>
                </div>
                <div className="bg-muted/30 rounded-xl py-2.5 border border-border/30">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Moisture</div>
                  <div className="text-sm font-bold text-foreground mt-1">{b.moisture}%</div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border/50 flex items-center justify-between text-xs mb-4">
                <span className="flex items-center gap-1.5 text-muted-foreground font-medium"><MapPin className="size-3.5" /> {b.region.name}</span>
                <span className="flex items-center gap-1.5 text-emerald font-medium bg-emerald/10 px-2 py-0.5 rounded-md"><ShieldCheck className="size-3.5" /> Blk {b.block.toString().slice(-4)}</span>
              </div>
              
              <div className="flex gap-2.5 mt-auto">
                <button className="flex-1 h-10 rounded-xl bg-muted/50 hover:bg-muted border border-transparent hover:border-border/50 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors text-foreground"><QrCode className="size-4" /> Export QR</button>
                <button className="flex-1 h-10 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 shadow-sm transition-opacity">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </PortalShell>
  );
}
