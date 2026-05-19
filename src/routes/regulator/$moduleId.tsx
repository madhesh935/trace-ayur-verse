import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, type NavItem } from "@/components/layout/PortalShell";
import { Panel, Badge, StatCard } from "@/components/ui-kit/Panel";
import {
  LayoutDashboard, AlertTriangle, TreePine, Shield, FileCheck2, BarChart3,
  ScrollText, Globe, CheckCircle2, MapPin, ShieldCheck, TrendingUp, Clock, Download, XCircle,
} from "lucide-react";
import { BATCHES, REGIONS, SUSTAINABILITY_BY_REGION } from "@/lib/mock-data";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/regulator/$moduleId")({ component: RegulatorModule });

const nav: NavItem[] = [
  { label: "Dashboard", to: "/regulator/dashboard", icon: LayoutDashboard },
  { label: "Violations", to: "/regulator/violations", icon: AlertTriangle, badge: "4" },
  { label: "Sustainability Reports", to: "/regulator/sustainability", icon: TreePine },
  { label: "Protected Zones", to: "/regulator/zones", icon: Shield },
  { label: "Audit Logs", to: "/regulator/audit-logs", icon: ScrollText },
  { label: "Export Certifications", to: "/regulator/export-certifications", icon: FileCheck2 },
  { label: "Compliance Analytics", to: "/regulator/compliance", icon: BarChart3 },
];

function RegulatorModule() {
  const { moduleId } = Route.useParams();
  const pages: Record<string, React.ReactNode> = {
    violations: <Violations />,
    sustainability: <Sustainability />,
    zones: <ProtectedZones />,
    "audit-logs": <AuditLogs />,
    "export-certifications": <ExportCerts />,
    compliance: <ComplianceAnalytics />,
  };
  return (
    <PortalShell portalName="Regulator Portal" portalTagline="NMPB · Ministry of AYUSH" nav={nav} user={{ name: "Dr. Vikram Singh", role: "Regional Officer · NMPB-SR", initials: "VS" }}>
      {pages[moduleId] ?? <div className="py-20 text-center text-muted-foreground">Module not found.</div>}
    </PortalShell>
  );
}

const VIOLATIONS = [
  { zone: "NMPB-KA-09", farmer: "F-3411 · Suresh Patel", type: "Harvest outside approved boundary", sev: "high", time: "2h ago", batch: "AYT-ASH-02408" },
  { zone: "NMPB-MP-22", farmer: "F-4432 · Vikas Singh", type: "Endangered species attempt blocked", sev: "high", time: "5h ago", batch: "AYT-TUL-02412" },
  { zone: "NMPB-TN-04", farmer: "F-2847 · Ramesh Kumar", type: "Seasonal quota exceeded by 12%", sev: "med", time: "1d ago", batch: "AYT-BRH-02401" },
  { zone: "NMPB-KL-11", farmer: "F-1923 · Lakshmi Devi", type: "Blockchain sync delayed >48h", sev: "low", time: "2d ago", batch: "AYT-NEE-02395" },
];

function Violations() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold font-display">Geo-fence Violations</h1>
          <p className="text-sm text-muted-foreground mt-1">Active alerts requiring regulatory action</p>
        </div>
        <Badge tone="danger"><AlertTriangle className="size-3" /> 4 unresolved</Badge>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="High Severity" value="2" icon={XCircle} tone="destructive" hint="Immediate action" />
        <StatCard label="Medium" value="1" icon={AlertTriangle} tone="saffron" hint="Review within 24h" />
        <StatCard label="Low" value="1" icon={Clock} tone="primary" hint="Monitor" />
        <StatCard label="Resolved (7d)" value="12" icon={CheckCircle2} tone="emerald" />
      </div>
      <Panel title="Active Violations" className="!p-0">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border/60 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            <tr>
              <th className="px-6 py-4">Zone ID</th>
              <th className="px-6 py-4">Farmer</th>
              <th className="px-6 py-4">Violation</th>
              <th className="px-6 py-4">Batch</th>
              <th className="px-6 py-4">Severity</th>
              <th className="px-6 py-4">Reported</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {VIOLATIONS.map((v, i) => (
              <tr key={i} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-xs">{v.zone}</td>
                <td className="px-6 py-4 font-medium">{v.farmer}</td>
                <td className="px-6 py-4 text-muted-foreground">{v.type}</td>
                <td className="px-6 py-4 font-mono text-xs">{v.batch}</td>
                <td className="px-6 py-4"><Badge tone={v.sev === "high" ? "danger" : v.sev === "med" ? "warning" : "info"}>{v.sev}</Badge></td>
                <td className="px-6 py-4 text-muted-foreground text-xs">{v.time}</td>
                <td className="px-6 py-4 text-right">
                  <button className="h-8 px-3 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90">Resolve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}

function Sustainability() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display">Sustainability Reports</h1>
        <p className="text-sm text-muted-foreground mt-1">Regional ecological compliance scores and harvest quotas</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Avg Region Score" value="86 / 100" icon={TreePine} tone="emerald" />
        <StatCard label="Zones At Risk" value="3" icon={AlertTriangle} tone="saffron" hint="Below threshold" />
        <StatCard label="Carbon Offset" value="2,840 t" delta="+18% YoY" icon={TrendingUp} tone="primary" />
        <StatCard label="Species Protected" value="42" icon={Shield} tone="earth" />
      </div>
      <Panel title="Sustainability Score by Region" subtitle="Current season · Score and quota utilization">
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={SUSTAINABILITY_BY_REGION} margin={{ left: -10 }}>
              <XAxis dataKey="region" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: "oklch(0.15 0.03 155)", borderRadius: "12px", border: "none", color: "#fff" }} />
              <Bar dataKey="score" fill="oklch(0.55 0.15 155)" radius={[6,6,0,0]} name="Eco Score" />
              <Bar dataKey="quota" fill="oklch(0.78 0.16 65)" radius={[6,6,0,0]} name="Quota Used %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>
      <Panel title="Region Detail" className="!p-0">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border/60 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            <tr>
              <th className="px-6 py-4">Region</th>
              <th className="px-6 py-4">State</th>
              <th className="px-6 py-4">Eco Score</th>
              <th className="px-6 py-4">Quota Used</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {SUSTAINABILITY_BY_REGION.map((r, i) => (
              <tr key={r.region} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-semibold">{r.region}</td>
                <td className="px-6 py-4 text-muted-foreground">{REGIONS[i]?.state}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 rounded-full bg-muted"><div className="h-full rounded-full bg-emerald" style={{ width: `${r.score}%` }} /></div>
                    <span className="font-bold text-emerald">{r.score}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium">{r.quota}%</td>
                <td className="px-6 py-4"><Badge tone={r.score > 85 ? "success" : r.score > 75 ? "warning" : "danger"}>{r.score > 85 ? "Good" : r.score > 75 ? "Caution" : "At Risk"}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}

function ProtectedZones() {
  const zones = [
    { id: "NMPB-TN-04", name: "Nilgiris Biosphere Reserve", area: "5,520 km²", type: "UNESCO Reserve", status: "Active", alerts: 0 },
    { id: "NMPB-KL-11", name: "Silent Valley NP", area: "237 km²", type: "National Park", status: "Active", alerts: 1 },
    { id: "NMPB-KA-09", name: "Nagarhole Tiger Reserve", area: "848 km²", type: "Tiger Reserve", status: "Alert", alerts: 2 },
    { id: "NMPB-MP-22", name: "Satpura Forest Zone", area: "1,427 km²", type: "Wildlife Sanctuary", status: "Alert", alerts: 1 },
    { id: "NMPB-UK-03", name: "Kedarnath Wild Sanctuary", area: "975 km²", type: "Himalayan Reserve", status: "Active", alerts: 0 },
    { id: "NMPB-HP-07", name: "Great Himalayan NP", area: "754 km²", type: "National Park", status: "Active", alerts: 0 },
  ];
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold font-display">Protected Zones</h1>
          <p className="text-sm text-muted-foreground mt-1">NMPB-monitored protected forests and biodiversity hotspots</p>
        </div>
        <Badge tone="success"><Shield className="size-3" /> 1,215 of 1,240 zones compliant</Badge>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {zones.map((z) => (
          <div key={z.id} className="bg-card/80 border border-border/60 rounded-2xl p-5 hover:border-primary/30 transition-all hover:shadow-card">
            <div className="flex items-start justify-between mb-3">
              <div className="size-10 rounded-xl bg-emerald/10 border border-emerald/20 flex items-center justify-center"><Shield className="size-5 text-emerald" /></div>
              <Badge tone={z.status === "Alert" ? "danger" : "success"}>{z.status}</Badge>
            </div>
            <div className="font-bold text-foreground">{z.name}</div>
            <div className="font-mono text-xs text-muted-foreground mt-1">{z.id}</div>
            <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
              <div className="bg-muted/30 rounded-lg p-2"><div className="text-muted-foreground">Area</div><div className="font-bold mt-0.5">{z.area}</div></div>
              <div className="bg-muted/30 rounded-lg p-2"><div className="text-muted-foreground">Type</div><div className="font-bold mt-0.5">{z.type}</div></div>
            </div>
            {z.alerts > 0 && <div className="mt-3 flex items-center gap-2 text-xs text-destructive font-medium"><AlertTriangle className="size-3.5" /> {z.alerts} active alert{z.alerts > 1 ? "s" : ""}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function AuditLogs() {
  const logs = [
    { action: "Export Certificate Signed", detail: "AYT-ASH-02418 · Authorized for EU market", officer: "Dr. Vikram Singh", time: "2 min ago", type: "cert" },
    { action: "Geo-fence Alert Resolved", detail: "NMPB-TN-04 · Quota threshold adjusted", officer: "Dr. Vikram Singh", time: "1h ago", type: "alert" },
    { action: "DNA Mismatch Flagged", detail: "AYT-BRH-02401 · Sent for re-testing", officer: "System Auto", time: "3h ago", type: "flag" },
    { action: "Quota Updated", detail: "Ashwagandha Southern Region Q3 · +12%", officer: "Ministry AYUSH", time: "1d ago", type: "quota" },
    { action: "New Farmer Registered", detail: "F-8821 · Kozhikode, Kerala · NMPB-KL", officer: "Dr. Vikram Singh", time: "2d ago", type: "farmer" },
    { action: "Zone Boundary Revised", detail: "NMPB-UK-03 · Expanded by 42 km²", officer: "Ministry AYUSH", time: "3d ago", type: "zone" },
    { action: "Batch Inspection Report Filed", detail: "AYT-TUR-02422 · Full compliance confirmed", officer: "Dr. Priya Iyer", time: "4d ago", type: "report" },
    { action: "Export Certificate Revoked", detail: "AYT-GIL-02389 · Pesticide trace detected", officer: "Dr. Vikram Singh", time: "5d ago", type: "revoke" },
  ];
  const toneMap: Record<string, "success"|"danger"|"warning"|"info"> = {
    cert: "success", alert: "warning", flag: "danger", quota: "info", farmer: "success", zone: "info", report: "success", revoke: "danger",
  };
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold font-display">Audit Logs</h1>
          <p className="text-sm text-muted-foreground mt-1">Immutable regulatory trail · All actions are permanently recorded</p>
        </div>
        <button className="h-11 px-5 rounded-xl border border-border font-semibold flex items-center gap-2 hover:bg-muted/50 transition-colors"><Download className="size-4" /> Export Logs</button>
      </div>
      <Panel title="All Regulatory Events" className="!p-0">
        <div className="divide-y divide-border/50">
          {logs.map((l, i) => (
            <div key={i} className="flex items-start gap-4 px-6 py-4 hover:bg-muted/30 transition-colors">
              <div className={`size-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${toneMap[l.type] === "success" ? "bg-emerald/10" : toneMap[l.type] === "danger" ? "bg-destructive/10" : "bg-primary/10"}`}>
                <ScrollText className={`size-4 ${toneMap[l.type] === "success" ? "text-emerald" : toneMap[l.type] === "danger" ? "text-destructive" : "text-primary"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm">{l.action}</span>
                  <Badge tone={toneMap[l.type]}>{l.type}</Badge>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{l.detail}</div>
                <div className="text-xs text-muted-foreground mt-1">By: <span className="font-medium text-foreground">{l.officer}</span></div>
              </div>
              <div className="text-xs text-muted-foreground whitespace-nowrap">{l.time}</div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function ExportCerts() {
  const destinations = ["EU", "USA", "UAE", "UK", "Japan", "Australia", "Canada", "Singapore"];
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold font-display">Export Certifications</h1>
          <p className="text-sm text-muted-foreground mt-1">AYUSH-approved certificates for international herb exports</p>
        </div>
        <div className="flex gap-3">
          <button className="h-11 px-5 rounded-xl border border-border font-semibold flex items-center gap-2 hover:bg-muted/50"><Download className="size-4" /> Bulk Export</button>
          <button className="h-11 px-5 rounded-xl gradient-hero text-white font-semibold shadow-glow hover:scale-[1.02] transition-transform"><FileCheck2 className="size-4 inline mr-2" />Issue Certificate</button>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Issued YTD" value="218" delta="+34 this month" icon={FileCheck2} tone="emerald" />
        <StatCard label="Pending Review" value="12" icon={Clock} tone="saffron" hint="Awaiting sign-off" />
        <StatCard label="Export Markets" value="8" icon={Globe} tone="primary" />
        <StatCard label="Revoked" value="3" icon={XCircle} tone="destructive" hint="Failed QC" />
      </div>
      <Panel title="Certification Queue" className="!p-0">
        <table className="w-full text-sm whitespace-nowrap">
          <thead className="bg-muted/50 border-b border-border/60 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            <tr>
              <th className="px-6 py-4">Cert ID</th>
              <th className="px-6 py-4">Batch</th>
              <th className="px-6 py-4">Herb</th>
              <th className="px-6 py-4">Destination</th>
              <th className="px-6 py-4">Volume</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Sign</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {BATCHES.slice(0, 12).map((b, i) => (
              <tr key={b.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-3.5 font-mono text-xs">CERT-{2400 + i}</td>
                <td className="px-6 py-3.5 font-mono text-xs">{b.id}</td>
                <td className="px-6 py-3.5"><div className="flex items-center gap-2"><span>{b.herb.emoji}</span><span className="font-semibold">{b.herb.name}</span></div></td>
                <td className="px-6 py-3.5"><div className="flex items-center gap-1.5"><Globe className="size-3 text-muted-foreground" />{destinations[i % 8]}</div></td>
                <td className="px-6 py-3.5 font-bold">{b.quantity} {b.unit}</td>
                <td className="px-6 py-3.5"><Badge tone={i % 4 === 0 ? "warning" : "success"}>{i % 4 === 0 ? "Pending" : "Signed"}</Badge></td>
                <td className="px-6 py-3.5 text-right">{i % 4 === 0 ? <button className="h-7 px-3 rounded-lg bg-emerald text-white text-xs font-medium">Sign Now</button> : <CheckCircle2 className="size-4 text-emerald inline" />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}

function ComplianceAnalytics() {
  const complianceData = REGIONS.map((r, i) => ({
    region: r.name, compliance: 78 + (i * 6) % 22, violations: (i * 2) % 5, certifications: 20 + (i * 11) % 40,
  }));
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display">Compliance Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Cross-region performance indicators and regulatory KPIs</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Overall Compliance" value="94.2%" delta="+2.1% QoQ" icon={ShieldCheck} tone="emerald" />
        <StatCard label="Avg Turnaround" value="3.4 days" delta="-0.8d improved" icon={Clock} tone="primary" />
        <StatCard label="Active Regions" value="6" icon={MapPin} tone="earth" hint="Southern Region" />
        <StatCard label="Violations Rate" value="0.8%" delta="Industry avg: 2.1%" icon={TrendingUp} tone="emerald" />
      </div>
      <Panel title="Regional Compliance Rates" subtitle="% of batches fully compliant per region">
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={complianceData} margin={{ left: -10 }}>
              <XAxis dataKey="region" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: "oklch(0.15 0.03 155)", borderRadius: "12px", border: "none", color: "#fff" }} />
              <Bar dataKey="compliance" fill="oklch(0.55 0.15 155)" radius={[6,6,0,0]} name="Compliance %" />
              <Bar dataKey="violations" fill="oklch(0.58 0.22 25)" radius={[6,6,0,0]} name="Violations" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>
      <Panel title="KPI Summary by Region" className="!p-0">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border/60 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            <tr>
              <th className="px-6 py-4">Region</th>
              <th className="px-6 py-4">Compliance %</th>
              <th className="px-6 py-4">Violations</th>
              <th className="px-6 py-4">Certifications</th>
              <th className="px-6 py-4">Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {complianceData.map((r) => (
              <tr key={r.region} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-semibold">{r.region}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 rounded-full bg-muted"><div className="h-full rounded-full bg-emerald" style={{ width: `${r.compliance}%` }} /></div>
                    <span className="font-bold">{r.compliance}%</span>
                  </div>
                </td>
                <td className="px-6 py-4"><span className={r.violations > 2 ? "text-destructive font-bold" : "text-foreground font-medium"}>{r.violations}</span></td>
                <td className="px-6 py-4 font-medium">{r.certifications} issued</td>
                <td className="px-6 py-4"><Badge tone={r.compliance > 90 ? "success" : r.compliance > 80 ? "warning" : "danger"}>{r.compliance > 90 ? "A" : r.compliance > 80 ? "B" : "C"}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}
