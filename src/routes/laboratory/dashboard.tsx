import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, type NavItem } from "@/components/layout/PortalShell";
import { Panel, StatCard, Badge } from "@/components/ui-kit/Panel";
import {
  LayoutDashboard, ClipboardList, Dna, Droplets, FlaskRound, FileBadge, CheckSquare, FileText,
  CheckCircle2, X, FileBarChart2, Microscope, ShieldCheck, Clock, Sparkles,
} from "lucide-react";
import { BATCHES } from "@/lib/mock-data";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, RadialBar, RadialBarChart, PolarAngleAxis } from "recharts";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/laboratory/dashboard")({ component: LabDashboard });

const nav: NavItem[] = [
  { label: "Dashboard", to: "/laboratory/dashboard", icon: LayoutDashboard, i18nKey: "nav.dashboard" },
  { label: "Sample Intake", to: "/laboratory/intake", icon: ClipboardList, badge: "8", i18nKey: "nav.intake" },
  { label: "DNA Verification", to: "/laboratory/dna", icon: Dna, i18nKey: "nav.dna" },
  { label: "Moisture Analysis", to: "/laboratory/moisture", icon: Droplets, i18nKey: "nav.moisture" },
  { label: "Pesticide Analysis", to: "/laboratory/pesticide", icon: FlaskRound, i18nKey: "nav.pesticide" },
  { label: "Certificate Uploads", to: "/laboratory/certificates", icon: FileBadge, i18nKey: "nav.certificates" },
  { label: "Approved Batches", to: "/laboratory/approved", icon: CheckSquare, i18nKey: "nav.approved" },
  { label: "Reports", to: "/laboratory/reports", icon: FileText, i18nKey: "nav.reports" },
];

const moisture = BATCHES.slice(0, 8).map((b) => ({ id: b.id.slice(-5), pct: b.moisture, max: 12 }));

function LabDashboard() {
  const { t } = useLang();
  return (
    <PortalShell portalName="Laboratory Portal" portalTagline="Quality assurance · NABL accredited" nav={nav} user={{ name: "Dr. Priya Iyer", role: "Senior Analyst · NABL-7821", initials: "PI" }}>
      <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold font-display">{t("lab.title")}</h1>
          <p className="text-sm text-muted-foreground">Bengaluru NABL Lab · 42 samples in queue · 18 analysts on shift</p>
        </div>
        <Badge tone="info"><Sparkles className="size-3" /> AI-assisted DNA matching enabled</Badge>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label={t("lab.pending_samples")} value="42" icon={Clock} tone="saffron" hint="Avg wait: 4h 22m" />
        <StatCard label={t("lab.approved_today")} value="86" delta="+12% vs avg" icon={CheckCircle2} tone="emerald" />
        <StatCard label={t("lab.rejected_week")} value="3" icon={X} tone="destructive" hint="2 moisture · 1 species mismatch" />
        <StatCard label={t("lab.quality_score")} value="97.2" delta="↑ 1.8 pts" icon={ShieldCheck} tone="primary" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Panel title={t("lab.dna_barcode")} subtitle="Live comparison: AYT-ASH-02418" className="lg:col-span-2">
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2">Reference · Withania somnifera</div>
              <DnaBars seed={1} />
            </div>
            <div>
              <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2">Sample</div>
              <DnaBars seed={1} variance={0.04} />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-emerald/5 border border-emerald/20">
            <div className="flex items-center gap-3">
              <Microscope className="size-5 text-emerald" />
              <div>
                <div className="font-semibold text-sm">{t("consumer.authentic_match")}</div>
                <div className="text-xs text-muted-foreground">ITS2 + rbcL markers · No adulterant DNA detected</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-emerald font-display">99.6%</div>
              <div className="text-[10px] text-muted-foreground">similarity</div>
            </div>
          </div>
        </Panel>

        <Panel title={t("lab.quality_compliance")} subtitle="Past 30 days">
          {/* Donut chart with properly centered score overlay */}
          <div className="relative h-44 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="62%"
                outerRadius="100%"
                data={[{ name: "score", value: 97.2, fill: "oklch(0.68 0.17 155)" }]}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar background={{ fill: "oklch(0.95 0.015 100)" }} dataKey="value" cornerRadius={12} />
              </RadialBarChart>
            </ResponsiveContainer>
            {/* Absolutely centered text — never clipped */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="text-3xl font-bold font-display text-foreground leading-none">97.2</div>
              <div className="text-xs text-muted-foreground mt-1 font-medium">of 100</div>
              <div className="mt-1.5 text-[10px] font-bold text-emerald uppercase tracking-wider">Excellent</div>
            </div>
          </div>
          {/* Sub-metrics */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            {[
              { label: "DNA Auth", value: "98%", color: "text-emerald", bg: "bg-emerald/10 border-emerald/20" },
              { label: "Moisture", value: "96%", color: "text-primary", bg: "bg-primary/10 border-primary/20" },
              { label: "Pesticide", value: "99%", color: "text-emerald", bg: "bg-emerald/10 border-emerald/20" },
            ].map((m) => (
              <div key={m.label} className={`rounded-xl border p-2.5 text-center ${m.bg}`}>
                <div className={`text-lg font-bold font-display ${m.color}`}>{m.value}</div>
                <div className="text-[10px] text-muted-foreground font-medium mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-5">
        <Panel title={t("lab.moisture_queue")} subtitle="Threshold: ≤ 12%" className="lg:col-span-2">
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={moisture}>
                <XAxis dataKey="id" axisLine={false} tickLine={false} fontSize={10} />
                <YAxis fontSize={10} />
                <Tooltip />
                <Bar dataKey="pct" radius={[6, 6, 0, 0]} fill="oklch(0.55 0.15 155)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title={t("lab.approval_workflow")}>
          <div className="space-y-2">
            {BATCHES.slice(0, 5).map((b, i) => (
              <div key={b.id} className="p-3 rounded-lg border border-border hover:bg-muted/40">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold font-mono">{b.id}</span>
                  <Badge tone={i < 3 ? "success" : "warning"}>{i < 3 ? "Approved" : "Review"}</Badge>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{b.herb.name} · DNA · Moisture {b.moisture}%</div>
                {i >= 3 && (
                  <div className="flex gap-2 mt-2">
                    <button className="h-7 px-3 rounded-md bg-emerald text-white text-xs font-medium">Approve</button>
                    <button className="h-7 px-3 rounded-md border border-destructive/30 text-destructive text-xs font-medium">Reject</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title={t("lab.recent_certs")} subtitle="Hashed to IPFS, anchored on-chain" className="mt-5 !p-0">
        <div className="divide-y divide-border">
          {BATCHES.slice(0, 5).map((b) => (
            <div key={b.id} className="flex items-center gap-4 p-4 hover:bg-muted/40">
              <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <FileBarChart2 className="size-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">CoA-{b.id}.pdf</div>
                <div className="text-xs text-muted-foreground font-mono truncate">ipfs://Qm{b.txHash.slice(4, 22)}…</div>
              </div>
              <Badge tone="success"><ShieldCheck className="size-3" /> Anchored</Badge>
              <button className="text-xs text-primary font-medium hover:underline">View</button>
            </div>
          ))}
        </div>
      </Panel>
    </PortalShell>
  );
}

function DnaBars({ seed, variance = 0 }: { seed: number; variance?: number }) {
  return (
    <div className="bg-muted/30 rounded-xl p-3 space-y-1.5">
      {[0, 1, 2, 3].map((row) => (
        <div key={row} className="flex gap-px h-4">
          {Array.from({ length: 60 }).map((_, i) => {
            const h = ((i * (seed + row * 11)) % 4);
            const on = h > (variance > 0 && (i + row) % 23 === 0 ? 0.5 : 1);
            const colors = ["bg-emerald", "bg-saffron", "bg-primary", "bg-earth"];
            return <div key={i} className={`flex-1 ${on ? colors[h] : "bg-transparent"}`} />;
          })}
        </div>
      ))}
    </div>
  );
}
