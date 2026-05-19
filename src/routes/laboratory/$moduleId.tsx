import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, type NavItem } from "@/components/layout/PortalShell";
import { Panel, Badge, StatCard } from "@/components/ui-kit/Panel";
import {
  LayoutDashboard, ClipboardList, Dna, Droplets, FlaskRound, FileBadge,
  CheckSquare, FileText, CheckCircle2, X, ShieldCheck, Clock, Microscope, Download, AlertTriangle,
} from "lucide-react";
import { BATCHES, HERBS } from "@/lib/mock-data";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/laboratory/$moduleId")({ component: LabModule });

const nav: NavItem[] = [
  { label: "Dashboard", to: "/laboratory/dashboard", icon: LayoutDashboard },
  { label: "Sample Intake", to: "/laboratory/intake", icon: ClipboardList, badge: "8" },
  { label: "DNA Verification", to: "/laboratory/dna", icon: Dna },
  { label: "Moisture Analysis", to: "/laboratory/moisture", icon: Droplets },
  { label: "Pesticide Analysis", to: "/laboratory/pesticide", icon: FlaskRound },
  { label: "Certificate Uploads", to: "/laboratory/certificates", icon: FileBadge },
  { label: "Approved Batches", to: "/laboratory/approved", icon: CheckSquare },
  { label: "Reports", to: "/laboratory/reports", icon: FileText },
];

function LabModule() {
  const { moduleId } = Route.useParams();
  const pages: Record<string, React.ReactNode> = {
    intake: <SampleIntake />,
    dna: <DnaVerification />,
    moisture: <MoistureAnalysis />,
    pesticide: <PesticideAnalysis />,
    certificates: <Certificates />,
    approved: <ApprovedBatches />,
    reports: <LabReports />,
  };
  return (
    <PortalShell portalName="Laboratory Portal" portalTagline="Quality assurance · NABL accredited" nav={nav} user={{ name: "Dr. Priya Iyer", role: "Senior Analyst · NABL-7821", initials: "PI" }}>
      {pages[moduleId] ?? <div className="py-20 text-center text-muted-foreground">Module not found.</div>}
    </PortalShell>
  );
}

function SampleIntake() {
  const queue = BATCHES.slice(0, 8).map((b, i) => ({ ...b, priority: i < 2 ? "High" : i < 5 ? "Normal" : "Low", received: `${i + 1}h ago`, analyst: ["Dr. Priya Iyer","Suresh M.","Kavitha R.","Anand T."][i % 4] }));
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div><h1 className="text-3xl font-bold font-display">Sample Intake Queue</h1><p className="text-sm text-muted-foreground mt-1">Incoming herb batches awaiting lab registration and assignment</p></div>
        <Badge tone="saffron"><Clock className="size-3" /> 8 samples pending</Badge>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="In Queue" value="8" icon={ClipboardList} tone="saffron" hint="Avg wait: 4h 22m" />
        <StatCard label="Registered Today" value="14" icon={CheckCircle2} tone="emerald" />
        <StatCard label="High Priority" value="2" icon={AlertTriangle} tone="destructive" hint="Expedited" />
        <StatCard label="Analysts On Shift" value="18" icon={Microscope} tone="primary" />
      </div>
      <Panel title="Pending Registration" className="!p-0">
        <table className="w-full text-sm whitespace-nowrap">
          <thead className="bg-muted/50 border-b border-border/60 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            <tr><th className="px-6 py-4">Batch ID</th><th className="px-6 py-4">Herb</th><th className="px-6 py-4">Volume</th><th className="px-6 py-4">Priority</th><th className="px-6 py-4">Received</th><th className="px-6 py-4">Assigned To</th><th className="px-6 py-4 text-right">Register</th></tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {queue.map((b) => (
              <tr key={b.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-3.5 font-mono text-xs">{b.id}</td>
                <td className="px-6 py-3.5"><div className="flex items-center gap-2"><span>{b.herb.emoji}</span><span className="font-semibold">{b.herb.name}</span></div></td>
                <td className="px-6 py-3.5 font-bold">{b.quantity} {b.unit}</td>
                <td className="px-6 py-3.5"><Badge tone={b.priority === "High" ? "danger" : b.priority === "Normal" ? "info" : "success"}>{b.priority}</Badge></td>
                <td className="px-6 py-3.5 text-muted-foreground">{b.received}</td>
                <td className="px-6 py-3.5 font-medium">{b.analyst}</td>
                <td className="px-6 py-3.5 text-right"><button className="h-8 px-3 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90">Register</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}

function DnaVerification() {
  const samples = BATCHES.slice(0, 10).map((b, i) => ({ ...b, similarity: 94 + (i % 6), marker: ["ITS2 + rbcL","matK + rbcL","ITS2 only","trnH-psbA"][i % 4], result: i % 5 === 3 ? "Mismatch" : "Authentic" }));
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold font-display">DNA Barcode Verification</h1><p className="text-sm text-muted-foreground mt-1">Molecular authentication of herb species using PCR markers</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Tests Today" value="34" delta="+6 vs avg" icon={Dna} tone="emerald" />
        <StatCard label="Authentic Match" value="33" icon={CheckCircle2} tone="emerald" hint="97.1% pass rate" />
        <StatCard label="Mismatch Flagged" value="1" icon={X} tone="destructive" />
        <StatCard label="Avg Similarity" value="99.1%" icon={Microscope} tone="primary" />
      </div>
      <Panel title="DNA Test Results" className="!p-0">
        <table className="w-full text-sm whitespace-nowrap">
          <thead className="bg-muted/50 border-b border-border/60 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            <tr><th className="px-6 py-4">Sample ID</th><th className="px-6 py-4">Species</th><th className="px-6 py-4">DNA Markers</th><th className="px-6 py-4">Similarity</th><th className="px-6 py-4">Result</th><th className="px-6 py-4 text-right">Certificate</th></tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {samples.map((b) => (
              <tr key={b.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-3.5 font-mono text-xs">{b.id}</td>
                <td className="px-6 py-3.5"><div className="flex items-center gap-2"><span>{b.herb.emoji}</span><span className="font-semibold">{b.herb.name}</span></div></td>
                <td className="px-6 py-3.5 font-mono text-xs text-muted-foreground">{b.marker}</td>
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-muted"><div className="h-full rounded-full bg-emerald" style={{ width: `${b.similarity}%` }} /></div>
                    <span className="font-bold text-emerald">{b.similarity}%</span>
                  </div>
                </td>
                <td className="px-6 py-3.5"><Badge tone={b.result === "Authentic" ? "success" : "danger"}>{b.result}</Badge></td>
                <td className="px-6 py-3.5 text-right">{b.result === "Authentic" ? <button className="text-primary text-xs font-semibold hover:underline">Download CoA</button> : <span className="text-destructive text-xs font-semibold">Re-test Required</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}

function MoistureAnalysis() {
  const moistureData = BATCHES.slice(0, 8).map((b) => ({ id: b.id.slice(-5), pct: b.moisture, limit: 12 }));
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold font-display">Moisture Analysis</h1><p className="text-sm text-muted-foreground mt-1">Batch moisture content testing · AYUSH threshold: ≤ 12%</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Tested Today" value="28" icon={Droplets} tone="primary" />
        <StatCard label="Within Limit" value="26" delta="92.8% pass" icon={CheckCircle2} tone="emerald" />
        <StatCard label="Failed (>12%)" value="2" icon={X} tone="destructive" hint="Sent for re-drying" />
        <StatCard label="Avg Moisture" value="9.4%" delta="Well below limit" icon={Droplets} tone="emerald" />
      </div>
      <Panel title="Moisture Levels by Batch" subtitle="AYUSH safety threshold: 12%">
        <div className="h-60">
          <ResponsiveContainer>
            <BarChart data={moistureData} margin={{ left: -10 }}>
              <XAxis dataKey="id" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} domain={[0, 16]} />
              <Tooltip contentStyle={{ backgroundColor: "oklch(0.15 0.03 155)", borderRadius: "12px", border: "none", color: "#fff" }} />
              <Bar dataKey="pct" radius={[6,6,0,0]} fill="oklch(0.55 0.15 155)" name="Moisture %" />
              <Bar dataKey="limit" fill="oklch(0.58 0.22 25)" radius={[2,2,0,0]} name="Limit %" opacity={0.3} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>
      <Panel title="Test Details" className="!p-0">
        <table className="w-full text-sm whitespace-nowrap">
          <thead className="bg-muted/50 border-b border-border/60 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            <tr><th className="px-6 py-4">Batch ID</th><th className="px-6 py-4">Herb</th><th className="px-6 py-4">Moisture %</th><th className="px-6 py-4">Limit</th><th className="px-6 py-4">Result</th><th className="px-6 py-4 text-right">Action</th></tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {BATCHES.slice(0, 10).map((b) => (
              <tr key={b.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-3.5 font-mono text-xs">{b.id}</td>
                <td className="px-6 py-3.5"><div className="flex items-center gap-2"><span>{b.herb.emoji}</span><span className="font-semibold">{b.herb.name}</span></div></td>
                <td className="px-6 py-3.5 font-bold">{b.moisture}%</td>
                <td className="px-6 py-3.5 text-muted-foreground">≤ 12%</td>
                <td className="px-6 py-3.5"><Badge tone={b.moisture <= 12 ? "success" : "danger"}>{b.moisture <= 12 ? "Pass" : "Fail"}</Badge></td>
                <td className="px-6 py-3.5 text-right">{b.moisture > 12 ? <button className="h-7 px-3 rounded-lg bg-saffron text-white text-xs font-medium">Flag for Re-dry</button> : <span className="text-xs text-muted-foreground">—</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}

function PesticideAnalysis() {
  const pesticides = ["Chlorpyrifos", "Cypermethrin", "Imidacloprid", "Glyphosate", "Profenofos"];
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold font-display">Pesticide Residue Analysis</h1><p className="text-sm text-muted-foreground mt-1">HPLC/GC-MS screening for 42 regulated pesticides · FSSAI limits</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Screened Today" value="22" icon={FlaskRound} tone="primary" />
        <StatCard label="Clean (ND)" value="21" delta="95.5% pass rate" icon={CheckCircle2} tone="emerald" />
        <StatCard label="Trace Detected" value="1" icon={AlertTriangle} tone="saffron" hint="Below MRL" />
        <StatCard label="Pesticides Tested" value="42" icon={FlaskRound} tone="earth" hint="Panel compounds" />
      </div>
      <Panel title="Pesticide Screening Results" className="!p-0">
        <table className="w-full text-sm whitespace-nowrap">
          <thead className="bg-muted/50 border-b border-border/60 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            <tr><th className="px-6 py-4">Batch ID</th><th className="px-6 py-4">Herb</th><th className="px-6 py-4">Compound</th><th className="px-6 py-4">Level</th><th className="px-6 py-4">MRL Limit</th><th className="px-6 py-4">Result</th></tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {BATCHES.slice(0, 10).map((b, i) => (
              <tr key={b.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-3.5 font-mono text-xs">{b.id}</td>
                <td className="px-6 py-3.5"><div className="flex items-center gap-2"><span>{b.herb.emoji}</span><span className="font-semibold">{b.herb.name}</span></div></td>
                <td className="px-6 py-3.5 text-muted-foreground">{i === 4 ? pesticides[0] : "Not Detected"}</td>
                <td className="px-6 py-3.5 font-mono text-xs">{i === 4 ? "0.04 mg/kg" : "< LOQ"}</td>
                <td className="px-6 py-3.5 font-mono text-xs">0.1 mg/kg</td>
                <td className="px-6 py-3.5"><Badge tone={i === 4 ? "warning" : "success"}>{i === 4 ? "Trace (< MRL)" : "Clean"}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}

function Certificates() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div><h1 className="text-3xl font-bold font-display">Certificate Uploads</h1><p className="text-sm text-muted-foreground mt-1">IPFS-anchored Certificates of Analysis for each verified batch</p></div>
        <button className="h-11 px-5 rounded-xl gradient-hero text-white font-semibold shadow-glow hover:scale-[1.02] transition-transform"><FileBadge className="size-4 inline mr-2" />Upload New CoA</button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Certificates Issued" value="182" delta="This month" icon={FileBadge} tone="emerald" />
        <StatCard label="IPFS Anchored" value="182" icon={ShieldCheck} tone="primary" hint="100% on-chain" />
        <StatCard label="Pending Upload" value="4" icon={Clock} tone="saffron" />
        <StatCard label="Avg Sign Time" value="1.2h" icon={Clock} tone="earth" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {BATCHES.slice(0, 9).map((b) => (
          <div key={b.id} className="bg-card/80 border border-border/60 rounded-2xl p-5 hover:border-primary/30 hover:shadow-card transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center"><FileBadge className="size-5 text-primary" /></div>
              <Badge tone="success"><ShieldCheck className="size-3" /> Anchored</Badge>
            </div>
            <div className="font-bold text-foreground">CoA-{b.id}.pdf</div>
            <div className="font-mono text-xs text-muted-foreground mt-1">ipfs://Qm{b.txHash.slice(4, 22)}…</div>
            <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
              <span>{b.herb.emoji}</span>
              <span>{b.herb.name} · {b.quantity} {b.unit}</span>
            </div>
            <button className="mt-4 w-full h-9 rounded-xl border border-border text-xs font-semibold hover:bg-muted/50 transition-colors flex items-center justify-center gap-2"><Download className="size-3.5" /> Download</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ApprovedBatches() {
  const approved = BATCHES.filter((b) => b.status === "Verified");
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold font-display">Approved Batches</h1><p className="text-sm text-muted-foreground mt-1">Fully lab-verified batches cleared for processing and export</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Approved" value={String(approved.length)} icon={CheckSquare} tone="emerald" />
        <StatCard label="Volume Cleared" value={`${approved.reduce((s, b) => s + b.quantity, 0)} kg`} icon={CheckCircle2} tone="primary" />
        <StatCard label="Avg DNA Score" value="99.1%" icon={Dna} tone="emerald" />
        <StatCard label="Avg Moisture" value="9.4%" icon={Droplets} tone="info" />
      </div>
      <Panel title="Verified & Approved Batches" className="!p-0">
        <table className="w-full text-sm whitespace-nowrap">
          <thead className="bg-muted/50 border-b border-border/60 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            <tr><th className="px-6 py-4">Batch ID</th><th className="px-6 py-4">Herb</th><th className="px-6 py-4">Volume</th><th className="px-6 py-4">Moisture</th><th className="px-6 py-4">Sustainability</th><th className="px-6 py-4">Approved On</th><th className="px-6 py-4 text-right">CoA</th></tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {approved.map((b) => (
              <tr key={b.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-3.5 font-mono text-xs">{b.id}</td>
                <td className="px-6 py-3.5"><div className="flex items-center gap-2"><span>{b.herb.emoji}</span><span className="font-semibold">{b.herb.name}</span></div></td>
                <td className="px-6 py-3.5 font-bold">{b.quantity} {b.unit}</td>
                <td className="px-6 py-3.5 text-emerald font-medium">{b.moisture}%</td>
                <td className="px-6 py-3.5"><div className="flex items-center gap-2"><div className="w-12 h-1.5 rounded-full bg-muted"><div className="h-full rounded-full bg-emerald" style={{ width: `${b.sustainability}%` }} /></div><span className="font-bold text-emerald">{b.sustainability}</span></div></td>
                <td className="px-6 py-3.5 text-muted-foreground text-xs">{new Date(b.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</td>
                <td className="px-6 py-3.5 text-right"><button className="text-primary text-xs font-semibold hover:underline">View CoA</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}

function LabReports() {
  const herbData = HERBS.slice(0, 8).map((h, i) => ({ name: h.name, tests: 20 + (i * 11) % 40, passed: 18 + (i * 9) % 38 }));
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div><h1 className="text-3xl font-bold font-display">Lab Reports</h1><p className="text-sm text-muted-foreground mt-1">Aggregated test results and quality performance metrics</p></div>
        <button className="h-11 px-5 rounded-xl border border-border font-semibold flex items-center gap-2 hover:bg-muted/50"><Download className="size-4" /> Export PDF</button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Tests Run (Month)" value="342" delta="+18% vs last month" icon={FileText} tone="primary" />
        <StatCard label="Overall Pass Rate" value="97.4%" delta="Industry best" icon={CheckCircle2} tone="emerald" />
        <StatCard label="Rejected Batches" value="9" icon={X} tone="destructive" hint="This month" />
        <StatCard label="Certs Issued" value="182" icon={FileBadge} tone="earth" />
      </div>
      <Panel title="Tests by Herb Species" subtitle="Tests conducted vs passed · current month">
        <div className="h-60">
          <ResponsiveContainer>
            <BarChart data={herbData} margin={{ left: -10 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: "oklch(0.15 0.03 155)", borderRadius: "12px", border: "none", color: "#fff" }} />
              <Bar dataKey="tests" fill="oklch(0.62 0.12 200)" radius={[6,6,0,0]} name="Total Tests" />
              <Bar dataKey="passed" fill="oklch(0.55 0.15 155)" radius={[6,6,0,0]} name="Passed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>
    </div>
  );
}
