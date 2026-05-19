import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, type NavItem } from "@/components/layout/PortalShell";
import { Panel, Badge } from "@/components/ui-kit/Panel";
import { IndiaMap } from "@/components/maps/IndiaMap";
import {
  LayoutDashboard, PlusCircle, Leaf, Map, FileBarChart, Settings,
  MapPin, Target, LocateFixed, TreePine, AlertTriangle
} from "lucide-react";
import { REGIONS, BATCHES } from "@/lib/mock-data";

export const Route = createFileRoute("/farmer/map")({ component: GpsMap });

const nav: NavItem[] = [
  { label: "Dashboard", to: "/farmer/dashboard", icon: LayoutDashboard },
  { label: "New Collection", to: "/farmer/new-collection", icon: PlusCircle },
  { label: "My Collections", to: "/farmer/collections", icon: Leaf },
  { label: "Harvest Reports", to: "/farmer/harvest-reports", icon: FileBarChart },
  { label: "GPS Collection Map", to: "/farmer/map", icon: Map },
  { label: "Settings", to: "/farmer/settings", icon: Settings },
];

function GpsMap() {
  const farmerBatches = BATCHES.filter(b => b.farmer.id === "F-2847");
  const markers = farmerBatches.map(b => ({
    lat: b.gps.lat,
    lng: b.gps.lng,
    label: b.id,
    tone: "success"
  }));

  // Also show approved zones
  const zones = REGIONS.map(r => ({
    lat: r.lat,
    lng: r.lng,
    label: `Approved Zone: ${r.name}`,
    tone: "info"
  }));

  const allMarkers = [...zones, ...markers];

  return (
    <PortalShell portalName="Farmer Portal" portalTagline="Geo-tagged collection" nav={nav} user={{ name: "Ramesh Kumar", role: "Farmer · F-2847", initials: "RK" }}>
      <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold font-display">GPS Collection Map</h1>
          <p className="text-sm text-muted-foreground">Interactive map of your harvest zones and records</p>
        </div>
        <div className="flex gap-2">
          <Badge tone="success"><LocateFixed className="size-3" /> GPS Active</Badge>
          <Badge tone="info">Approved Zones Synced</Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Panel className="!p-0 overflow-hidden relative h-full min-h-[600px]" title="Interactive Territory Map" subtitle="Live tracking of your geo-stamped collections">
            <div className="absolute inset-0 top-[73px] bg-gradient-to-br from-emerald/10 via-leaf/5 to-background flex items-center justify-center p-8">
               <IndiaMap markers={allMarkers as any} />
            </div>
            {/* Overlay stats */}
            <div className="absolute top-[85px] right-5 space-y-3 w-48">
              <div className="bg-card/80 backdrop-blur-md rounded-xl p-3 border border-border shadow-soft">
                <div className="text-[10px] uppercase text-muted-foreground font-semibold flex items-center gap-1">
                  <Target className="size-3" /> Coverage
                </div>
                <div className="text-lg font-bold mt-1 text-foreground">12 km²</div>
              </div>
              <div className="bg-card/80 backdrop-blur-md rounded-xl p-3 border border-border shadow-soft">
                <div className="text-[10px] uppercase text-muted-foreground font-semibold flex items-center gap-1">
                  <TreePine className="size-3" /> Active Zones
                </div>
                <div className="text-lg font-bold mt-1 text-foreground">3 <span className="text-sm font-normal text-muted-foreground">/ 5 approved</span></div>
              </div>
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Recent Coordinates" subtitle="Geo-stamped on-chain">
            <div className="space-y-3">
              {farmerBatches.slice(0, 5).map((b) => (
                <div key={b.id} className="p-3 rounded-xl border border-border/50 bg-card hover:bg-muted/50 transition-colors group">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4 text-emerald" />
                      <span className="font-semibold text-sm text-foreground">{b.id.slice(0, 11)}...</span>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">{b.date.split("T")[0]}</span>
                  </div>
                  <div className="mt-2 text-xs font-mono text-muted-foreground bg-muted/40 p-1.5 rounded">
                    {b.gps.lat.toFixed(4)}°N, {b.gps.lng.toFixed(4)}°E
                  </div>
                  <div className="mt-2 text-[10px] flex justify-between items-center">
                    <span className="text-emerald font-medium">±2.4m accuracy</span>
                    <span className="text-muted-foreground group-hover:text-primary transition-colors cursor-pointer font-medium">View on Ledger →</span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Geo-fencing Alerts">
            <div className="flex items-start gap-3 p-4 bg-saffron/10 border border-saffron/20 rounded-xl">
              <AlertTriangle className="size-5 text-saffron shrink-0" />
              <div>
                <div className="text-sm font-medium text-saffron">Approaching Boundary</div>
                <div className="text-xs text-saffron/80 mt-1 leading-relaxed">
                  Your last collection was within 500m of the restricted conservation zone in Nilgiris. Please remain in Sector 4B.
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </PortalShell>
  );
}
