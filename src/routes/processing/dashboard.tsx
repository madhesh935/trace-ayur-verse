import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, type NavItem } from "@/components/layout/PortalShell";
import { Panel, StatCard, Badge } from "@/components/ui-kit/Panel";
import { IndiaMap } from "@/components/maps/IndiaMap";
import {
  LayoutDashboard, Inbox, GitMerge, Wind, Cog, Package, Truck, Warehouse, FileText,
  Thermometer, Activity, ArrowRight, CheckCircle2, Clock,
} from "lucide-react";
import { BATCHES, REGIONS } from "@/lib/mock-data";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/processing/dashboard")({ component: ProcessingDashboard });

const nav: NavItem[] = [
  { label: "Dashboard", to: "/processing/dashboard", icon: LayoutDashboard, i18nKey: "nav.dashboard" },
  { label: "Incoming Batches", to: "/processing/incoming", icon: Inbox, badge: "12", i18nKey: "nav.incoming" },
  { label: "Batch Aggregation", to: "/processing/aggregation", icon: GitMerge, i18nKey: "nav.aggregation" },
  { label: "Drying Operations", to: "/processing/drying", icon: Wind, i18nKey: "nav.drying" },
  { label: "Grinding Operations", to: "/processing/grinding", icon: Cog, i18nKey: "nav.grinding" },
  { label: "Packaging", to: "/processing/packaging", icon: Package, i18nKey: "nav.packaging" },
  { label: "Shipment Tracking", to: "/processing/shipment", icon: Truck, i18nKey: "nav.shipment" },
  { label: "Warehouse", to: "/processing/warehouse", icon: Warehouse, i18nKey: "nav.warehouse" },
  { label: "Reports", to: "/processing/reports", icon: FileText, i18nKey: "nav.reports" },
];

const tempData = Array.from({ length: 24 }).map((_, i) => ({
  h: `${i}:00`, t: 38 + Math.sin(i / 3) * 6 + (i % 4) * 0.4, h2: 28 + Math.cos(i / 4) * 5,
}));
const inventoryData = ["Ashwagandha", "Tulsi", "Turmeric", "Brahmi", "Neem", "Giloy"].map((n, i) => ({
  herb: n, kg: 180 + (i * 73) % 400,
}));

function ProcessingDashboard() {
  return (
    <PortalShell portalName="Processing Portal" portalTagline="Aggregation · Manufacturing · Logistics" nav={nav} user={{ name: "Anand Mehta", role: "Plant Manager · Coimbatore Hub", initials: "AM" }}>
      <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold font-display">Coimbatore Processing Hub</h1>
          <p className="text-sm text-muted-foreground">Shift A · 6 lines active · 142 batches in motion</p>
        </div>
        <div className="flex gap-2">
          <Badge tone="success"><Activity className="size-3" /> All systems nominal</Badge>
          <Badge tone="info">Audit-ready</Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Incoming Batches" value="12" delta="+4 today" icon={Inbox} tone="primary" />
        <StatCard label="Active Processing" value="38" icon={Cog} tone="emerald" hint="3 lines: dry / grind / pack" />
        <StatCard label="Warehouse Used" value="74%" icon={Warehouse} tone="saffron" hint="2,140 of 2,900 kg cap" />
        <StatCard label="In Transit" value="9 trucks" delta="6 on time · 3 delayed" icon={Truck} tone="earth" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Panel title="Drying Chamber · Line 2" subtitle="Last 24 hours · Set point 42°C / 30% RH" className="lg:col-span-2">
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { l: "Temperature", v: "41.8°C", t: "success" },
              { l: "Humidity", v: "29.4%", t: "success" },
              { l: "Cycle Time", v: "06:42", t: "info" },
            ].map((m) => (
              <div key={m.l} className="bg-muted/40 rounded-xl p-3">
                <div className="text-xs text-muted-foreground flex items-center gap-1.5"><Thermometer className="size-3" /> {m.l}</div>
                <div className="font-bold text-lg mt-1">{m.v}</div>
              </div>
            ))}
          </div>
          <div className="h-48">
            <ResponsiveContainer>
              <LineChart data={tempData}>
                <XAxis dataKey="h" axisLine={false} tickLine={false} fontSize={10} />
                <YAxis hide />
                <Tooltip />
                <Line type="monotone" dataKey="t" stroke="oklch(0.78 0.16 65)" strokeWidth={2.5} dot={false} name="Temp" />
                <Line type="monotone" dataKey="h2" stroke="oklch(0.62 0.12 200)" strokeWidth={2.5} dot={false} name="Humidity" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Batch Genealogy" subtitle="Aggregation tree">
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 p-3 rounded-lg gradient-hero text-white">
              <Package className="size-4" />
              <div className="flex-1">
                <div className="font-semibold">AYT-ASH-MX-0218</div>
                <div className="text-xs opacity-80">Merged batch · 240 kg</div>
              </div>
            </div>
            <div className="pl-4 border-l-2 border-emerald ml-3 space-y-2">
              {BATCHES.slice(0, 4).map((b) => (
                <div key={b.id} className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/40">
                  <div className="text-lg">{b.herb.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-mono truncate">{b.id}</div>
                    <div className="text-[10px] text-muted-foreground">{b.farmer.name} · {b.quantity}kg</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-5">
        <Panel title="Warehouse Inventory" subtitle="By species · kg" className="lg:col-span-2">
          <div className="h-48">
            <ResponsiveContainer>
              <BarChart data={inventoryData}>
                <XAxis dataKey="herb" axisLine={false} tickLine={false} fontSize={11} />
                <Tooltip />
                <Bar dataKey="kg" fill="oklch(0.55 0.15 155)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Live Shipments" subtitle="GPS-tracked fleet">
          <IndiaMap markers={REGIONS.slice(0, 4).map((r, i) => ({ lat: r.lat, lng: r.lng, label: `Truck-${i + 1}`, tone: i === 2 ? "warn" : undefined }))} />
        </Panel>
      </div>

      <Panel title="Incoming Batches Queue" subtitle="Awaiting intake & aggregation" className="mt-5 !p-0">
        <div className="divide-y divide-border">
          {BATCHES.slice(0, 6).map((b, i) => (
            <div key={b.id} className="flex items-center gap-4 p-4 hover:bg-muted/40">
              <div className="size-10 rounded-lg bg-emerald/10 flex items-center justify-center text-xl">{b.herb.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">{b.id} · {b.herb.name}</div>
                <div className="text-xs text-muted-foreground">From {b.farmer.name} · {b.region.name} · {b.quantity}kg</div>
              </div>
              <Badge tone={i % 3 === 0 ? "success" : "info"}>{i % 3 === 0 ? <><CheckCircle2 className="size-3" /> Ready</> : <><Clock className="size-3" /> Inbound</>}</Badge>
              <button className="h-9 px-3 rounded-lg bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1">Process <ArrowRight className="size-3" /></button>
            </div>
          ))}
        </div>
      </Panel>
    </PortalShell>
  );
}
