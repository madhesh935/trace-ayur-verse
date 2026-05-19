import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, type NavItem } from "@/components/layout/PortalShell";
import { Panel, Badge, StatCard } from "@/components/ui-kit/Panel";
import { LayoutDashboard, Inbox, GitMerge, Wind, Cog, Package, Truck, Warehouse, FileText, CheckCircle2, Clock, AlertTriangle, ArrowRight, Download } from "lucide-react";
import { BATCHES } from "@/lib/mock-data";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/processing/$moduleId")({ component: ProcessingModule });

const nav: NavItem[] = [
  { label: "Dashboard", to: "/processing/dashboard", icon: LayoutDashboard },
  { label: "Incoming Batches", to: "/processing/incoming", icon: Inbox, badge: "12" },
  { label: "Batch Aggregation", to: "/processing/aggregation", icon: GitMerge },
  { label: "Drying Operations", to: "/processing/drying", icon: Wind },
  { label: "Grinding Operations", to: "/processing/grinding", icon: Cog },
  { label: "Packaging", to: "/processing/packaging", icon: Package },
  { label: "Shipment Tracking", to: "/processing/shipment", icon: Truck },
  { label: "Warehouse", to: "/processing/warehouse", icon: Warehouse },
  { label: "Reports", to: "/processing/reports", icon: FileText },
];

function ProcessingModule() {
  const { moduleId } = Route.useParams();
  const pages: Record<string, React.ReactNode> = {
    incoming: <IncomingBatches />,
    aggregation: <Aggregation />,
    drying: <Drying />,
    grinding: <Grinding />,
    packaging: <Packaging />,
    shipment: <Shipment />,
    warehouse: <WarehousePage />,
    reports: <Reports />,
  };
  return (
    <PortalShell portalName="Processing Portal" portalTagline="Aggregation · Manufacturing · Logistics" nav={nav} user={{ name: "Anand Mehta", role: "Plant Manager · Coimbatore Hub", initials: "AM" }}>
      {pages[moduleId] ?? <div className="py-20 text-center text-muted-foreground">Module not found.</div>}
    </PortalShell>
  );
}

function IncomingBatches() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div><h1 className="text-3xl font-bold font-display">Incoming Batches</h1><p className="text-sm text-muted-foreground mt-1">Raw herb batches arriving at the processing hub for intake</p></div>
        <Badge tone="saffron"><Inbox className="size-3" /> 12 pending intake</Badge>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Arriving Today" value="12" delta="+4 from yesterday" icon={Inbox} tone="primary" />
        <StatCard label="Registered" value="38" icon={CheckCircle2} tone="emerald" hint="This week" />
        <StatCard label="Avg Arrival Time" value="6.2h" icon={Clock} tone="saffron" />
        <StatCard label="Total Volume" value="1,840 kg" icon={Package} tone="earth" />
      </div>
      <Panel title="Batch Intake Queue" className="!p-0">
        <table className="w-full text-sm whitespace-nowrap">
          <thead className="bg-muted/50 border-b border-border/60 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            <tr><th className="px-6 py-4">Batch ID</th><th className="px-6 py-4">Herb</th><th className="px-6 py-4">Farmer</th><th className="px-6 py-4">Origin</th><th className="px-6 py-4">Weight</th><th className="px-6 py-4">ETA</th><th className="px-6 py-4 text-right">Accept</th></tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {BATCHES.slice(0, 12).map((b, i) => (
              <tr key={b.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-3.5 font-mono text-xs">{b.id}</td>
                <td className="px-6 py-3.5"><div className="flex items-center gap-2"><span>{b.herb.emoji}</span><span className="font-semibold">{b.herb.name}</span></div></td>
                <td className="px-6 py-3.5 text-muted-foreground">{b.farmer.name}</td>
                <td className="px-6 py-3.5 text-muted-foreground">{b.region.name}</td>
                <td className="px-6 py-3.5 font-bold">{b.quantity} kg</td>
                <td className="px-6 py-3.5 text-muted-foreground text-xs">{i < 4 ? "Arrived" : `${i}h`}</td>
                <td className="px-6 py-3.5 text-right">
                  {i < 4
                    ? <button className="h-8 px-3 rounded-lg bg-emerald text-white text-xs font-medium">Accept</button>
                    : <Badge tone="info">En Route</Badge>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}

function Aggregation() {
  const mergedBatches = [
    { id: "AYT-ASH-MX-0218", herbs: "Ashwagandha (×4 farms)", total: 240, status: "Merged", farms: 4 },
    { id: "AYT-TUL-MX-0219", herbs: "Tulsi (×3 farms)", total: 180, status: "Merging", farms: 3 },
    { id: "AYT-TUR-MX-0220", herbs: "Turmeric (×5 farms)", total: 310, status: "Pending", farms: 5 },
  ];
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold font-display">Batch Aggregation</h1><p className="text-sm text-muted-foreground mt-1">Merge raw farm batches into standardized processing lots</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Merges" value="3" icon={GitMerge} tone="primary" />
        <StatCard label="Batches Merged" value="142" delta="This month" icon={CheckCircle2} tone="emerald" />
        <StatCard label="Avg Lot Size" value="248 kg" icon={Package} tone="earth" />
        <StatCard label="Traceability" value="100%" icon={CheckCircle2} tone="emerald" hint="All linked on-chain" />
      </div>
      <div className="space-y-4">
        {mergedBatches.map((m) => (
          <Panel key={m.id} title={m.id} subtitle={`${m.farms} source farms · ${m.total} kg total`}>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="text-sm text-muted-foreground">{m.herbs}</div>
              <Badge tone={m.status === "Merged" ? "success" : m.status === "Merging" ? "info" : "warning"}>{m.status}</Badge>
            </div>
            <div className="mt-4 pl-4 border-l-2 border-emerald space-y-2">
              {BATCHES.slice(0, m.farms).map((b) => (
                <div key={b.id} className="flex items-center gap-3 p-2.5 bg-muted/30 rounded-xl">
                  <span className="text-lg">{b.herb.emoji}</span>
                  <div className="flex-1">
                    <div className="text-xs font-mono">{b.id}</div>
                    <div className="text-xs text-muted-foreground">{b.farmer.name} · {b.quantity} kg</div>
                  </div>
                  <Badge tone="success">{b.sustainability}/100</Badge>
                </div>
              ))}
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

const tempData = Array.from({ length: 24 }).map((_, i) => ({ h: `${i}:00`, temp: 38 + Math.sin(i / 3) * 6, humidity: 28 + Math.cos(i / 4) * 5 }));

function Drying() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold font-display">Drying Operations</h1><p className="text-sm text-muted-foreground mt-1">Chamber drying control · Set point: 42°C / 30% RH</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Chambers" value="4 / 6" icon={Wind} tone="primary" />
        <StatCard label="Current Temp" value="41.8°C" delta="±0.2°C variance" icon={Wind} tone="emerald" />
        <StatCard label="Avg Cycle Time" value="6h 42m" icon={Clock} tone="saffron" />
        <StatCard label="Batches Drying" value="18" icon={Package} tone="earth" />
      </div>
      <Panel title="Chamber 2 · Temperature & Humidity (24h)" subtitle="Ashwagandha root · 240 kg">
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[{ l: "Temperature", v: "41.8°C", ok: true }, { l: "Humidity", v: "29.4%", ok: true }, { l: "Remaining", v: "1h 18m", ok: true }].map((m) => (
            <div key={m.l} className="bg-card border border-border/60 rounded-xl p-4">
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{m.l}</div>
              <div className="text-2xl font-bold mt-1">{m.v}</div>
            </div>
          ))}
        </div>
        <div className="h-52">
          <ResponsiveContainer>
            <LineChart data={tempData} margin={{ left: -20 }}>
              <XAxis dataKey="h" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} interval={3} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: "oklch(0.15 0.03 155)", borderRadius: "12px", border: "none", color: "#fff" }} />
              <Line type="monotone" dataKey="temp" stroke="oklch(0.78 0.16 65)" strokeWidth={2.5} dot={false} name="Temp °C" />
              <Line type="monotone" dataKey="humidity" stroke="oklch(0.62 0.12 200)" strokeWidth={2.5} dot={false} name="Humidity %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Panel>
    </div>
  );
}

function Grinding() {
  const lines = [
    { id: "Mill-1", herb: "Ashwagandha", mesh: "80 mesh", rpm: 1800, output: "42 kg/h", status: "Running" },
    { id: "Mill-2", herb: "Tulsi", mesh: "60 mesh", rpm: 1600, output: "38 kg/h", status: "Running" },
    { id: "Mill-3", herb: "Turmeric", mesh: "100 mesh", rpm: 2000, output: "51 kg/h", status: "Idle" },
    { id: "Mill-4", herb: "Brahmi", mesh: "80 mesh", rpm: 1750, output: "40 kg/h", status: "Maintenance" },
  ];
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold font-display">Grinding Operations</h1><p className="text-sm text-muted-foreground mt-1">Ball mill and pulverizer operations · GMP compliant</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Mills Active" value="2 / 4" icon={Cog} tone="primary" />
        <StatCard label="Output Today" value="840 kg" delta="+12% vs avg" icon={Package} tone="emerald" />
        <StatCard label="Avg Fineness" value="80 mesh" icon={Cog} tone="earth" />
        <StatCard label="In Maintenance" value="1" icon={AlertTriangle} tone="saffron" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {lines.map((l) => (
          <div key={l.id} className="bg-card/80 border border-border/60 rounded-2xl p-5 hover:border-primary/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center"><Cog className="size-5 text-primary" /></div>
                <div><div className="font-bold">{l.id}</div><div className="text-xs text-muted-foreground">{l.herb}</div></div>
              </div>
              <Badge tone={l.status === "Running" ? "success" : l.status === "Idle" ? "info" : "warning"}>{l.status}</Badge>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-muted/30 rounded-lg py-2"><div className="text-muted-foreground">Mesh</div><div className="font-bold mt-0.5">{l.mesh}</div></div>
              <div className="bg-muted/30 rounded-lg py-2"><div className="text-muted-foreground">RPM</div><div className="font-bold mt-0.5">{l.rpm}</div></div>
              <div className="bg-muted/30 rounded-lg py-2"><div className="text-muted-foreground">Output</div><div className="font-bold mt-0.5">{l.output}</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Packaging() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold font-display">Packaging Operations</h1><p className="text-sm text-muted-foreground mt-1">Serialized packaging with QR code and blockchain tagging</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Units Packed Today" value="3,240" delta="+8% vs target" icon={Package} tone="emerald" />
        <StatCard label="Lines Active" value="3 / 4" icon={Package} tone="primary" />
        <StatCard label="Defect Rate" value="0.12%" delta="Industry avg: 0.8%" icon={CheckCircle2} tone="emerald" />
        <StatCard label="QR Codes Issued" value="3,240" icon={CheckCircle2} tone="earth" hint="All blockchain-linked" />
      </div>
      <Panel title="Packaging Queue" className="!p-0">
        <table className="w-full text-sm whitespace-nowrap">
          <thead className="bg-muted/50 border-b border-border/60 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            <tr><th className="px-6 py-4">Lot ID</th><th className="px-6 py-4">Herb</th><th className="px-6 py-4">Pack Size</th><th className="px-6 py-4">Units</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Action</th></tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {BATCHES.slice(0, 10).map((b, i) => (
              <tr key={b.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-3.5 font-mono text-xs">{b.id}</td>
                <td className="px-6 py-3.5"><div className="flex items-center gap-2"><span>{b.herb.emoji}</span><span className="font-semibold">{b.herb.name}</span></div></td>
                <td className="px-6 py-3.5 text-muted-foreground">{["100g", "250g", "500g"][i % 3]}</td>
                <td className="px-6 py-3.5 font-bold">{Math.floor(b.quantity * 4)} units</td>
                <td className="px-6 py-3.5"><Badge tone={i % 3 === 0 ? "success" : i % 3 === 1 ? "info" : "warning"}>{["Packed", "In Progress", "Queued"][i % 3]}</Badge></td>
                <td className="px-6 py-3.5 text-right"><button className="text-primary text-xs font-semibold hover:underline">Print Labels</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}

function Shipment() {
  const trucks = [
    { id: "TRK-001", route: "Coimbatore → Mumbai", herb: "Ashwagandha", kg: 480, status: "On Time", eta: "Aug 24, 06:00", driver: "Ravi Kumar" },
    { id: "TRK-002", route: "Coimbatore → Delhi", herb: "Tulsi", kg: 320, status: "Delayed", eta: "Aug 25, 14:00", driver: "Mohan Singh" },
    { id: "TRK-003", route: "Coimbatore → Pune", herb: "Turmeric", kg: 550, status: "On Time", eta: "Aug 23, 22:00", driver: "Suresh P." },
    { id: "TRK-004", route: "Coimbatore → Bengaluru", herb: "Brahmi", kg: 210, status: "Delivered", eta: "Completed", driver: "Arun M." },
  ];
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold font-display">Shipment Tracking</h1><p className="text-sm text-muted-foreground mt-1">Live GPS tracking for all outbound herb shipments</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Trucks" value="9" icon={Truck} tone="primary" />
        <StatCard label="On Time" value="6" delta="67% on schedule" icon={CheckCircle2} tone="emerald" />
        <StatCard label="Delayed" value="3" icon={AlertTriangle} tone="saffron" hint="Traffic / breakdown" />
        <StatCard label="Delivered Today" value="4" icon={CheckCircle2} tone="emerald" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {trucks.map((t) => (
          <div key={t.id} className="bg-card/80 border border-border/60 rounded-2xl p-5 hover:border-primary/30 hover:shadow-card transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center"><Truck className="size-5 text-primary" /></div>
                <div><div className="font-bold">{t.id}</div><div className="text-xs text-muted-foreground">{t.driver}</div></div>
              </div>
              <Badge tone={t.status === "On Time" ? "success" : t.status === "Delayed" ? "warning" : "info"}>{t.status}</Badge>
            </div>
            <div className="text-sm font-semibold text-foreground mb-1">{t.route}</div>
            <div className="text-xs text-muted-foreground mb-3">{t.herb} · {t.kg} kg</div>
            <div className="flex items-center gap-2 text-xs border-t border-border/50 pt-3">
              <Clock className="size-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">ETA:</span>
              <span className="font-semibold">{t.eta}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WarehousePage() {
  const inventory = ["Ashwagandha", "Tulsi", "Turmeric", "Brahmi", "Neem", "Giloy"].map((n, i) => ({
    name: n, stored: 180 + (i * 73) % 400, capacity: 600, zone: ["A", "B", "C"][i % 3],
  }));
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold font-display">Warehouse Management</h1><p className="text-sm text-muted-foreground mt-1">Cold-chain storage · 2,900 kg total capacity · GMP compliant</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Stored" value="2,140 kg" icon={Warehouse} tone="primary" />
        <StatCard label="Capacity Used" value="74%" delta="Within safe threshold" icon={Warehouse} tone="emerald" />
        <StatCard label="SKUs in Stock" value="6" icon={Package} tone="earth" />
        <StatCard label="Avg Temp" value="18.4°C" icon={Wind} tone="info" hint="Target: 18-24°C" />
      </div>
      <Panel title="Inventory by Species">
        <div className="space-y-4">
          {inventory.map((item) => {
            const pct = Math.round((item.stored / item.capacity) * 100);
            return (
              <div key={item.name} className="flex items-center gap-4">
                <div className="w-28 text-sm font-semibold shrink-0">{item.name}</div>
                <div className="flex-1 h-3 rounded-full bg-muted/50 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald to-primary transition-all" style={{ width: `${pct}%` }} />
                </div>
                <div className="text-sm font-bold w-20 text-right">{item.stored} kg</div>
                <Badge tone="info">Zone {item.zone}</Badge>
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}

function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div><h1 className="text-3xl font-bold font-display">Processing Reports</h1><p className="text-sm text-muted-foreground mt-1">Operational efficiency, throughput, and compliance summaries</p></div>
        <button className="h-11 px-5 rounded-xl border border-border font-semibold flex items-center gap-2 hover:bg-muted/50"><Download className="size-4" /> Export PDF</button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Throughput (Month)" value="12,400 kg" delta="+14% MoM" icon={FileText} tone="emerald" />
        <StatCard label="OEE Score" value="87.4%" delta="World class: >85%" icon={CheckCircle2} tone="emerald" />
        <StatCard label="Wastage Rate" value="2.1%" delta="-0.4% improved" icon={ArrowRight} tone="primary" />
        <StatCard label="GMP Audits" value="3 passed" icon={CheckCircle2} tone="earth" hint="This quarter" />
      </div>
      <Panel title="Monthly Throughput" subtitle="Total kg processed per herb category">
        <div className="h-60">
          <ResponsiveContainer>
            <Bar dataKey="kg" />
            <BarChart data={["Ashwagandha","Tulsi","Turmeric","Brahmi","Neem","Giloy"].map((n, i) => ({ name: n, kg: 1200 + (i * 480) % 3000 }))} margin={{ left: -10 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: "oklch(0.15 0.03 155)", borderRadius: "12px", border: "none", color: "#fff" }} />
              <Bar dataKey="kg" fill="oklch(0.55 0.15 155)" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>
    </div>
  );
}
